import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import apiCalls from '../../utils/apis';
import Styles from '../../utils/styles';
import { Store } from '../../types';
import { setUser } from '../../store/actions';

function UserProfile() {
  const user = useSelector((state: Store) => state.user);
  const accessToken = useSelector((state: Store) => state.accessToken);

  const [userInfo, setUserInfo] = useState({...user});
  const [editMode, setEditMode] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMode, setPasswordMode] = useState(false);

  const dispatch = useDispatch();

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
    const res = await apiCalls.updateUser(accessToken, userInfo);
    if (res.error) {
      console.log(res.message);
    } else {
      dispatch(setUser(res))
      setUserInfo(res);
      setEditMode(false);
    }
  };

  const handlePasswordSubmit = async () => {
    const res = await apiCalls.changePW(
      accessToken,
      user,
      oldPassword,
      newPassword
    );
    if (res.error) {
      console.log(res.message);
    } else {
      setOldPassword('');
      setNewPassword('');
      setPasswordMode(false);
    }
  };

  return (
    <>
      <h1 className={Styles.title}>My Profile</h1>
      <div className={Styles.bodyContainer}>
        {/* TOP PART:  */}
        {/* Case 1: User information, i.e. not in password mode*/}
        {!passwordMode ? (
          <>
            {infoKeys.map((key, index) => {
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
            })}
          </>
        ) : (
          <>
            {/* Case 2: password  information, i.e. in password mode*/}
            <div className='h-14 flex flex-row justify-between items-center'>
              <div>Old Password</div>
              <input
                type='password'
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
                type='password'
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
              className={Styles.buttonLong}
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
      <div className={Styles.buttonContainer}>
        {editMode || passwordMode ? (
          <button
            onClick={() => {
              setUserInfo(user);
              if (editMode) setEditMode(!editMode);
              if (passwordMode) setPasswordMode(!passwordMode);
            }}
            className={Styles.buttonLong}
          >
            Cancel
          </button>
        ) : (
          <button
            onClick={() => {
              setEditMode(!editMode);
            }}
            className={Styles.buttonLong}
          >
            Edit
          </button>
        )}
      </div>
    </>
  );
}

export default UserProfile;
