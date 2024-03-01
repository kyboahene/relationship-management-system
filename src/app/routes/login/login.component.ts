import { v4 as uuidv4 } from 'uuid';
import { Component } from "@angular/core";
import {
  Validators,
  UntypedFormGroup,
  UntypedFormBuilder,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { StorageService } from 'src/app/services/storage.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  loading = false;
  loginForm!: FormGroup;
  userSubscription: Subscription | undefined

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["john.doe@mailinator.com", [Validators.required]],
      password: ["pass@123", [Validators.required]],
    });
  }

  submitForm(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.userSubscription = this.authService
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe({
          next: res => {
            const token = uuidv4()
            this.storageService.setToken(token);
            this.storageService.setUserData(res);


            this.route.navigate(['/'])
          },
          error: error => {
            this.notification.error("Error found", error.message)
          },
          complete: () => this.loading = false
        });
    } else {
      Object.values(this.loginForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe()
    }
  }
}
