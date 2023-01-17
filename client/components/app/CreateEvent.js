import React, { useState } from 'react';
import apiCalls from '../../utils/apis';
import Styles from '../../utils/styles';

function CreateEvent({util}) {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')

  const data = {
    name,
    date: new Date(date),
    description,
  }

  const handleSubmit = async () => {
    const res = await apiCalls.postEvent(util.accessToken, data)
    util.setActiveEventId(res._id)
    util.setMode('eventDashboard')
  }

  return (
    <>
      <h1 className={Styles.title}>Create Event</h1>
      <div className={Styles.bodyContainer}>
        <form id='dataStep1' className='flex flex-col'>
          <label className='pl-2'>Name</label>
          <input value={name} onChange={(event)=>{setName(event.target.value)}} type='text' placeholder='Name of the event' className='border border-black p-2'></input>
          <label className='mt-2 pl-2'>Date</label>
          <input value={date} onChange={(event)=>{setDate(event.target.value)}} type='date' className='border border-black p-2'></input>
          <label className='mt-2 pl-2'>Description</label>
          <textarea value={description} onChange={(event)=>{setDescription(event.target.value)}} rows='6' placeholder='Give it a description or tagline' className='border border-black p-2'></textarea>
        </form>
      </div>
      <div className={Styles.buttonContainer}>
        <button type='submit' onClick={()=>{handleSubmit()}} className={Styles.buttonLong}>Create</button>
      </div>
    </>
  );
}

export default CreateEvent;