import React from 'react';

function Step3({ registration, step }) {
  return (
    <>
      <div className='h-full overflow-y-auto mb-24'>
        <div className='flex flex-row justify-between'>
          <div>First Name</div>
          <div>{registration.firstName}</div>
        </div>
        <div className='flex flex-row justify-between'>
          <div>Last Name</div>
          <div>{registration.lastName}</div>
        </div>
        <div className='flex flex-row justify-between'>
          <div>Email</div>
          <div>{registration.email}</div>
        </div>
        <div className='flex flex-row justify-start'>
          <div>Address</div>
        </div>
        <div className='flex flex-row justify-between ml-2'>
          <div>Address Line 1</div>
          <div>{registration.address.addressLine1}</div>
        </div>
        <div className='flex flex-row justify-between ml-2'>
          <div>Address Line 2</div>
          <div>{registration.address.addressLine2}</div>
        </div>
        <div className='flex flex-row justify-between ml-2'>
          <div>City</div>
          <div>{registration.address.city}</div>
        </div>
        <div className='flex flex-row justify-between ml-2'>
          <div>State</div>
          <div>{registration.address.state}</div>
        </div>
        <div className='flex flex-row justify-between ml-2'>
          <div>Postal Code</div>
          <div>{registration.address.postalCode}</div>
        </div>
        <div className='flex flex-row justify-between ml-2'>
          <div>Country</div>
          <div>{registration.address.country}</div>
        </div>
      </div>
      <div className='absolute left-6 right-6 bottom-10 flex flex-row justify-between'>
        <button
          type='button'
          onClick={() => {
            step.decrease();
          }}
          className='w-24 mt-4 border border-black p-2 bg-slate-200 rounded'
        >
          Back
        </button>
        <button
          type='button'
          onClick={() => {
            step.submit();
          }}
          className='w-24 mt-4 border border-black p-2 bg-slate-200 rounded'
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default Step3;
