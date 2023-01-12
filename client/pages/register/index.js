import React, { useState } from 'react';
import Head from 'next/head'
import Step1 from '../../components/register/Step1';
import Step2 from '../../components/register/Step2';
import Step3 from '../../components/register/Step3';

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
    submit: () => {
      console.log(registration)
    }
  }

  return (
    <>
      <Head>
        <title>Wedding App</title>
        <meta name="description" content="Wedding app" />
      </Head>
      <div className='absolute top-10 left-10'>
        <a href="./">Menu</a>
      </div>
      <div className='max-w-400 h-full flex flex-col justify-center m-auto'>
        <h1 className='text-48px'>Register</h1>
        {(step === 1) && <Step1 registration={registration} step={stepHandler} />}
        {(step === 2) && <Step2 registration={registration} step={stepHandler} />}
        {(step === 3) && <Step3 registration={registration} step={stepHandler} />}
      </div>
    </>
  );
}

export default RegIndex;