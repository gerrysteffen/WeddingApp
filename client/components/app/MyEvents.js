import React, { useEffect } from 'react';
import apiCalls from '../../utils/apis';

function MyEvents({util}) {

  useEffect(()=>{
    const fetchData = async () => {
      const res = await apiCalls.getEvents(util.accessToken)
      console.log(res)
    }
    fetchData()
  },[])

  return (
    <>
      <h1 className='absolute top-10 left-6 text-48px'>My Events</h1>
      <div className='absolute top-32 bottom-24 left-0 w-full flex flex-col px-6'>
        {/* <form id='dataStep1' className='flex flex-col'>
          <label className='pl-2'>Name</label>
          <input value={name} onChange={(event)=>{setName(event.target.value)}} type='text' placeholder='Name of the event' className='border border-black p-2'></input>
          <label className='mt-2 pl-2'>Date</label>
          <input value={date} onChange={(event)=>{setDate(event.target.value)}} type='date' className='border border-black p-2'></input>
          <label className='mt-2 pl-2'>Description</label>
          <input value={description} onChange={(event)=>{setDescription(event.target.value)}} type='text' placeholder='Give it a Tagline' className='border border-black p-2'></input>
        </form> */}
      </div>
      <div className='absolute left-6 right-6 bottom-10 flex flex-row justify-between'>
        <button className='w-24 mt-4 border border-black p-2 bg-slate-200 rounded' onClick={()=>{util.setMode('main')}}>Back</button>
        <button type='submit' onClick={()=>{console.log('hello')}} className='w-24 mt-4 border border-black p-2 bg-slate-200 rounded'>Create</button>
      </div>
    </>
  );
}

export default MyEvents;