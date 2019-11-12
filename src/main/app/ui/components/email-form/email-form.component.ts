import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { SubscriptionService } from 'src/main/app/core/service/subscription.service';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss']
})
export class EmailFormComponent implements OnInit {
  
  /**
   * The inputted email value.
   */
  email: String;

  /**
   * Email form control.
   */
  emailFormControl = new FormControl('', [
    Validators.email,
    Validators.required
  ]);

  /**
   * Email form matcher.
   */
  matcher = new EmailErrorStateMatcher();

  /**
   * Whether an email has been submitted.
   */
  isSubmitted = false;

  constructor(
    private subscriptionService: SubscriptionService
  ) { }

  ngOnInit() {
  }

  /**
   * Invoked when the subscribe button is clicked.
   */
  onSubscribe() {
    if (this.emailFormControl.invalid || !this.email || this.email.length <= 0) {
      return;
    }

    this.subscriptionService.subscribeEmail(this.email);
    this.isSubmitted = true;
  }
}

class EmailErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid);
  }
}