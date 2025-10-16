import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory',
  imports: [FormsModule],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css'
})
export class Inventory {

  invertoryData= {
    productId: "",
    productName: "",
    availableQty: 0,
    reorderPoint: 0

  }

  onSubmit(): void {
    alert('Form submitted!' + JSON.stringify(this.invertoryData));
  }
}
