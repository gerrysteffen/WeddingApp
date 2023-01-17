import React, { useState } from 'react';
import apiCalls from '../../utils/apis';
import Styles from '../../utils/styles';

function InviteUsers({ util }) {
  const inviteTemplate = {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email',
    maxAddGuests: 'How many plus ones allowed?',
  };

  let emptyInvite = { ...inviteTemplate };
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

  const handleEdit = (index) => {
    setCurrentIndex(index);
    setCurrentInvite(invites[index]);
  };

  const handleDelete = (index) => {
    const newInvites = invites.slice();
    newInvites.splice(index, 1);
    setInvites(newInvites);
  };

  const handleSubmit = async () => {
    const res = await apiCalls.postInvites(
      util.accessToken,
      invites,
      util.activeEventId
    );
    util.setMode('manageEvent')
    // console.log(res);
  };

  return (
    <>
      <h1 className={Styles.title}>Invite Users</h1>
      <div className={Styles.bodyContainerLong}>
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
            <button
              onClick={() => {
                handleAdd();
              }}
              className={Styles.buttonLong}
            >
              Add
            </button>
            <div className='mt-8 mx-2'>
              <div className='font-bold'>Invites staged for submission</div>
              {invites.length > 0 ? (
                invites.map((invite, index) => (
                  <div key={index} className='flex flex-row justify-between'>
                    <div>{invite.firstName + ' ' + invite.lastName}</div>
                    <div>
                      <button
                        className='mr-2'
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                      <button onClick={() => handleDelete(index)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div>No staged invites</div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className={Styles.buttonContainer}>
        {inviteMode === 'manual' && (
          <>
            <button
              className={Styles.buttonLong}
              disabled={!invites.length > 0}
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
