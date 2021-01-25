import React from 'react';
import { Routing } from '../../../Redux/delivery/deliveryInterface';

type Props = {
  routing: Routing[];
  selectedDate: string;
  storageLinkMethod: string;
};

export const MapsLink: React.FC<Props> = (props) => {
  return (
    <div>
      <a
        target="_blank"
        rel="noreferrer"
        // @ts-ignore "suppressImplicitAnyIndexErrors": true
        href={props.routing.find((el) => el.date === props.selectedDate)?.mapsLinks?.[props.storageLinkMethod]}
      >
        Link to Google Maps
      </a>
    </div>
  );
};
