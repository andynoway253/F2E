import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { markers } from '../model/model';
import CityCountyData from '../common/cityData.json';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  @Input() clinicList: markers[] = [];

  @Output() newCoordinate: EventEmitter<string[]> = new EventEmitter();

  cityList: string[] = [];

  areaList: string[] = [];

  selectCity = '';

  selectArea = '';

  ngOnInit(): void {
    this.cityList = CityCountyData.map((item) => {
      return item.CityName;
    });

    this.areaList = CityCountyData.filter(
      (item) => item.CityName === this.selectCity
    )[0]?.AreaList.map((item) => item.AreaName);
  }

  onSelectedChange(e: string, action: string) {
    if (action === 'city') {
      this.areaList = CityCountyData.filter(
        (item) => item.CityName === e
      )[0].AreaList.map((item) => item.AreaName);
      setTimeout(() => {
        this.selectArea = this.areaList[0];
        this.newCoordinate.emit([this.selectCity, this.selectArea]);
      });
    }

    if (action === 'area') {
      this.newCoordinate.emit([this.selectCity, this.selectArea]);
    }
  }

  itemClicked(e: markers) {
    e.openPopup();
  }

  maskStatus(mask: number): string {
    return mask ? 'stock' : 'soldout';
  }
}
