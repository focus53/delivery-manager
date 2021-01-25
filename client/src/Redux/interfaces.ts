import { UserInterface } from './user/userInterface';
import { DeliveryInterface } from './delivery/deliveryInterface';

export interface StateInterfaces {
  deliveryReducer: DeliveryInterface;
  userReducer: UserInterface;
}
