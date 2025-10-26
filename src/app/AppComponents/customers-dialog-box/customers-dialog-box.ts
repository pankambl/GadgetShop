import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customers-dialog-box',
  imports: [FormsModule, CommonModule],
  templateUrl: './customers-dialog-box.html',
  styleUrl: './customers-dialog-box.css'
})
export class CustomersDialogBox {
  @Input() private customer: any;
  private httpClient = inject(HttpClient);
  modal = inject(NgbActiveModal);
  btnText: string = 'Add Customer';
  disabledCustomerIdInput = false;

  customerDetails: any = {
    customerId: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    registrationDate: '',
    email: ''
  };

  confirm() {
    this.modal.close({ event: 'confirm' });

  }
  dismiss() {
    this.modal.dismiss();
  }

  onAddCustomer() {
    let apiurl = "https://localhost:7261/api/Customer";

    let headers = new HttpHeaders({
      Authorization: 'my-auth-token',
      'Content-Type': 'application/json'
    });

    if (this.btnText === "Update Customer") {
      this.httpClient.put(apiurl, this.customerDetails, { headers, responseType: 'text' as const }).subscribe({
        next: (data) => {
          console.log('Customer updated successfully:', data);
        },
        error: (error) => {
          console.error('Error updating customer:', error);
        },
        complete: () => {
          alert("Customer Updated Successfully"+ JSON.stringify(this.customerDetails));
          this.modal.close({ event: "Closed" });
        }
      });
    }
    else {

      this.httpClient.post(apiurl, this.customerDetails, { headers, responseType: 'text' as const }).subscribe({
        next: (data) => {
          console.log('Customer added successfully:', data);
        },
        error: (error) => {
          console.error('Error adding customer:', error);
        },
        complete: () => {
          this.modal.close({ event: "Closed" });
        }
      });

    }
  }



  ngOnInit() {
    if (this.customer != null) {
      this.customerDetails = this.customer;
      this.btnText = "Update Customer";
      this.disabledCustomerIdInput = true;
    }

  }
}
