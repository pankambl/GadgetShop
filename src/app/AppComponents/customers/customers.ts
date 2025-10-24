import { Component, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomersDialogBox } from '../customers-dialog-box/customers-dialog-box';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customers',
  imports: [FormsModule, CommonModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css'
})

export class Customers {
  private modalService = inject(NgbModal);

  customerDetails:any= {
    customerId: '',
    FirstName: '',
    LastName: '',
    PhoneNumber: '',
    RegistrationDate: '',
    Email: ''
  };

  openCustomerDialog() {
    // Logic to open a dialog for adding new customer details
    this.modalService.open(CustomersDialogBox);
  }
}
