import { Injectable } from '@angular/core';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';

import { User } from '../model/user';

import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService) { }

  login(email: string, password: string): Observable<User> {
    return this.userService.getUsers().pipe(
      switchMap(users => {
        const user = users.find((u: User) => u.email === email && u.password === password);
        if (!user) {
          throw new Error('Invalid email or password');
        }

        return of(user);
      }),
      catchError(error => {
        return throwError(() => new Error('An error occurred: ', error));
      })
    );
  }
}
