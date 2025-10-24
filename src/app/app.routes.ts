import { Routes } from '@angular/router';
import { Inventory } from './AppComponent/inventory/inventory';
import { Customers } from './AppComponents/customers/customers';
export const routes: Routes = [{path: 'inventory', component:Inventory},{path: 'customers', component:Customers}];
