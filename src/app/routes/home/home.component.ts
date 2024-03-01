import { Subscription } from "rxjs";
import { Component } from "@angular/core";

import { Customer } from "src/app/model/customer";
import { CustomerService } from "src/app/services/customer.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  isVisible = false;
  customers: Customer[] = []
  customersSubscription: Subscription | undefined;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers() {
    this.customersSubscription = this.customerService
      .getCustomers()
      .subscribe((_customers) => {

        console.log(_customers)
        this.customers = _customers;
      });
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleModalChange(isVisible: boolean): void {
    this.isVisible = isVisible;
  }

  ngOnDestroy(): void {
    if (this.customersSubscription) {
      this.customersSubscription.unsubscribe();
    }
  }
}
