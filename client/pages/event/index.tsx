import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { BiMenu, BiX } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import PublicEventDetails from '../../components/eventPublic/PublicEventDetails';
import PublicEventPage from '../../components/eventPublic/PublicEventPage';
import EventDashboard from '../../components/event/EventDashboard';
import EventDetails from '../../components/event/EventDetails';
import EventParticipants from '../../components/event/EventParticipants';
import InviteUsers from '../../components/event/InviteUsers';
import ManageEvent from '../../components/event/ManageEvent';
import ManageParticipants from '../../components/event/ManageParticipants';
import ManageEventDetails from '../../components/event/ManageEventDetails';
import CreateEventComms from '../../components/event/CreateEventComms';
import ManageInvites from '../../components/event/ManageInvites';
import ManageEventComms from '../../components/event/ManageEventComms';
import NavBar from '../../components/ui-components/NavBar';
import Step0 from '../../components/event/Step0';
import apiCalls from '../../utils/apis';
import { Store } from '../../types';
import { setActiveEvent, setNavBarMode } from '../../store/actions';

function EventIndex({ eventid }) {
  const accessToken = useSelector((state: Store) => state.accessToken);
  const user = useSelector((state: Store) => state.user);
  const activeEvent = useSelector((state: Store) => state.activeEvent);
  const eventMode = useSelector((state: Store) => state.eventMode);
  const navBarMode = useSelector((state: Store) => state.navBarMode);
  let loading = true;
  const [event, setEvent] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const getPublicEventInfo = async () => {
      if (eventid !== activeEvent._id) {
        const res = await apiCalls.getEvent(eventid, accessToken);
        if (res.error) {
          //TODO: propper message handling
          console.log(res.message);
        } else {
          dispatch(setActiveEvent(res));
        }
      } else {
        loading = false;
      }
    };
    if (eventid) getPublicEventInfo();
  }, []);

  return (
    <div>
      <div className='absolute top-4 right-4 z-10'>
        <button onClick={() => dispatch(setNavBarMode(true))}>
          <BiMenu color='gray' size='36px' />
        </button>
      </div>
      {!activeEvent ? (
        <Step0 eventid={eventid} setEvent={setEvent} />
      ) : (
        <>
          {eventMode === 'eventDashboard' && <EventDashboard />}
          {eventMode === 'eventDetails' && <EventDetails />}
          {eventMode === 'eventParticipants' && <EventParticipants />}
          {eventMode === 'manageEvent' && <ManageEvent />}
          {/* below as children of manage event? */}
          {eventMode === 'manageEventDetails' && <ManageEventDetails />}
          {eventMode === 'manageParticipants' && <ManageParticipants />}
          {eventMode === 'createEventInvites' && <InviteUsers />}
          {eventMode === 'manageEventInvites' && <ManageInvites />}
          {eventMode === 'createEventComms' && <CreateEventComms />}
          {eventMode === 'manageEventComms' && <ManageEventComms />}
        </>
      )}
      {navBarMode && (
        <>
          <div className='absolute top-0 bottom-0 left-0 right-16 z-30 bg-white border-gray border-r-2'>
            <NavBar />
          </div>
          <div className='absolute top-2 right-2 z-30'>
            <button onClick={() => dispatch(setNavBarMode(false))}>
              <BiX color='gray' size='48px' />
            </button>
          </div>
          <div className='absolute top-0 bottom-0 left-0 right-0 z-20 bg-white/70 backdrop-blur-sm'></div>
        </>
      )}
    </div>
  );
}

export default EventIndex;
