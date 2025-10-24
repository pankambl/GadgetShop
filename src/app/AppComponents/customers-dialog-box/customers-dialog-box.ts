import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customers-dialog-box',
  imports: [FormsModule, CommonModule],
  templateUrl: './customers-dialog-box.html',
  styleUrl: './customers-dialog-box.css'
})
export class CustomersDialogBox {
  private httpClient = inject(HttpClient);

  customerDetails: any = {
    customerId: '',
    FirstName: '',
    LastName: '',
    PhoneNumber: '',
    RegistrationDate: '',
    Email: ''
  };

  onAddCustomer() {
    // Logic to handle adding a new customer
    console.log('Add Customer button clicked');
    let apiurl = "https://localhost:7261/api/Customer";

    let headers = new HttpHeaders({
      Authorization: 'my-auth-token',
      'Content-Type': 'application/json'
    });
    this.httpClient.post(apiurl, this.customerDetails,{ headers, responseType: 'text' as const }).subscribe({
      next: (data) => {
        console.log('Customer added successfully:', data);
      },
      error: (error) => {
        console.error('Error adding customer:', error);
      },
      complete: () => {
        alert("Customer Details Save Successfully" + JSON.stringify(this.customerDetails));
        console.log('Customer addition request completed.', this.customerDetails);
      }
    });

  }
}
