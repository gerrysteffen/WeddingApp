import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveEvent } from '../../store/actions';
import { Store } from '../../types';
import apiCalls from '../../utils/apis';
import Styles from '../../utils/styles';

function ManageEventDetails() {
  const accessToken = useSelector((state: Store) => state.accessToken);
  const activeEvent = useSelector((state: Store) => state.activeEvent);
  const [eventInfo, setEventInfo] = useState({...activeEvent});
  const [editMode, setEditMode] = useState(false);

  const dispatch = useDispatch()

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
  //TODO: Do this once rather than in multiple components

  const infoKeys = ['name', 'description', 'dateShort'];

  const infoTitles = ['Name', 'Description', 'Date'];

  const handleEventChange = (e) => {
    setEventInfo({
      ...eventInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleEventSubmit = async () => {
    const res = await apiCalls.updateEvent(accessToken, eventInfo);
    if (res.error) {
      console.log(res.message);
    } else {
      // TODO: normalise message back
      setEventInfo(res);
      dispatch(setActiveEvent(res));
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
                    onChange={(e) => handleEventChange(e)}
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
              setEventInfo(activeEvent);
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