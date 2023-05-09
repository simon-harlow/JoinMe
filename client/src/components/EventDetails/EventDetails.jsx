import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

import { API_URL } from '../Utils/Const';
import Button from '../Button/Button';
import './EventDetails.scss'

function EventDetails({ userData }) {

  const { eventId } = useParams();
  const [event, setEvent] = useState([]);
  const [loggedInUserEvent, setLoggedInUserEvent] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/events/${eventId}`)
      .then(response => {
        console.log(response.data);
        setEvent(response.data);
        if (response.data.created_by === userData.id) {
          setLoggedInUserEvent(true);
          console.log(loggedInUserEvent);
        } else {
          setLoggedInUserEvent(false);
          console.log(loggedInUserEvent);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


  return (
    <main className="event-details">
      <div className="event-details__header-card">
        <div>
          <p><strong>Activity Type:</strong> {event.activity_type}</p>
          <p><strong>Created By:</strong> {event.created_by}</p>
          <p><strong>Created Time:</strong> {event.created_time}</p>
          <p><strong>Description:</strong> {event.description}</p>
          <p><strong>End Location:</strong> {event.end_location}</p>
          <p><strong>Event Distance:</strong> {event.event_distance}</p>
          <p><strong>Event Duration:</strong> {event.event_duration}</p>
          <p><strong>Event Time:</strong> {event.event_time}</p>
          <p><strong>First Name:</strong> {event.first_name}</p>
          <p><strong>GPX URL:</strong> {event.gpx_url}</p>
          <p><strong>ID:</strong> {event.id}</p>
          <p><strong>Last Name:</strong> {event.last_name}</p>
          <p><strong>Repeats:</strong> {event.repeats}</p>
          <p><strong>Skill Level:</strong> {event.skill_level}</p>
          <p><strong>Start Location:</strong> {event.start_location}</p>
          <p><strong>Title:</strong> {event.title}</p>
          <p><strong>Users Joined:</strong> {event.users_joined}</p>
        </div>
      </div>
    </main>
  )
}

export default EventDetails