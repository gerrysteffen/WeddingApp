import React from 'react';
import Styles from '../../utils/styles';

function Step2({guests, step}) {
  const rsvpFields = {
    mealPreference: {
      label: 'Meal preference',
      multiple: false,
      options: [
        'Meat',
        'Fish',
        'Vegetarian',
        'Vegan',
        'Kids Menu'
      ]
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
      ]
    }
  }
  
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(event.target[0].value)
    console.log(event.target[1].value)
    console.log(event.target[2].value)
  }
  
  return (
    <>
      <div className='flex flex-row justify-center flex-wrap'>
        {guests.length > 0 && guests.map((guest, index) => {return (
          <button key={index} className='mr-1 mt-1 border border-black p-2 bg-slate-200 rounded w-40'>{guest.firstName+' '+guest.lastName}</button>
        )})}
      </div>
      <form onSubmit={(event)=>{handleSubmit(event)}} className='flex flex-col'>
        {Object.keys(rsvpFields).map((key)=>{return (
          <div key={key} className='flex flex-col'>
            <label className='mt-2 pl-2'>{rsvpFields[key].label}</label>
            <select name={key} className='border border-black p-2' multiple={rsvpFields[key].multiple}>
              {rsvpFields[key].options.map((option)=>{return(
                <option key={option} value={option}>{option}</option>
              )
              })}
            </select>
          </div>
        )})}
        {/* <label className='mt-2 pl-2'>Address Line 1</label>
        <input value={addressLine1} onChange={(event)=>{setAddressLine1(event.target.value)}} type='text' placeholder='Street' className='border border-black p-2'></input>
        <label className='mt-2 pl-2'>Address Line 1</label>
        <input value={addressLine2} onChange={(event)=>{setAddressLine2(event.target.value)}} type='text' placeholder='Apartment, Suite, ...' className='border border-black p-2'></input>
        <label className='mt-2 pl-2'>City</label>
        <input value={city} onChange={(event)=>{setCity(event.target.value)}} type='text' placeholder='City' className='border border-black p-2'></input>
        <label  className='mt-2 pl-2'>State</label>
        <input value={state} onChange={(event)=>{setState(event.target.value)}} type='text' placeholder='State' className='border border-black p-2'></input>
        <label  className='mt-2 pl-2'>Postal Code</label>
        <input value={postalCode} onChange={(event)=>{setPostalCode(event.target.value)}} type='text' placeholder='Postal Code' className='border border-black p-2'></input>
        <label  className='mt-2 pl-2'>Country</label>
        <input value={country} onChange={(event)=>{setCountry(event.target.value)}} type='text' placeholder='Country' className='border border-black p-2'></input> */}
        <div className='w-full flex flex-row justify-between'>
          <button type='button' onClick={()=>{step.decrease()}} className={Styles.buttonShort}>Back</button>
          <button type='submit' className={Styles.buttonShort}>Continue</button>
        </div>
      </form>
    </>
  );
}

export default Step2;