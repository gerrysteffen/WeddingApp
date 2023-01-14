import React, { useState } from 'react';
import apiCalls from '../../utils/apis';

function UserProfile({ util }) {
  const [user, setUser] = useState(util.currentUser);
  const [editMode, setEditMode] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMode, setPasswordMode] = useState(false);

  const displayedInfo = [
    'firstName',
    'lastName',
    'email',
    'addressLine1',
    'addressLine2',
    'city',
    'state',
    'postalCode',
    'country',
  ];

  const infoTitles = [
    'First Name',
    'Last Name',
    'Email',
    'Address Line 1',
    'Address Line 2',
    'City',
    'State',
    'Postal Code',
    'Country',
  ];

  return (
    <>
      <h1 className='absolute top-10 left-6 text-48px'>My Profile</h1>
      <div className='absolute top-32 bottom-24 left-0 w-full flex flex-col px-6'>
        {/* TOP PART: Information */}
        {/* Case 1: User information display mode, not in Password Mode*/}
        {!passwordMode ? (
          <>
            {Object.keys(user).map((key) => {
              if (user[key] && displayedInfo.includes(key)) {
                return (
                  <div className='h-14 flex flex-row justify-between items-center'>
                    <div>{infoTitles[displayedInfo.indexOf(key)]}</div>
                    {!editMode ? (
                      <div>{user[key]}</div>
                    ) : (
                      <input
                        type='text'
                        value={user[key]}
                        className='border border-black p-2'
                      ></input>
                    )}
                  </div>
                );
              }
            })}

            {/* Below code shows possibility to initiate password change - if updating of general information 
            is in progress, the password field disappears and a submit button is shown instead */}

            {!editMode ? (
              <div className='h-14 flex flex-row justify-between items-center'>
                <div>Password</div>
                <button
                  onClick={() => {
                    setPasswordMode(!passwordMode);
                  }}
                  className='w-40 border border-black p-2 bg-slate-200 rounded'
                >
                  Change Password
                </button>
              </div>
            ) : (
              <div className='h-14 flex flex-row items-center'>
                <button
                  onClick={() => {
                    setEditMode(!editMode);
                  }}
                  className='w-full border border-black p-2 bg-slate-200 rounded'
                >
                  Submit
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <div className='h-14 flex flex-row justify-between items-center'>
              <div>Old Password</div>
              <input
                type='text'
                value={oldPassword}
                onChange={(event) => {
                  setOldPassword(event.target.value);
                }}
                className='border border-black p-2'
              ></input>
            </div>
            <div className='h-14 flex flex-row justify-between items-center'>
              <div>New Password</div>
              <input
                type='text'
                value={newPassword}
                onChange={(event) => {
                  setNewPassword(event.target.value);
                }}
                className='border border-black p-2'
              ></input>
            </div>
            <div className='h-14 flex flex-row items-center'>
              <button
                onClick={() => {
                  setPasswordMode(!passwordMode);
                }}
                className='w-full border border-black p-2 bg-slate-200 rounded'
              >
                Change Password
              </button>
            </div>
          </>
        )}
      </div>

      {/* Below code for Dashboard navigation button and button to initiate/cancel updating of general information */}

      <div className='absolute left-6 right-6 bottom-10 flex flex-row justify-between'>
        <button
          className='w-24 mt-4 border border-black p-2 bg-slate-200 rounded'
          onClick={() => {
            util.setMode('userDashboard');
          }}
        >
          Dashboard
        </button>
        {editMode || passwordMode ? (
          <button
            onClick={() => {
              if (editMode) setEditMode(!editMode);
              if (passwordMode) setPasswordMode(!passwordMode);
            }}
            className='w-24 mt-4 border border-black p-2 bg-slate-200 rounded'
          >
            Cancel
          </button>
        ) : (
          <button
            onClick={() => {
              setEditMode(!editMode);
            }}
            className='w-24 mt-4 border border-black p-2 bg-slate-200 rounded'
          >
            Edit
          </button>
        )}
      </div>
    </>
  );
}

export default UserProfile;
