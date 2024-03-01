import { Observable, catchError, of, switchMap, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Customer } from '../model/customer';
import { HttpClient } from '@angular/common/http';


import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomers() {
    return this.http.get<Customer[]>(`${environment.apiUrl}/customers`)
  }

  getCustomer(customerId: string) {
    return this.http.get<Customer>(`${environment.apiUrl}/customers/${customerId}`)
  }

  addCustomer(customer: Customer) {
    return this.http.post<Customer>(`${environment.apiUrl}/customers`, customer)
  }

  doesCustomerExist(customer: Customer): Observable<Customer | undefined> {
    return this.getCustomers().pipe(
      switchMap(
        (customers: Customer[]) => {
          if (customers.length < 1)
            throw new Error('Could not fetch customers');

          const found = customers.find(i => i.id === customer.id);
          return of(found);
        }),
      catchError(error => {
        return throwError(() => new Error('An error occurred: ', error));
      })
    );
  }
}
