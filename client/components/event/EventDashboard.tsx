import React from 'react';
import Styles from '../../utils/styles.js';
import { BiEdit } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { setEventMode } from '../../store/actions';
import { Store } from '../../types.js';

function EventDashboard() {
  const user = useSelector((state: Store) => state.user);
  const activeEvent = useSelector((state: Store) => state.activeEvent);

  const dispatch = useDispatch();

  const colors = [
    'bg-cyan-300',
    'bg-blue-200',
    'bg-green-200',
    'bg-teal-200',
    'bg-amber-100',
  ]

  const handleClick = (newEventMode: string) => {
    dispatch(setEventMode(newEventMode))
  }

  return (
    activeEvent && (
      <>
        <div className={Styles.title+' flex-wrap'}>
          {activeEvent.name}
          {activeEvent.organisers.includes(user._id) && <button onClick={()=>{handleClick('manageEvent')}}><BiEdit color='gray' className='ml-2' size='28px' /></button>}
        </div>
        <div className={Styles.bodyContainerLong}>
          <div className='flex flex-row'>
            <button onClick={()=>{handleClick('eventDetails')}} className={Styles.buttonLong}>Event Details</button>
            <button onClick={()=>{handleClick('eventParticipants')}} className={Styles.buttonLong+' ml-4'}>Participants</button>
          </div>
          <div className='mt-4 mb-12 overflow-y-auto'>
            {activeEvent.eventComms.map((comm, index)=>(
              <div key={comm._id} className={colors[index%5]+' border border-black rounded mt-6 p-6'}>
                <div className='text-24px mb-4'>{comm.title}</div>
                <div className='mx-2 text-18px'>{comm.body}</div>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  );
}

export default EventDashboard;