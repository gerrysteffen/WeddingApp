import React from 'react';
import Styles from '../../utils/styles';

function Step3({ invite, rsvp, step }) {
  return (
    <>
      <div>
        <div className='mb-4'>
          <div className='font-bold'>Attendance Status</div>
          <div>{invite.attendanceStatus}</div>
      </div>
        <div className='font-bold mb-4'>Guests</div>
        {invite.guests.map((guest, index)=>(
          <div className='mb-4 ml-2'>
            <div className='font-bold'>{guest.firstName+' '+guest.lastName}</div>
            <div className='flex flex-row justify-start'>
              <div>Meal Preference:</div>
              <div className='ml-4'>{rsvp[index].mealPreference}</div>
            </div>
            <div>Allergies:</div>
            {rsvp[index].allergies.length>0 ? (
              rsvp[index].allergies.map((allergy) => (
                <div className='ml-4'>{allergy}</div>
              ))
            ):(
              <div className='ml-4 italic'>No Allergies</div>
            )}
          </div>
        ))}
      </div>
      <div className={Styles.buttonContainer}>
          <button
            type='button'
            onClick={() => {
              step.decrease();
            }}
            className={Styles.buttonShort}
          >
            Back
          </button>
          <button
            type='button'
            onClick={() => {
              step.submit()
            }}
            className={Styles.buttonShort}
          >
            Submit
          </button>
        </div>
    </>
  );
}

export default Step3;