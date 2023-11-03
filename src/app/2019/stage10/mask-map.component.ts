import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  templateUrl: './mask-map.component.html',
  styleUrls: ['./mask-map.component.scss'],
})
export class MaskMapComponent implements OnInit {
  constructor() {}

  map: any;

  ngOnInit(): void {
    this.map = L.map('map', { center: [25.0249211, 121.5075035], zoom: 12 });
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);

    const marker = L.marker([25.0249211, 121.5075035], { title: '我是座標' })
      .addTo(this.map)
      .bindPopup('<h1>我是彈出視窗</h1>');

    marker.openPopup(); //開啟彈出視窗
  }
}
