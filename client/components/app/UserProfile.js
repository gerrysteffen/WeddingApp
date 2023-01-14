import React, { useState } from 'react';
import apiCalls from '../../utils/apis';

function UserProfile({ util }) {
  const [userInfo, setUserInfo] = useState(util.user);
  const [editMode, setEditMode] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMode, setPasswordMode] = useState(false);

  const infoKeys = [
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

  const handleUserChange = (event) => {
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleUserSubmit = async () => {
    const res = await apiCalls.updateUser(util.accessToken, userInfo);
    if (res.error) {
      console.log(res.message);
    } else {
      setUserInfo(res);
      util.user = res;
      setEditMode(false);
    }
  };

  const handlePasswordSubmit = async () => {
    const res = await apiCalls.changePW(util.accessToken, util.user, oldPassword, newPassword);
    if (res.error) {
      console.log(res.message);
    } else {
      setOldPassword('')
      setNewPassword('')
      setPasswordMode(false)
    }
  };

  return (
    <>
      <h1 className='absolute top-10 left-6 text-48px'>My Profile</h1>
      <div className='absolute top-32 bottom-24 left-0 w-full flex flex-col px-6'>
        {/* TOP PART:  */}
        {/* Case 1: User information, i.e. not in password mode*/}
        {!passwordMode ? (
          <>
            {infoKeys.map((key, index) => {
              if (userInfo[key]) {
                return (
                  <div
                    key={key}
                    className='h-14 flex flex-row justify-between items-center'
                  >
                    <div>{infoTitles[index]}</div>
                    {/* Two possibilities: no edit mode -> User information static; edit mode -> user information in input fields*/}
                    {!editMode ? (
                      <div>{userInfo[key]}</div>
                    ) : (
                      <input
                        type='text'
                        name={key}
                        value={userInfo[key]}
                        onChange={(event) => handleUserChange(event)}
                        className='border border-black p-2'
                      ></input>
                    )}
                  </div>
                );
              }
            })}
          </>
        ) : (
          <>
            {/* Case 2: password  information, i.e. in password mode*/}
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
          </>
        )}

        {/* Below code shows possibility to initiate password change - if updating of general information 
        or password is in progress, the password line disappears and a submit button is shown instead */}
        {editMode || passwordMode ? (
          <div className='h-14 flex flex-row items-center'>
            <button
              onClick={() => {
                if (editMode) handleUserSubmit();
                if (passwordMode) handlePasswordSubmit();
              }}
              className='w-full border border-black p-2 bg-slate-200 rounded'
            >
              Submit
            </button>
          </div>
        ) : (
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
        )}
      </div>

      {/* Below code for Dashboard navigation button and button to initiate/cancel updating of general information / exiting of pw mode*/}
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
              setUserInfo(util.user);
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
