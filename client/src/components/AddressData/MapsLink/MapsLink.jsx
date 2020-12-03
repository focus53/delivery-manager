import React from 'react';

export const MapsLink = (props) => {
  return (
    <div>
      <a
        target="_blank"
        rel="noreferrer"
        href={
          props.routing.some((el) => el.date === props.selectedDate) &&
          props.routing.find((el) => {
            return el.date === props.selectedDate;
          })[`${props.storageLinkMethod}`]
        }
      >
        Link to Google Maps
      </a>
    </div>
  );
};
