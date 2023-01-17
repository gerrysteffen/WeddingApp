import React, { useEffect, useState } from 'react';
import Styles from '../../utils/styles';
import { IoMdCloseCircle, IoMdCheckmarkCircle } from 'react-icons/Io';

function Step2({ invite, rsvp, step }) {
  const [currentGuest, setCurrentGuest] = useState(0);
  const [rsvpInfo, setRsvpInfo] = useState(
    invite.guests.map((guest) => {
      return { mealPreference: '', allergies: [] };
    })
  );
  const [buttonDisabledStatus, setButtonStatus] = useState(true);

  const toggleButtonStatus = () => {
    let disabled = false;
    for (let i = 0; i < invite.guests.length; i++) {
      if (rsvpInfo[i].mealPreference === '') disabled = true;
    }
    setButtonStatus(disabled);
  };

  useEffect(() => {
    if (rsvp && rsvp.length > 0) {
      const newRsvpInfo = rsvpInfo.slice();
      for (let i = 0; i < rsvp.length; i++) {
        newRsvpInfo[i] = rsvp[i];
      }
      setRsvpInfo(newRsvpInfo);
    }
  }, []);

  useEffect(() => {
    toggleButtonStatus();
  });

  const rsvpFields = {
    mealPreference: {
      label: 'Meal preference',
      multiple: false,
      options: [
        'Please Choose Your Option',
        'Meat',
        'Fish',
        'Vegetarian',
        'Vegan',
        'Kids Menu',
      ],
      values: ['', 'Meat', 'Fish', 'Vegetarian', 'Vegan', 'Kids Menu'],
    },
    allergies: {
      label: 'Allergies',
      multiple: true,
      options: [
        'celery',
        'gluten',
        'crustaceans',
        'eggs',
        'fish',
        'lupin',
        'milk',
        'molluscs',
        'mustard',
        'peanuts',
        'sesame',
        'soybeans',
        'sulphur dioxide',
        'sulphites',
        'tree nuts',
      ],
      values: [
        'celery',
        'gluten',
        'crustaceans',
        'eggs',
        'fish',
        'lupin',
        'milk',
        'molluscs',
        'mustard',
        'peanuts',
        'sesame',
        'soybeans',
        'sulphur dioxide',
        'sulphites',
        'tree nuts',
      ],
    },
  };

  const handleFieldChange = (index) => {
    const newRsvpInfo = rsvpInfo.slice();
    newRsvpInfo[currentGuest].mealPreference =
      document.getElementById('mealPreference').value;
    const allergies = [];
    for (let option of document.getElementById('allergies')) {
      if (option.selected) {
        allergies.push(option.value);
      }
    }
    newRsvpInfo[currentGuest].allergies = allergies;
    setRsvpInfo(newRsvpInfo);
  };

  return (
    <>
      <div className='flex flex-row justify-center flex-wrap'>
        {invite.guests.length > 0 &&
          invite.guests.map((guest, index) => (
            <button
              key={index}
              onClick={() => setCurrentGuest(index)}
              className='mr-1 mt-1 border border-black p-2 bg-slate-200 rounded w-40 flex flex-row items-center'
            >
              {guest.firstName + ' ' + guest.lastName}
              {rsvpInfo[index].mealPreference === '' ? (
                <IoMdCloseCircle color='red' className='ml-1' />
              ) : (
                <IoMdCheckmarkCircle color='green' className='ml-1' />
              )}
            </button>
          ))}
      </div>
      <form className='flex flex-col'>
        {Object.keys(rsvpFields).map((key) => {
          return (
            <div key={key} className='flex flex-col'>
              <label className='mt-2 pl-2'>{rsvpFields[key].label}</label>
              <select
                id={key}
                name={key}
                value={rsvpInfo[currentGuest][key]}
                onChange={() => {
                  handleFieldChange();
                  toggleButtonStatus();
                }}
                className='border border-black p-2'
                multiple={rsvpFields[key].multiple}
              >
                {rsvpFields[key].options.map((option, i) => {
                  return (
                    <option key={option} value={rsvpFields[key].values[i]}>
                      {option}
                    </option>
                  );
                })}
              </select>
            </div>
          );
        })}
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
            disabled={buttonDisabledStatus}
            onClick={() => {
              step.gatherData(null, rsvpInfo);
              step.increase();
            }}
            className={Styles.buttonShort}
          >
            Continue
          </button>
        </div>
      </form>
    </>
  );
}

export default Step2;
