import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ActiveEvent, Store } from '../../types';
import Styles from '../../utils/styles';

function EventDetails() {
  const activeEvent = useSelector((state: Store) => state.activeEvent);

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

  activeEvent.dateShort = String(new Date(activeEvent.date).getDay())+' '+months[new Date(activeEvent.date).getUTCMonth()]+' '+String(new Date(activeEvent.date).getFullYear())

  const infoKeys = ['name', 'description', 'dateShort'];

  const infoTitles = ['Name', 'Description', 'Date'];

  return (
    <>
      <h1 className={Styles.title}>Event Details</h1>
      <div className={Styles.bodyContainer}>
        {infoKeys.map((key, index) => {
          if (activeEvent[key]) {
            return (
              <div
                key={key}
                className='h-fit mb-4 flex flex-row justify-between items-top'
              >
                <div className='mr-6 w-1/2'>{infoTitles[index]}</div>
                <div className='w-full'>{activeEvent[key]}</div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
}

export default EventDetails;
