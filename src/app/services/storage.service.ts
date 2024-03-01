// storage.service.ts
import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private tokenKey = 'user_token';
  private userDataKey = 'user_data';

  constructor() { }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getUserData(): User | null {
    const userData = localStorage.getItem(this.userDataKey);
    return userData ? JSON.parse(userData) : null;
  }

  setUserData(userData: User): void {
    localStorage.setItem(this.userDataKey, JSON.stringify(userData));
  }

  clearSession(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userDataKey);
  }
}
