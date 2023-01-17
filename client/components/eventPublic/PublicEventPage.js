import Link from 'next/link';
import React from 'react';
import Styles from '../../utils/styles';

function PublicEventPage({ event, setMode }) {
  const colors = [
    'bg-cyan-300',
    'bg-blue-200',
    'bg-green-200',
    'bg-teal-200',
    'bg-amber-100',
  ];

  return (
    <div>
      <div className={Styles.title}>{event.name}</div>
      <div className={Styles.bodyContainerLong+' mb-16'}>
        <div className='flex flex-row'>
          <button
            onClick={() => {
              setMode('eventDetails');
            }}
            className={Styles.buttonLong}
          >
            Event Details
          </button>
        </div>
        <div className='mt-4 mb-12 overflow-y-auto'>
          {event.eventComms.map((comm, index) => (
            <div
              key={comm._id}
              className={
                colors[index % 5] + ' border border-black rounded mt-6 p-6'
              }
            >
              <div className='text-24px mb-4'>{comm.title}</div>
              <div className='mx-2 text-18px'>{comm.body}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={Styles.buttonContainer}>
        <Link href='/login' className='w-full h-full' >
        <button className={Styles.buttonColor}>Log in to see more</button>
        </Link>
      </div>
    </div>
  );
}

export default PublicEventPage;
