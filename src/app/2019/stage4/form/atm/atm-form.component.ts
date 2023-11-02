import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'atm-form',
  templateUrl: './atm-form.component.html',
})
export class ATMFormComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  @Output() next = new EventEmitter<FormGroup>();

  @Output() prev = new EventEmitter<any>();

  ATMForm: FormGroup = this.fb.group({
    bank: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    check: [false, [Validators.requiredTrue]],
  });

  banks = [
    '台新國際商業銀行',
    '國泰世華商業銀行',
    '中國信託商業銀行',
    '玉山商業銀',
  ];

  ngOnInit(): void {}

  //  當欄位無效且已被觸碰
  isFieldValid(field: string): boolean {
    return !this.ATMForm?.get(field).valid && this.ATMForm?.get(field).touched;
  }

  prevStep() {
    this.prev.emit();
  }

  nextStep() {
    this.next.emit(this.ATMForm);
  }

  onSubmit() {
    this.ATMForm.markAllAsTouched();
  }
}
