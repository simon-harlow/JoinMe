import { useState, useEffect } from 'react';
import axios from 'axios';

import { API_URL } from '../Utils/Const';
import EventList from '../EventList/EventList';
import './AllEvents.scss';

const AllEvents = () => {
  const [events, setEvents] = useState([]);


  useEffect(() => {
    axios
      .get(`${API_URL}/events`)
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <main className="all-events">
      <div className="all-events__banner-card">
        <div className="all-events__banner-header">
          <h1 className="all-events__banner-header-title">Events</h1>
        </div>
        <form className="all-events__banner-search">
          <input className="all-events__banner-search-input" type="text" placeholder="Search Events..." />
        </form>
        <div className="all-events__banner-create">
          <button className="all-events__banner-create-button" >Create Event</button>
        </div>
      </div>
      <div className="all-events__event-card">
        <div className="all-events__list">
            {events.map(event => (
              <EventList key={event.id} event={event} />
            ))}
        </div>
      </div>
    </main>
  );
};

export default AllEvents;