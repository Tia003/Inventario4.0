import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-OTP-Verification',
  templateUrl: './OTP-Verification.component.html',
  styleUrls: ['./OTP-Verification.component.css']
})
export class OTPVerificationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  otp: (number | null)[] = [null, null, null, null, null, null];

  onOtpChange(index: number) {
    const currentValue = this.otp[index];
    const parsedValue = parseInt(currentValue as unknown as string, 10);

    if (isNaN(parsedValue)) {
      this.otp[index] = null;
      if (index > 0) {
        const input = document.getElementsByTagName('input');
        input[index - 1].focus();
      }
    } else {
      this.otp[index] = parsedValue;
      if (index < 5) {
        const input = document.getElementsByTagName('input');
        input[index + 1].focus();
      }
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' || event.key === 'Delete') {
      if (this.otp[index] === null && index > 0) {
        const input = document.getElementsByTagName('input');
        input[index - 1].focus();
        this.otp[index - 1] = null;
      }
    }
  }

  verifyOtp() {
    const enteredOtp = this.otp.join('');
    console.log('Entered OTP:', enteredOtp);
  }

}
