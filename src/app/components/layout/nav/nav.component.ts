import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  authenticatedUser: User | undefined;

  constructor(private route: Router, private storageService: StorageService) { }

  ngOnInit(): void {
    const userData = this.storageService.getUserData();
    if (userData) {
      this.authenticatedUser = userData
    }
  }

  logout() {
    this.storageService.clearSession()
    this.route.navigate(['/login'])
  }
}
