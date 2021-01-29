export interface Delivery {
  id: number;
  address: string;
  date: string;
  load: string;
  timeDelivery: string;
  description: string;
  storageId: number;
}

// export interface DeliveryForm extends Omit<Delivery, 'id' | 'storageId'> {}
export interface DeliveryForm {
  street: string;
  streetNumber: string;
  postCode: string;
  timeDelivery: string;
  load: number;
  description: string;
}

export type Routing = {
  date: string;
  mapsLink: { [name: string]: string };
} & {
  [name: string]: Delivery[];
};

export interface DeliveryInterface {
  baseURL: string;
  selectedDate: string;
  routing: Routing[];
  haveAddress: string[];
  mapsLink: Object;
  selectedStorage: string;
}
