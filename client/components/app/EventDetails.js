import React, { useEffect, useState } from 'react';
import Styles from '../../utils/styles';

function EventDetails({ event }) {
  const months = [
    'January',
    'February',
    'March',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  event.dateShort = String(new Date(event.date).getDay())+' '+months[new Date(event.date).getUTCMonth()]+' '+String(new Date(event.date).getFullYear())

  const infoKeys = ['name', 'description', 'dateShort'];

  const infoTitles = ['Name', 'Description', 'Date'];

  return (
    <>
      <h1 className={Styles.title}>Event Details</h1>
      <div className={Styles.bodyContainer}>
        {infoKeys.map((key, index) => {
          if (event[key]) {
            return (
              <div
                key={key}
                className='h-fit mb-4 flex flex-row justify-between items-top'
              >
                <div className='mr-6 w-1/2'>{infoTitles[index]}</div>
                <div className='w-full'>{event[key]}</div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
}

export default EventDetails;
