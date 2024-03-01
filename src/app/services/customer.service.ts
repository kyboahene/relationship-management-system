import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../model/customer';

const API_URL = "http://localhost:3000"

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomers() {
    return this.http.get<Customer[]>(`${API_URL}/customers`)
  }

  getCustomer(customerId: string) {
    return this.http.get<Customer>(`${API_URL}/customers/${customerId}`)
  }

  addCustomer(customer: Customer) {
    return this.http.post<Customer>(`${API_URL}/customers`, customer)
  }
}
