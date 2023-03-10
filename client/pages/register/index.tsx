import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Step1 from '../../components/register/Step1';
import Step2 from '../../components/register/Step2';
import Step3 from '../../components/register/Step3';
import apiCalls from '../../utils/apis/index.js';
import { BiMenu } from 'react-icons/bi';

function RegIndex({ userid }) {
  const [step, setStep] = useState(1);
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
    },
  });

  const router = useRouter();

  const stepHandler = {
    increase: () => {
      setStep(step + 1);
    },
    decrease: () => {
      setStep(step - 1);
    },
    gatherData: (data) => {
      const newRegistration = {
        ...registration,
        ...data,
      };
      setRegistration(newRegistration);
    },
    submit: async () => {
      const res = await apiCalls.postUser(registration);
      if (res.error) {
        console.log(res.message);
      } else {
        const { accessToken } = res;
        localStorage.setItem('accessToken', accessToken);
        router.push('/user');
      }
    },
  };

  return (
    <>
      <div className='relative max-w-400 h-full flex flex-col justify-center items-center mx-auto'>
        {!userid && (
          <div className='absolute top-4 right-4 z-10'>
            <Link href='./'>
              <BiMenu color='gray' size='36px' />
            </Link>
          </div>
        )}
        <h1 className='absolute top-10 left-6 text-48px'>Register</h1>
        <div className='absolute top-32 left-0 bottom-0 w-full flex flex-col px-6'>
          {step === 1 && (
            <Step1 registration={registration} step={stepHandler} />
          )}
          {step === 2 && (
            <Step2 registration={registration} step={stepHandler} />
          )}
          {step === 3 && (
            <Step3 registration={registration} step={stepHandler} />
          )}
        </div>
      </div>
    </>
  );
}

export default RegIndex;
