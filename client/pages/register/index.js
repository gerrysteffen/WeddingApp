import React, { useState } from 'react';
import Head from 'next/head'
import Step1 from '../../components/register/Step1';
import Step2 from '../../components/register/Step2';
import Step3 from '../../components/register/Step3';
import apiCalls from '../../utils/apiCallService';

function RegIndex({userid}) {
  const [step, setStep] = useState(1)
  const [registration, setRegistration] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    }
  })

  const stepHandler = {
    increase: () => {
      setStep(step+1)
    },
    decrease: () => {
      setStep(step-1)
    },
    gatherData: (data) => {
      const newRegistration = {
        ...registration,
        ...data,
      }
      setRegistration(newRegistration)
    },
    submit: async () => {
      const res = await apiCalls.postUser(registration)
      console.log(res)
      // window.location.href = "./login";
    }
  }

  return (
    <>
      <Head>
        <title>Wedding App</title>
        <meta name="description" content="Wedding app" />
      </Head>
      <div className='relative max-w-400 h-full flex flex-col justify-center items-center mx-auto'>
        {!userid && (<div className='absolute top-10 right-6'>
          <a href="./">Menu</a>
        </div>)}
        <h1 className='absolute top-10 left-6 text-48px'>Register</h1>
        <div className='absolute top-32 left-0 bottom-0 w-full flex flex-col px-6'>
          {(step === 1) && <Step1 registration={registration} step={stepHandler} />}
          {(step === 2) && <Step2 registration={registration} step={stepHandler} />}
          {(step === 3) && <Step3 registration={registration} step={stepHandler} />}
        </div>
      </div>
    </>
  );
}

export default RegIndex;