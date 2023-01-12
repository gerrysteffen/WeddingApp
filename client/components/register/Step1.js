import React, { useState } from 'react';

function Step1({ registration, step }) {
  const [firstName, setFirstName] = useState(registration.firstName)
  const [lastName, setLastName] = useState(registration.firstName)
  const [email, setEmail] = useState(registration.firstName)
  const [password, setPassword] = useState(registration.firstName)

  const data = {
    firstName,
    lastName,
    email,
    password
  }

  return (
    <div>
      <form id='dataStep1' className='flex flex-col'>
          <label className='mt-2 pl-2'>First Name</label>
          <input value={firstName} onChange={(event)=>{setFirstName(event.target.value)}} type='text' placeholder='First Name' className='border border-black p-2'></input>
          <label className='mt-2 pl-2'>Last Name</label>
          <input value={lastName} onChange={(event)=>{setLastName(event.target.value)}} type='text' placeholder='Last Name' className='border border-black p-2'></input>
          <label className='mt-2 pl-2'>Email</label>
          <input value={email} onChange={(event)=>{setEmail(event.target.value)}} type='text' placeholder='Email' className='border border-black p-2'></input>
          <label  className='mt-2 pl-2'>Password</label>
          <input value={password} onChange={(event)=>{setPassword(event.target.value)}} type='text' placeholder='Password' className='border border-black p-2'></input>
          <div className='w-full flex flex-row justify-end'>
            <button type='button' onClick={()=>{step.gatherData(data); step.increase()}} className='mt-4 border border-black p-2 bg-slate-200 rounded'>Continue</button>
          </div>
        </form>
    </div>
  );
}

export default Step1;