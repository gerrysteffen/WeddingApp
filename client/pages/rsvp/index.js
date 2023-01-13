import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Step0 from '../../components/rsvp/Step0';
import Step1 from '../../components/rsvp/Step1';
import Step2 from '../../components/rsvp/Step2';
import Step3 from '../../components/rsvp/Step3';

function RSVPindex({ invid }) {
  const [step, setStep] = useState(1);
  const [guests, setGuests] = useState([{}]);
  const [rsvp, setRSVP] = useState({});
  const [invitation, setInvitation] = useState();
  const [invitationId, setInvitationId] = useState('');

  useEffect(()=>{
    invid && setInvitationId(invid)
  },[invid])

  useEffect(()=>{
    const getInvitation = async () => {
      const invite = {} 
      setInterval(()=>{
        setInvitation(invite)
      },5000)
    }
    getInvitation()
  },[invitationId])

  const stepHandler = {
    increase: () => {
      setStep(step + 1);
    },
    decrease: () => {
      setStep(step - 1);
    },
    gatherData: (data) => {
      console.log(data);
      const newGuests = guests.splice();
      for (let i = 0; i < data.length; i++) {
        newGuests[i] = {
          ...data[i],
        };
      }
      console.log(newGuests);
      setGuests(newGuests);
    },
    submit: () => {
      console.log(rsvp);
    },
  };

  return (
    <>
      <Head>
        <title>Wedding App</title>
        <meta name='description' content='Wedding app' />
      </Head>
      <div className='relative max-w-400 h-full flex flex-col justify-center items-center mx-auto'>
        {!invid && (
          <div className='absolute top-10 right-6'>
            <a href='./'>Menu</a>
          </div>
        )}
        <h1 className='absolute top-10 left-6 text-48px'>RSVP</h1>
        <div className='absolute top-32 left-0 bottom-0 w-full flex flex-col px-6'>
          {invitation ? (
            <>
              {step === 1 && <Step1 guests={guests} step={stepHandler} />}
              {step === 2 && <Step2 guests={guests} step={stepHandler} />}
              {step === 3 && <Step3 guests={guests} step={stepHandler} />}
            </>
          ) : (
            <Step0 setInvitationId={setInvitationId} />
          )}
        </div>
      </div>
    </>
  );
}

export default RSVPindex;
