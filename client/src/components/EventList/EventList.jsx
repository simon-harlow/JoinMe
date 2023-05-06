import React from 'react'

import ActivityIcon from '../Utils/ActivityIcons';
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
            <h6 className="events-list__field-name">Activity type:</h6>
            <p className="events-list__field-value">{event.activity_type}</p>
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
            <h6 className="events-list__field-name">Skill Level:</h6>
            <p className="events-list__field-value">{event.skill_level}</p>
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