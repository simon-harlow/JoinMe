import React from 'react'

import ActivityIcon from '../Utils/activityIcons';
import './EventList.scss'

const EventList = ({ event, handleClickEvent }) => {
  return (
    <div key={event.id} onClick={() => handleClickEvent(event.id)} className="events-list">
      <div className="events-list__icon">
        <ActivityIcon activityType={event.activity_type} />
      </div>
      <div className="events-list__details">
        <div className="events-list__header">
          <h3 className="events-list__header-title">{event.title}</h3>
          <p className="events-list__header-description">{event.description}</p>
        </div>
        <div className="events-list__info">
          <div className="events-list__field">
            <h6 className="events-list__field-name">Date & Time:</h6>
            <p className="events-list__field-value">{new Date(event.event_time).toLocaleString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false })}</p>
          </div>
          <div className="events-list__field">
            <h6 className="events-list__field-name">Distance:</h6>
            <p className="events-list__field-value">{event.event_distance} km</p>
          </div>
          <div className="events-list__field">
            <h6 className="events-list__field-name">Duration:</h6>
            <p className="events-list__field-value">{event.event_duration}</p>
          </div>
          <div className="events-list__field">
            <h6 className="events-list__field-name">Intensity Level:</h6>
            <p className="events-list__field-value">{event.intensity_level}</p>
          </div>
          <div className="events-list__field">
            <h6 className="events-list__field-name">Start Location:</h6>
            <p className="events-list__field-value">{event.start_location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventList;