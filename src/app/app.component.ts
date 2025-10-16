import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterModule } from '@angular/router';
import { Inventory } from './AppComponent/inventory/inventory';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkWithHref, RouterModule, Inventory],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class App {
  protected readonly title = signal('gadget-shop');
}
