import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Step0 from '../../components/rsvp/Step0.js';
import Step1 from '../../components/rsvp/Step1.js';
import Step2 from '../../components/rsvp/Step2.js';
import Step3 from '../../components/rsvp/Step3.js';
import apiCalls from '../../utils/apis/index.js';
import { BiMenu } from 'react-icons/bi';
import { useRouter } from 'next/router.js';

function RSVPindex({ invid }) {
  const [step, setStep] = useState(1);
  const [invite, setInvite] = useState(null);
  const [rsvp, setRSVP] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const getInvite = async () => {
      const res = await apiCalls.getInvite(invid);
      if (res.error) {
        console.log(res.message);
      } else {
        setInvite(res);
        if (res.rsvps.length > 0) setRSVP(res.rsvps);
      }
    };
    invid && getInvite();
  }, [invid]);

  const stepHandler = {
    increase: () => {
      setStep(step + 1);
    },
    decrease: () => {
      setStep(step - 1);
    },
    gatherData: (inviteData, rsvpData) => {
      if (inviteData) {
        const newInvite = { ...invite };
        newInvite.guests = inviteData.guests;
        newInvite.attendanceStatus = inviteData.attendanceStatus;
        setInvite(newInvite);
      }
      if (rsvpData) {
        setRSVP(rsvpData);
      }
    },
    submit: async () => {
      const res = await apiCalls.updateInviteWithRsvp(invite, rsvp);
      if (res) {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          router.push('/user');
        } else {
          router.push('/');
        }
      }
    },
  };

  return (
    <>
      <div className='relative max-w-400 h-full flex flex-col justify-center items-center mx-auto'>
        <div className='absolute top-4 right-4 z-10'>
          <Link href='/'>
            <BiMenu color='gray' size='36px' />
          </Link>
        </div>
        <h1 className='absolute top-10 left-6 text-48px'>RSVP</h1>
        <div className='absolute top-32 left-0 bottom-0 w-full flex flex-col px-6'>
          {invite && invite.guests ? (
            <>
              {step === 1 && <Step1 invite={invite} step={stepHandler} />}
              {step === 2 && (
                <Step2 invite={invite} rsvp={rsvp} step={stepHandler} />
              )}
              {step === 3 && (
                <Step3 invite={invite} rsvp={rsvp} step={stepHandler} />
              )}
            </>
          ) : (
            <Step0 invid={invid} setInvite={setInvite} />
          )}
        </div>
      </div>
    </>
  );
}

export default RSVPindex;
