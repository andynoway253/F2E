import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  constructor() {}

  activeOption: string = '';

  cards = [
    { name: '信用卡/金融卡', image: 'assets/image/stage4/credit-card.svg' },
    { name: '銀聯卡', image: 'assets/image/stage4/unionpay.svg' },
    { name: '超商付款', image: 'assets/image/stage4/shop.svg' },
    { name: 'Web ATM', image: 'assets/image/stage4/web-atm.svg' },
    { name: 'ATM 轉帳', image: 'assets/image/stage4/atm.svg' },
  ];

  ngOnInit(): void {}

  setActive(option: string) {
    this.activeOption = option;
  }

  isActive(option: string) {
    return this.activeOption === option;
  }
}
