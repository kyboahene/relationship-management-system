import { Component, Input } from '@angular/core';
import { Customer } from 'src/app/model/customer';

@Component({
  selector: 'app-customers-table',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  @Input() customers: Customer[] = []
}
