import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveEvent } from '../../store/actions';
import { Event, Store } from '../../types';
import apiCalls from '../../utils/apis';
import Styles from '../../utils/styles';

function EventList({ title }) {
  const accessToken = useSelector((state: Store) => state.accessToken);
  const user = useSelector((state: Store) => state.user);
  const events = useSelector((state: Store) =>
    state.events.map((eventItem) => {
      if ((title = 'My Events')) {
        if ((eventItem.organisers as string[]).includes(user._id))
          return eventItem;
      } else {
        return eventItem;
      }
    })
  );

  const dispatch = useDispatch();
  const router = useRouter();

  const handleEventSelect = async (eventId: string) => {
    const res = await apiCalls.getEvent(accessToken, eventId);
    if (res.error) {
      console.log(res.error);
      // TODO: Change this to actual message on screen
    } else {
      dispatch(setActiveEvent(res.event));
      router.push(`../event/${res.event._id}`);
    }
  };

  return (
    <>
      <h1 className={Styles.title}>{title}</h1>
      <div className={Styles.bodyContainer}>
        {events.length > 0 ? (
          events.map((eventItem: Event) => (
            <button
              key={eventItem._id}
              onClick={() => handleEventSelect(eventItem._id)}
              className={Styles.buttonLong}
            >
              {eventItem.name}
            </button>
          ))
        ) : (
          <div>No events to display</div>
        )}
      </div>
    </>
  );
}

export default EventList;
