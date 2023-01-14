import React, { useState } from 'react';
import Styles from '../../utils/styles';

function Step1({ registration, step }) {
  const [firstName, setFirstName] = useState(registration.firstName)
  const [lastName, setLastName] = useState(registration.lastName)
  const [email, setEmail] = useState(registration.email)
  const [password, setPassword] = useState(registration.password)

  const data = {
    firstName,
    lastName,
    email,
    password
  }

  return (
    <>
      <div className='h-full overflow-y-auto mb-24'>
        <form id='dataStep1' className='flex flex-col'>
          <label className='pl-2'>First Name</label>
          <input value={firstName} onChange={(event)=>{setFirstName(event.target.value)}} type='text' placeholder='First Name' className='border border-black p-2'></input>
          <label className='mt-2 pl-2'>Last Name</label>
          <input value={lastName} onChange={(event)=>{setLastName(event.target.value)}} type='text' placeholder='Last Name' className='border border-black p-2'></input>
          <label className='mt-2 pl-2'>Email</label>
          <input value={email} onChange={(event)=>{setEmail(event.target.value)}} type='text' placeholder='Email' className='border border-black p-2'></input>
          <label  className='mt-2 pl-2'>Password</label>
          <input value={password} onChange={(event)=>{setPassword(event.target.value)}} type='text' placeholder='Password' className='border border-black p-2'></input>
        </form>
        <div className='w-full absolute right-6 bottom-10 flex flex-row justify-end'>
          <button type='button' onClick={()=>{step.gatherData(data); step.increase()}} className={Styles.buttonShort}>Continue</button>
        </div>
      </div>
    </>
  );
}

export default Step1;