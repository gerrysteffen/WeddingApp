import React from 'react';
import Styles from '../../utils/styles';

function EventDetails({ event }) {
  const infoKeys = ['name', 'description', 'date'];

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
                className='h-14 flex flex-row justify-between items-center'
              >
                <div>{infoTitles[index]}</div>
                <div>{event[key]}</div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
}

export default EventDetails;
