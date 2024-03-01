import { Subscription } from "rxjs";
import { v4 as uuidv4 } from "uuid";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NzNotificationService } from "ng-zorro-antd/notification";

// model
import { Customer } from "src/app/model/customer";

// service
import { CustomerService } from "src/app/services/customer.service";

@Component({
  selector: "app-customer-register-modal",
  templateUrl: "./customer-register-modal.component.html",
  styleUrls: ["./customer-register-modal.component.css"],
})
export class CustomerRegisterComponent {
  loading = false;
  @Input() isVisible = false;
  registerCustomerForm!: FormGroup;
  customerAdditionSubscription: Subscription | undefined;
  @Output() isVisibleChange: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();
  @Output() customerCreated: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.registerCustomerForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      phone: ["", Validators.required],
    });
  }

  generateUniqueId(): string {
    return uuidv4();
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }

  addCustomers(): void {
    if (this.registerCustomerForm.valid) {
      this.loading = true;

      const customer: Customer = {
        id: this.generateUniqueId(),
        email: this.registerCustomerForm.value.email,
        firstName: this.registerCustomerForm.value.firstName,
        lastName: this.registerCustomerForm.value.lastName,
        phone: this.registerCustomerForm.value.phone,
      };

      // check for existing customer by customer's id
      this.customerService.getCustomers().subscribe({
        next: res => {
          const customerExist = res.find(i => i.id === customer.id);

          if (customerExist) {
            this.notification.error("Error found", `${customerExist.firstName}  ${customerExist.lastName} has been signed up already`)
            return
          }

          // add customer's data to the database
          this.customerAdditionSubscription = this.customerService
            .addCustomer(customer)
            .subscribe({
              next: (res) => {
                this.notification.success(
                  "Success",
                  `${res.firstName} ${res.lastName} created successfully`
                );
                this.customerCreated.emit();
                this.isVisible = false;
                this.isVisibleChange.emit(this.isVisible);
              },
              error: (error) => {
                this.notification.error("Error found", error.message);
              },
              complete: () => this.loading = false
            });
        },
        error: (error) => {
          this.notification.error("Error found", error.message);
        },
        complete: () => this.loading = false
      })


    } else {
      Object.values(this.registerCustomerForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.customerAdditionSubscription) {
      this.customerAdditionSubscription.unsubscribe();
    }
  }
}
