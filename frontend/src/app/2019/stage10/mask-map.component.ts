import { Component, OnInit } from '@angular/core';
import { Subject, from } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { AppService } from '../../app.service';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { markers, property } from './model/model';

@Component({
  templateUrl: './mask-map.component.html',
  styleUrls: ['./mask-map.component.scss'],
})
export class MaskMapComponent implements OnInit {
  constructor(private appService: AppService) {}

  destroy$ = new Subject();

  map: L.Map;

  allClinic: markers[] = [];

  clinicList: markers[] = [];

  ngOnInit(): void {
    from(
      fetch(
        'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json?fbclid=IwAR0oowBRjj1goAMqtnugBiXMTMY8OCl14TGmgt3YDJi9w5BXs4VsfZQ9mDI'
      )
    )
      .pipe(
        switchMap((response) => response.json()),
        map((res) => res.features)
      )
      .subscribe({
        next: (res: markers[]) => {
          const initCoordinate = res[0].geometry.coordinates; //  第一筆當作初始座標

          this.allClinic = res;

          this.map = L.map('map', {
            center: [initCoordinate[1], initCoordinate[0]],
            zoom: 16,
          });
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
              '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          }).addTo(this.map);
          this.map.zoomControl.remove(); //  刪除原本的縮放鈕，改放在右下角
          L.control
            .zoom({
              position: 'bottomright',
            })
            .addTo(this.map);

          const markers = L.markerClusterGroup().addTo(this.map);
          const icon = L.icon({
            iconUrl: 'assets/image/stage10/blueIcon.svg',
          });

          for (let i = 0; i < this.allClinic.length; i++) {
            const { geometry, properties } = this.allClinic[i];
            const lon = geometry.coordinates[0]; //  緯度
            const lat = geometry.coordinates[1]; //  經度

            //  幫資料都加上 openPopup function 這樣在點擊左邊list item 時就可以直接打開popup
            this.allClinic[i].openPopup = () =>
              L.marker([lat, lon], { icon })
                .addTo(this.map)
                .bindPopup(this.popupTemplate(properties), {
                  closeButton: false,
                })
                .openPopup();

            // 新贈 markers
            markers.addLayer(
              L.marker([lat, lon], { icon }).bindPopup(
                this.popupTemplate(properties),
                { closeButton: false }
              )
            );
          }
          this.map.addLayer(markers);
        },
      });

    //  右側選單縮放時，需要重新resize map
    this.appService
      .resizeMap()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          setTimeout(() => {
            this.map.invalidateSize();
          });
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }

  getNewCenter(cityArea: string[]) {
    //  取區域的第一筆資料為中心
    const location = this.allClinic.filter((item) =>
      item.properties.address.includes(cityArea.join(''))
    )[0]?.geometry.coordinates;
    const lon = location[0]; //  緯度
    const lat = location[1]; //  經度

    location && this.map.panTo([lat, lon]);

    this.clinicList = this.allClinic.filter((item) =>
      item.properties.address.includes(cityArea.join(''))
    );
  }

  popupTemplate(properties: property) {
    // 判斷口罩是否有庫存
    function maskStatus(item: number) {
      return item === 0 ? 'soldout' : 'stock';
    }

    return `
      <div>
        <div class="store-name">${properties.name}</div>
        <div class="store-info">
          <img class="icon" src="assets/image/stage10/marker.svg"/>
          ${properties.address}
        </div>
        <div class="store-info">
          <img class="icon" src="assets/image/stage10/phone.svg"/>
          ${properties.phone}
        </div>
        <div class="mask-status">
          <div class='popup mask-item ${maskStatus(
            properties.mask_adult
          )}'>大人: ${properties.mask_adult} </div>
          <div class='popup mask-item ${maskStatus(
            properties.mask_child
          )}'>小孩: ${properties.mask_child} </div>
        </div>
      </div>
    `;
  }
}
