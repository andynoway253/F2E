import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbToastrService, NbStepperComponent } from '@nebular/theme';

@Component({
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  constructor(private toastrService: NbToastrService) {}

  @ViewChild('stepper') stepper: NbStepperComponent;

  activeOption = '';

  cards = [
    {
      name: '信用卡/金融卡',
      image: 'assets/image/stage4/credit-card.svg',
    },
    {
      name: '銀聯卡',
      image: 'assets/image/stage4/unionpay.svg',
    },
    {
      name: '超商付款',
      image: 'assets/image/stage4/shop.svg',
    },
    {
      name: 'Web ATM',
      image: 'assets/image/stage4/web-atm.svg',
    },
    {
      name: 'ATM 轉帳',
      image: 'assets/image/stage4/atm.svg',
    },
  ];

  ngOnInit(): void {}

  setActive(option: string) {
    this.activeOption = option;
  }

  isActive(option: string) {
    return this.activeOption === option;
  }

  checkPayType() {
    if (!this.activeOption) {
      this.toastrService.warning('請先選擇付款方式', '警告', {
        preventDuplicates: true,
      });
      return;
    }

    this.stepper.next();
  }

  nextStep(form: FormGroup) {
    form.valid && this.stepper.next();

    this.stepChange(form);
  }

  prevStep(form: FormGroup) {
    this.stepper.previous();

    this.stepChange(form);
  }

  stepChange(form: FormGroup) {
    form.reset();

    form.markAsPristine();
  }
}

@Component({
  selector: 'form-error-display',
  template: `
    <div *ngIf="displayError">
      <div class="text-danger" fxLayoutAlign="start">
        {{ errorMsg }}
      </div>
    </div>
  `,
})
export class FormErrorDisplayComponent implements OnInit {
  @Input() errorMsg: string = '';

  @Input() displayError: boolean;

  ngOnInit(): void {}
}
