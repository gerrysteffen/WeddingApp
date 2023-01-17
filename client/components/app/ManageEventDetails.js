import React, { useState } from 'react';
import apiCalls from '../../utils/apis';
import Styles from '../../utils/styles';

function ManageEventDetails({ event, util }) {
  const [eventInfo, setEventInfo] = useState(event);
  const [editMode, setEditMode] = useState(false);

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

  const handleEventChange = (event) => {
    setEventInfo({
      ...eventInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleEventSubmit = async () => {
    const res = await apiCalls.updateEvent(util.accessToken, eventInfo);
    if (res.error) {
      console.log(res.message);
    } else {
      setEventInfo(res);
      event = res;
      setEditMode(false);
    }
  };

  return (
    <>
      <h1 className={Styles.title}>Event Details</h1>
      <div className={Styles.bodyContainer}>
        {infoKeys.map((key, index) => {
          if (eventInfo[key]) {
            return (
              <div
                key={key}
                className='h-fit mb-4 flex flex-row justify-between items-top'
              >
                <div className='mr-6 w-1/2'>{infoTitles[index]}</div>
                {/* Two possibilities: no edit mode -> User information static; edit mode -> user information in input fields*/}
                {!editMode ? (
                  <div className='w-full'>{eventInfo[key]}</div>
                ) : (
                  <input
                    type='text'
                    name={key}
                    value={eventInfo[key]}
                    onChange={(event) => handleEventChange(event)}
                    className='border border-black p-2'
                  ></input>
                )}
              </div>
            );
          }
        })}
        {/* Below code shows possibility to initiate password change - if updating of general information 
        or password is in progress, the password line disappears and a submit button is shown instead */}
        {editMode && (
          <div className='h-14 flex flex-row items-center'>
            <button
              onClick={() => {
                handleEventSubmit();
              }}
              className={Styles.buttonLong}
            >
              Submit
            </button>
          </div>
        )}
      </div>

      {/* Below code to initiate/cancel updating of general information / exiting of pw mode*/}
      <div className={Styles.buttonContainer}>
        {editMode ? (
          <button
            onClick={() => {
              setEventInfo(event);
              setEditMode(!editMode);
            }}
            className={Styles.buttonLong}
          >
            Cancel
          </button>
        ) : (
          <button
            onClick={() => {
              setEditMode(!editMode);
            }}
            className={Styles.buttonLong}
          >
            Edit
          </button>
        )}
      </div>
    </>
  );
}

export default ManageEventDetails;