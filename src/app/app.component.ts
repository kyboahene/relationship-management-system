import { Component, OnInit } from '@angular/core';
import { StorageService } from './services/storage.service';
@Component({
  selector: 'app-root',
  template: `
  <div class="bg-gray-100">
      <router-outlet ></router-outlet>
  </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private storageService: StorageService) { }

  ngOnInit(): void {

  }
}
