import React, { useEffect, useState } from 'react';

function Step2({ registration, step }) {
  const [addressLine1, setAddressLine1] = useState(registration.address.addressLine1)
  const [addressLine2, setAddressLine2] = useState(registration.address.addressLine2)
  const [city, setCity] = useState(registration.address.city)
  const [state, setState] = useState(registration.address.state)
  const [postalCode, setPostalCode] = useState(registration.address.postalCode)
  const [country, setCountry] = useState(registration.address.country)

  const data = {
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
  }

  return (
    <>
      <div className='h-full overflow-y-auto mb-24'>
        <form className='flex flex-col'>
          <label className='pl-2'>Address Line 1</label>
          <input value={addressLine1} onChange={(event)=>{setAddressLine1(event.target.value)}} type='text' placeholder='Street' className='border border-black p-2'></input>
          <label className='mt-2 pl-2'>Address Line 2</label>
          <input value={addressLine2} onChange={(event)=>{setAddressLine2(event.target.value)}} type='text' placeholder='Apartment, Suite, ...' className='border border-black p-2'></input>
          <label className='mt-2 pl-2'>City</label>
          <input value={city} onChange={(event)=>{setCity(event.target.value)}} type='text' placeholder='City' className='border border-black p-2'></input>
          <label  className='mt-2 pl-2'>State</label>
          <input value={state} onChange={(event)=>{setState(event.target.value)}} type='text' placeholder='State' className='border border-black p-2'></input>
          <label  className='mt-2 pl-2'>Postal Code</label>
          <input value={postalCode} onChange={(event)=>{setPostalCode(event.target.value)}} type='text' placeholder='Postal Code' className='border border-black p-2'></input>
          <label  className='mt-2 pl-2'>Country</label>
          <input value={country} onChange={(event)=>{setCountry(event.target.value)}} type='text' placeholder='Country' className='border border-black p-2'></input>
        </form>
        <div className='absolute left-6 right-6 bottom-10 flex flex-row justify-between'>
          <button type='button' onClick={()=>{step.gatherData(data); step.decrease()}} className='w-24 mt-4 border border-black p-2 bg-slate-200 rounded'>Back</button>
          <button type='button' onClick={()=>{step.gatherData(data); step.increase()}} className='w-24 mt-4 border border-black p-2 bg-slate-200 rounded'>Continue</button>
        </div>
      </div>
    </>
  );
}

export default Step2;