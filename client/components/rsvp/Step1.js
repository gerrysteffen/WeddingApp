import React, { useEffect, useState } from 'react';
import Styles from '../../utils/styles';

function Step1({ guests, invite, step }) {
  const [attendance, setAttendance] = useState(invite.attendanceStatus);
  const [numberOfGuests, setNumberOfGuests] = useState(guests.length - 1);
  const [guestInfo, setGuestInfo] = useState(invite.guests);
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

  const handleFieldChange = (index, attribute, value) => {
    toggleButtonStatus();
    const newGuestInfo = guestInfo.slice();
    newGuestInfo[index][attribute] = value;
    setGuestInfo(newGuestInfo);
  };

  const toggleButtonStatus = () => {
    let disabled = false;
    for (let i = 0; i<Number(document.getElementById('numberOfGuestsField').value); i++) {
      if (!guests[i] || guests[i].firstName === '' || guests[i].firstName === '' ) disabled=true
    }
    if (document.getElementById('attendanceField').value==='No response') disabled=true
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
              id='attendanceField'
              value={attendance}
              onChange={(event) => {
                setAttendance(event.target.value);
                toggleButtonStatus()
              }}
              className='w-full border border-black p-2 rounded'
            >
              <option value='No Response'>Please let us know...</option>
              <option value='Attending'>Attending</option>
              <option value='Not Sure'>Not Sure</option>
              <option value='Not Attending'>Not Attending</option>
            </select>
            {/* Guest dropdown only shown if the invitee has plus ones available per invite */}
            {invite.maxAddGuests > 0 && attendance !== '' && attendance !== 'Not Attending' && (
              <div>
                <div className='mt-2 pl-2'>
                  How many guests would you like to bring
                </div>
                <select
                  id='numberOfGuestsField'
                  value={numberOfGuests}
                  onChange={(event) => {
                    setNumberOfGuests(Number(event.target.value));
                    toggleButtonStatus()
                  }}
                  className='w-full border border-black p-2 rounded'
                >
                  <option value='0'>0</option>
                  {invite.maxAddGuests >= 1 && <option value='1'>1</option>}
                  {invite.maxAddGuests >= 2 && <option value='2'>2</option>}
                  {invite.maxAddGuests >= 3 && <option value='3'>3</option>}
                  {invite.maxAddGuests >= 4 && <option value='4'>4</option>}
                  {invite.maxAddGuests >= 5 && <option value='5'>5</option>}
                  {invite.maxAddGuests >= 6 && <option value='6'>6</option>}
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
