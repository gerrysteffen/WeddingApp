import React, { useState } from 'react';
import Styles from '../../utils/styles';

function InviteUsers({ util }) {
  const inviteTemplate = {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    role: 'Role',
    maxAddGuests: 'How many plus ones allowed?',
  };

  let emptyInvite = {...inviteTemplate};
  Object.keys(inviteTemplate).forEach((key) => (emptyInvite[key] = ''));

  const [inviteMode, setInviteMode] = useState('main');
  const [currentInvite, setCurrentInvite] = useState(emptyInvite);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [invites, setInvites] = useState([]);

  const handleChange = (event) => {
    const newCurrentInvite = { ...currentInvite };
    newCurrentInvite[event.target.name] = event.target.value;
    setCurrentInvite(newCurrentInvite);
  };

  const handleAdd = () => {
    const newInvites = invites.slice();
    newInvites[currentIndex] = currentInvite;
    setInvites(newInvites);
    setCurrentInvite(emptyInvite);
    document.getElementById('inviteForm').reset();
    setCurrentIndex(newInvites.length);
  };

  const handleEdit = (key) => {
    setCurrentIndex(key);
    setCurrentInvite(invites[key]);
  };

  const handleDelete = (key) => {
    console.log('delete');
  };

  const handleSubmit = (key) => {
    console.log('submit');
  };

  return (
    <>
      <h1 className={Styles.title}>Invite Users</h1>
      <div className={Styles.bodyContainer}>
        {inviteMode === 'main' && (
          <>
            <button
              onClick={() => {
                setInviteMode('manual');
              }}
              className={Styles.buttonLong}
            >
              Manual Invites
            </button>
            <button
              onClick={() => {
                setInviteMode('csv');
              }}
              className={Styles.buttonLong}
            >
              CSV Invites
            </button>
          </>
        )}
        {inviteMode === 'manual' && (
          <div className='h-full overflow-y-auto mb-24'>
            <form id='inviteForm' className='flex flex-col'>
              {Object.keys(inviteTemplate).map((key) => (
                <div key={key} className='flex flex-col'>
                  <label className='mt-2 pl-2'>{inviteTemplate[key]}</label>
                  <input
                    name={key}
                    value={currentInvite[key]}
                    onChange={(event) => {
                      handleChange(event);
                    }}
                    type='text'
                    placeholder={inviteTemplate[key]}
                    className='border border-black p-2'
                  ></input>
                </div>
              ))}
            </form>
            <div>
              {invites.length > 0 &&
                invites.map((invite, index) => (
                  <div key={index} className='flex flex-row justify-between'>
                    <div>{invite.firstName + ' ' + invite.lastName}</div>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(index)}>Delete</button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      <div className={Styles.buttonContainer}>
        {inviteMode === 'main' ? (
          <button
            className={Styles.buttonShort}
            onClick={() => {
              util.setMode('userDashboard');
            }}
          >
            Dashboard
          </button>
        ) : (
          <button
            className={Styles.buttonShort}
            onClick={() => {
              setInviteMode('main');
            }}
          >
            Back
          </button>
        )}
        {inviteMode === 'manual' && (
          <>
            <button
              onClick={() => {
                handleAdd();
              }}
              className={Styles.buttonShort}
            >
              Add
            </button>
            <button
              className={Styles.buttonShort}
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default InviteUsers;
