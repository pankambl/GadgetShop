import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomersDialogBox } from '../customers-dialog-box/customers-dialog-box';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DialogBox } from '../../AppComponent/dialog-box/dialog-box';


@Component({
  selector: 'app-customers',
  imports: [FormsModule, CommonModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css'
})

export class Customers {
  private modalService = inject(NgbModal);
  private httpClient = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  customerIdToDelete: number = 0;

  customerDetails: any = {
    customerId: '',
    FirstName: '',
    LastName: '',
    PhoneNumber: '',
    RegistrationDate: '',
    newRegistrationDate: '',
    Email: ''
  };

  ngOnInit() {
    this.loadCustomers();
  }

  private loadCustomers(): void {
    const apiurl = 'https://localhost:7261/api/Customer';

    this.httpClient.get<any>(apiurl).subscribe({
      next: (data) => {
        console.log('raw inventory response:', data);
        if (Array.isArray(data)) {
          this.customerDetails = data;
        } else if (data && (data.items || data.value || data.results)) {
          this.customerDetails = data.items ?? data.value ?? data.results;
        } else if (data && typeof data === 'object' && Object.keys(data).length) {
          this.customerDetails = [data];
        } else {
          this.customerDetails = [];
        }
        this.cdr.detectChanges(); // required with provideZonelessChangeDetection()
      },
      error: (err) => {
        console.error('loadInventory failed', err);
        this.customerDetails = [];
        this.cdr.detectChanges();
      }
    });
    this.customerDetails = {
      CustomerId: 0,
      FirstName: '',
      LastName: '',
      Email: '',
      PhoneNumber: '',
      RegistrationDate: '',
      newRegistrationDate: ''
    };

  }

  openConfirmDialog(CustomerId: number) {
    this.customerIdToDelete = CustomerId;
    console.log('customer ID to delete:', this.customerIdToDelete);
    this.modalService.open(DialogBox).result.then(data => {
      if (data.event == "confirm") {
        this.deleteCustomerDetails();
      }
    });
  }

  openCustomerDialog() {
    // Logic to open a dialog for adding new customer details
    this.modalService.open(CustomersDialogBox).result.then((result) => {
      if (result && result.event === 'Closed') {
        this.loadCustomers();
      }
    });
  }
  deleteCustomerDetails(): void {
    const apiurl = "https://localhost:7261/api/Customer/?CustomerId=" + this.customerIdToDelete;
    this.httpClient.delete<any>(apiurl).subscribe({
      next: (data) => {
        console.log('Delete response:', data);
        this.loadCustomers();
      },
      error: (err) => {
        console.error('Delete customer details failed', err);
      }
    });
  }

  editCustomerDetails(customer: any): void {
    const modalRef = this.modalService.open(CustomersDialogBox);
    modalRef.componentInstance.customer = {
      customerId: customer.CustomerId,
      FirstName: customer.FirstName,
      LastName: customer.LastName,
      PhoneNumber: customer.PhoneNumber,
      RegistrationDate: customer.RegistrationDate,
      Email: customer.Email,
      newRegistrationDate: customer.RegistrationDate
    }
    modalRef.result.then((result) => {
      if (result && result.event === 'Closed') {
        this.loadCustomers();
      }
    });
  }

}
