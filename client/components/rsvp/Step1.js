import React, { useEffect, useState } from 'react';
import Styles from '../../utils/styles';

function Step1({ guests, step }) {
  const [attendance, setAttendance] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState(guests.length - 1);
  const [guestInfo, setGuestInfo] = useState([{ firstName: '', lastName: '' }]);
  const [ready, setReady] = useState(false);
  const [buttonDisabledStatus, setButtonStatus] = useState(true);

  useEffect(() => {
    setGuestInfo(guests);
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      const newGuestInfo = Array(numberOfGuests);
      for (let i = 0; i <= numberOfGuests; i++) {
        if (guestInfo[i]) {
          newGuestInfo[i] = guestInfo[i];
        } else {
          newGuestInfo[i] = { firstName: '', lastName: '' };
        }
      }
      setGuestInfo(newGuestInfo);
    }
  }, [numberOfGuests]);

  const maxGuests = 1;

  const handleFieldChange = (index, attribute, value) => {
    toggleButtonStatus();
    const newGuestInfo = guestInfo.slice();
    newGuestInfo[index][attribute] = value;
    setGuestInfo(newGuestInfo);
  };

  const toggleButtonStatus = () => {
    let disabled = false;
    const fields = document.getElementById('rsvp-step1').elements;
    for (let i=0; i<fields.length; i++) {
      if (fields[i].value === '') disabled = true
    }
    setButtonStatus(disabled);
  };

  return (
    <>
      {ready && (
        <div className='h-full overflow-y-auto mb-24'>
          <form id='rsvp-step1' className='flex flex-col '>
            <label className='mt-2 pl-2'>First Name</label>
            <input
              value={guestInfo[0].firstName}
              onChange={(event) => {
                handleFieldChange(0, 'firstName', event.target.value);
              }}
              type='text'
              placeholder='First Name'
              className='border border-black p-2'
            ></input>
            <label className='mt-2 pl-2'>Last Name</label>
            <input
              value={guestInfo[0].lastName}
              onChange={(event) => {
                handleFieldChange(0, 'lastName', event.target.value);
              }}
              type='text'
              placeholder='Last Name'
              className='border border-black p-2'
            ></input>
            <div className='mt-2 pl-2'>Are you going to attend?</div>
            <select
              value={attendance}
              onChange={(event) => {
                setAttendance(event.target.value);
              }}
              className='w-full border border-black p-2 rounded'
            >
              <option value=''>Please let us know...</option>
              <option value='Attending'>Attending</option>
              <option value='Not Sure'>Not Sure</option>
              <option value='Not Attending'>Not Attending</option>
            </select>
            {/* Guest dropdown only shown if the invitee has plus ones available per invite */}
            {maxGuests > 0 && attendance !== '' && attendance !== 'Not Attending' && (
              <div>
                <div className='mt-2 pl-2'>
                  How many guests would you like to bring
                </div>
                <select
                  value={numberOfGuests}
                  onChange={(event) => {
                    setNumberOfGuests(Number(event.target.value));
                  }}
                  className='w-full border border-black p-2 rounded'
                >
                  <option>0</option>
                  {maxGuests >= 1 && <option>1</option>}
                  {maxGuests >= 2 && <option>2</option>}
                  {maxGuests >= 3 && <option>3</option>}
                  {maxGuests >= 4 && <option>4</option>}
                  {maxGuests >= 5 && <option>5</option>}
                  {maxGuests >= 6 && <option>6</option>}
                </select>
              </div>
            )}

            {/* Guest definition only shown if the invitee has plus ones selecte in above dropdown */}
            {guestInfo.length > 1 &&
              guestInfo.map((guest, index) => {
                if (index > 0) {
                  return (
                    <div className='flex flex-col' key={index}>
                      <div className='font-semibold mt-6 '>Guest {index}</div>
                      <label className='mt-2 pl-2'>First Name</label>
                      <input
                        value={guest.firstName}
                        onChange={(event) => {
                          handleFieldChange(
                            index,
                            'firstName',
                            event.target.value
                          );
                        }}
                        type='text'
                        placeholder='First Name'
                        className='border border-black p-2'
                      ></input>
                      <label className='mt-2 pl-2'>Last Name</label>
                      <input
                        value={guest.lastName}
                        onChange={(event) => {
                          handleFieldChange(
                            index,
                            'lastName',
                            event.target.value
                          );
                        }}
                        type='text'
                        placeholder='Last Name'
                        className='border border-black p-2'
                      ></input>
                    </div>
                  );
                }
              })}
          </form>
          <div className='w-full absolute right-6 bottom-10 flex flex-row justify-end'>
            <button
              type='button'
              onClick={() => {
                step.gatherData({guestInfo, attendance});
                step.increase();
              }}
              disabled={buttonDisabledStatus}
              className={Styles.buttonShort}
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Step1;
