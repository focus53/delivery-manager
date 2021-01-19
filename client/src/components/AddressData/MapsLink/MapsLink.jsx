import React from 'react';

export const MapsLink = (props) => {
  return (
    <div>
      <a
        target="_blank"
        rel="noreferrer"
        href={
          props.routing.find((el) => el.date === props.selectedDate)?.mapsLinks[props.storageLinkMethod] ||
          props.defaultLink
        }
      >
        Link to Google Maps
      </a>
    </div>
  );
};
