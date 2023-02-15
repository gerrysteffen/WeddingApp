import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEventMode } from '../../store/actions';
import { Store } from '../../types';
import apiCalls from '../../utils/apis';
import Styles from '../../utils/styles';

function CreateEventComms() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const accessToken = useSelector((state: Store) => state.accessToken);
  const activeEvent = useSelector((state: Store) => state.activeEvent);
  
  const dispatch = useDispatch();

  const data = {
    title,
    body,
    event: activeEvent._id
  }

  const handleSubmit = async () => {
    await apiCalls.postComm(accessToken, data)
    dispatch(setEventMode('manageEventComms'))
  }

  return (
    <>
      <h1 className={Styles.title}>Post Information</h1>
      <div className={Styles.bodyContainer}>
        <form id='dataStep1' className='flex flex-col'>
          <label className='pl-2'>Title</label>
          <input value={title} onChange={(event)=>{setTitle(event.target.value)}} type='text' placeholder='Name of the event' className='border border-black p-2'></input>
          <label className='mt-2 pl-2'>Body</label>
          <textarea value={body} onChange={(event)=>{setBody(event.target.value)}} rows={6} placeholder='Give it a description or tagline' className='border border-black p-2'></textarea>
        </form>
      </div>
      <div className={Styles.buttonContainer}>
        <button type='submit' onClick={()=>{handleSubmit()}} className={Styles.buttonLong}>Post</button>
      </div>
    </>
  );
}

export default CreateEventComms;