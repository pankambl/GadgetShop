// ...existing code...
import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogBox } from '../dialog-box/dialog-box';

interface InventoryData {
  Id: number;
  productId: number | string;
  productName: string;
  availableQty: number | string;
  reOrderPoint: number | string;
}

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.css']
})
export class Inventory {
  private httpClient = inject(HttpClient);
  private cdr = inject(ChangeDetectorRef);
  private modalService = inject(NgbModal);
  productIdToDelete: number = 0;
  invertoryData: InventoryData = {
    Id: 0,
    productId: '',
    productName: '',
    availableQty: 0,
    reOrderPoint: 0
  };

  disabledProductIdInput = false
  inventoryDetails: any;

  ngOnInit() {
    this.loadInventory();
  }

  private loadInventory(): void {
    const apiurl = 'https://localhost:7261/api/Inventory';

    this.httpClient.get<any>(apiurl).subscribe({
      next: (data) => {
        console.log('raw inventory response:', data);
        if (Array.isArray(data)) {
          this.inventoryDetails = data;
        } else if (data && (data.items || data.value || data.results)) {
          this.inventoryDetails = data.items ?? data.value ?? data.results;
        } else if (data && typeof data === 'object' && Object.keys(data).length) {
          this.inventoryDetails = [data];
        } else {
          this.inventoryDetails = [];
        }
        this.cdr.detectChanges(); // required with provideZonelessChangeDetection()
      },
      error: (err) => {
        console.error('loadInventory failed', err);
        this.inventoryDetails = [];
        this.cdr.detectChanges();
      }
    });
    this.invertoryData = {
      Id: 0,
      productId: '',
      productName: '',
      availableQty: 0,
      reOrderPoint: 0
    };
    this.disabledProductIdInput = false;
  }

  onSubmit() {
    const apiurl = 'https://localhost:7261/api/Inventory';
    const headers = new HttpHeaders({
      Authorization: 'my-auth-token',
      'Content-Type': 'application/json'
    });

    const payload = {
      ...this.invertoryData,
      availableQty: Number(this.invertoryData.availableQty),
      reOrderPoint: Number(this.invertoryData.reOrderPoint)
    };
    if (this.disabledProductIdInput) {
      this.httpClient.put(apiurl, payload, { headers, responseType: 'text' as const }).subscribe({
        next: v => console.log(v),
        error: e => console.error(e),
        complete: () => {
          this.loadInventory(); // refresh list without calling lifecycle hook
          alert('Inventory Updated!' + JSON.stringify(payload));
        }
      });
    } else {
      this.httpClient.post(apiurl, payload, { headers, responseType: 'text' as const }).subscribe({
        next: v => console.log(v),
        error: e => console.error(e),
        complete: () => {
          this.loadInventory(); // refresh list without calling lifecycle hook
          alert('Form submitted!' + JSON.stringify(payload));
        }
      });
    }
    this.disabledProductIdInput = false;
    
  }
  openConfirmDialog(productId: number) {
    this.productIdToDelete = productId;
    console.log('Product ID to delete:', this.productIdToDelete);
    this.modalService.open(DialogBox).result.then(data => {
      if (data.event == "confirm") {
        this.deleteInvetory();
      }
    });
  }

  deleteInvetory(): void {
    let apiurl = "https://localhost:7261/api/Inventory/?productId=" + this.productIdToDelete;
    this.httpClient.delete(apiurl).subscribe(data => {
      this.loadInventory();
    });
  }
  populateFormForEdit(inventory: any) {
    this.invertoryData = { ...inventory };
    this.disabledProductIdInput = true;
  }
}

