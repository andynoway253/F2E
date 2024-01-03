import { Component, Input, OnInit } from '@angular/core';
import { Card, Suit } from '../models';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  // @Input() cardName: any = [];


  @Input() card: Card;


  get imgSrc(): string {
    // return 'assets/image/stage2/' + this.cardName + '.png';
    return `assets/image/stage2/${this.card.rank}${Suit[this.card.suit].toUpperCase()[0]}.png`;

  }

  ngOnInit(): void {}
}
