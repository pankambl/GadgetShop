// ...existing code...
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface InventoryData {
  productId: string;
  productName: string;
  availableQty: number | string;
  reorderPoint: number | string;
}

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.css']
})
export class Inventory {
  private httpClient = inject(HttpClient);

  invertoryData: InventoryData = {
    productId: '',
    productName: '',
    availableQty: 0,
    reorderPoint: 0
  };

  onSubmit(): void {
    const apiurl = 'https://localhost:7261/api/Inventory';
    const headers = new HttpHeaders({
      Authorization: 'my-auth-token',
      'Content-Type': 'application/json'
    });

    const payload = {
      ...this.invertoryData,
      availableQty: Number(this.invertoryData.availableQty),
      reorderPoint: Number(this.invertoryData.reorderPoint)
    };


    this.httpClient.post(apiurl, payload, { headers, responseType: 'text' as const }).subscribe({
      next: v => console.log(v),
      error: e => console.error(e),
      complete: () => alert('Form submitted!' + JSON.stringify(payload))
    });
  }
}
