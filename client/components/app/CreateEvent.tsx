import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import apiCalls from '../../utils/apis';
import Styles from '../../utils/styles';
import { StateType } from '../../types';

function CreateEvent({util}) {
  const [eventInfo, setEventInfo] = useState({
    name: '',
    date: '',
    description: ''
  })
  const accessToken = useSelector((state: StateType) => state.accessToken);

  const handleChange = (e) => {
    setEventInfo({
      ...eventInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const res = await apiCalls.postEvent(accessToken, eventInfo)
    // TODO: Change this to user attribute
    util.setActiveEventId(res._id)
    util.setMode('eventDashboard')
  }

  return (
    <>
      <h1 className={Styles.title}>Create Event</h1>
      <div className={Styles.bodyContainer}>
        <form id='dataStep1' className='flex flex-col'>
          <label className='pl-2'>Name</label>
          <input value={eventInfo.name} name='name' onChange={(e)=>{handleChange(e)}} type='text' placeholder='Name of the event' className='border border-black p-2'></input>
          <label className='mt-2 pl-2'>Date</label>
          <input value={eventInfo.date} name='date' onChange={(e)=>{handleChange(e)}} type='date' className='border border-black p-2'></input>
          <label className='mt-2 pl-2'>Description</label>
          <textarea value={eventInfo.description} name='description' onChange={(e)=>{handleChange(e)}} rows={6} placeholder='Give it a description or tagline' className='border border-black p-2'></textarea>
        </form>
      </div>
      <div className={Styles.buttonContainer}>
        <button type='submit' onClick={()=>{handleSubmit()}} className={Styles.buttonLong}>Create</button>
      </div>
    </>
  );
}

export default CreateEvent;