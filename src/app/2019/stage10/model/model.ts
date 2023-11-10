export interface markers {
  geometry: {
    coordinates: Array<number>;
    type: string;
  };
  properties: property;
  openPopup: any;
}

export interface property {
  address: string;
  available: string;
  county: string;
  cunli: string;
  custom_note: string;
  id: string;
  mask_adult: number;
  mask_child: number;
  name: string;
  note: string;
  phone: string;
  service_periods: string;
  town: string;
  updated: string;
  website: string;
}
