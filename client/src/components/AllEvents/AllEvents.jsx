import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { API_URL } from '../Utils/Const';
import Button from '../Button/Button';
import EventList from '../EventList/EventList';
import './AllEvents.scss';

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

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

  const handleClickCreateEvent = () => navigate(`/events/new`)

  return (
    <main className="all-events">
      <div className="all-events__banner-card">
        <div className="all-events__banner-header">
          <h1 className="all-events__banner-header-title">Events</h1>
        </div>
        <form className="all-events__banner-search">
          <input className="all-events__banner-search-input" type="text" placeholder="Search Events..." />
          {/* TODO: create search input form and back-end handler */}
        </form>
        <div className="all-events__banner-create">
        <Button onClick={handleClickCreateEvent} text="Create Event" />
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