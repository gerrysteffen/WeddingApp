import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Styles from '../../utils/styles';

function PublicEventDetails({ event, setMode }) {
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
  ];

  event.dateShort =
    String(new Date(event.date).getDay()) +
    ' ' +
    months[new Date(event.date).getUTCMonth()] +
    ' ' +
    String(new Date(event.date).getFullYear());

  const infoKeys = ['name', 'description', 'dateShort'];

  const infoTitles = ['Name', 'Description', 'Date'];

  return (
    <>
      <h1 className={Styles.title}>Event Details</h1>
      <div className={Styles.bodyContainer}>
        <div className='flex flex-row'>
          <button
            onClick={() => {
              setMode('eventPage');
            }}
            className={Styles.buttonLong}
          >
            Back to Event Page
          </button>
        </div>
        <div className='mt-6'>
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
      </div>
      <div className={Styles.buttonContainer}>
        <Link href='/login' className='w-full h-full' >
        <button className={Styles.buttonColor}>Log in to see more</button>
        </Link>
      </div>
    </>
  );
}

export default PublicEventDetails;
