import React, { useState } from 'react';
import apiCalls from '../../utils/apis';
import Styles from '../../utils/styles';

function CreateEventComms({util}) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const data = {
    title,
    body,
    event: util.activeEventId
  }

  const handleSubmit = async () => {
    await apiCalls.postComm(util.accessToken, data)
    util.setMode('manageEventComms')
  }

  return (
    <>
      <h1 className={Styles.title}>Post Information</h1>
      <div className={Styles.bodyContainer}>
        <form id='dataStep1' className='flex flex-col'>
          <label className='pl-2'>Title</label>
          <input value={title} onChange={(event)=>{setTitle(event.target.value)}} type='text' placeholder='Name of the event' className='border border-black p-2'></input>
          <label className='mt-2 pl-2'>Body</label>
          <textarea value={body} onChange={(event)=>{setBody(event.target.value)}} rows='6' placeholder='Give it a description or tagline' className='border border-black p-2'></textarea>
        </form>
      </div>
      <div className={Styles.buttonContainer}>
        <button type='submit' onClick={()=>{handleSubmit()}} className={Styles.buttonLong}>Post</button>
      </div>
    </>
  );
}

export default CreateEventComms;