import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { API_URL } from '../Utils/const';
import ActivityIcon from '../Utils/activityIcons';
import Location from "../../assets/icons/web/location_target.svg";
import Strava from "../../assets/icons/web/strava_orange_icon.svg";
import './Profile.scss';

const Profile = ({userData}) => {

  const [userCreatedEvents, setUserCreatedEvents] = useState([]);

  const navigate = useNavigate();

  const handleClickEvent = (eventId) => {
    navigate(`/events/${eventId}`);
  }

  // to get events created by the the user
  useEffect(() => {
    axios
      .get(`${API_URL}/events/users/${userData.id}`)
      .then((response) => {
        console.log(response.data);
        setUserCreatedEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userData.id]);
  
  return (
    <main className="profile">
      <div className="profile__card">
        <div className="profile__pic">
          <img src={userData.avatar_url} alt="avatar" className="profile__pic-img" />
        </div>
        <div className="profile__details">
          <div className="profile__name">
            <h2 className="profile__name-text">{userData.first_name} {userData.last_name}</h2>
          </div>
          <div className="profile__location">
            <img src={Location} alt="location" className="profile__location-icon" />
            <p className="profile__location-text">{userData.city}, {userData.state}, {userData.country}</p>
          </div>
          <div className="profile__strava">
            <img src={Strava} alt="link" className="profile__strava-icon" />
            <a href={userData.strava_url} target="_blank" rel="noopener noreferrer" className="profile__strava-link">{userData.first_name}'s Strava</a>
          </div>
        </div>
      </div>
      <div className="created-events__card">
        <div className="created-events__title">
          <h2 className="created-events__title-text">Events Organized By {userData.first_name}</h2>
        </div>
        {userCreatedEvents.length === 0 ? (
          <p>No events created</p>
        ) : (
          <div className="created-events__list">
            {userCreatedEvents.map((event) => (
              <div key={event.id} onClick={() => handleClickEvent(event.id)} className="created-events__event">
                <div className="created-events__icon">
                  <ActivityIcon activityType={event.activity_type} />
                </div>
                <div className="created-events__event-details">
                  <div className="created-events__event-header">
                    <h3 className="created-events__event-header-title">{event.title}</h3>
                    <p className="created-events__event-header-description">{event.description}</p>
                  </div>
                  <div className="created-events__event-info">
                    <div className="created-events__field">
                      <h6 className="created-events__field-name">Activity type:</h6>
                      <p className="created-events__field-value">{event.activity_type}</p>
                    </div>
                    <div className="created-events__field">
                      <h6 className="created-events__field-name">Distance:</h6>
                      <p className="created-events__field-value">{event.event_distance} km</p>
                    </div>
                    <div className="created-events__field">
                      <h6 className="created-events__field-name">Duration:</h6>
                      <p className="created-events__field-value">{event.event_duration}</p>
                    </div>
                    <div className="created-events__field">
                      <h6 className="created-events__field-name">Skill level:</h6>
                      <p className="created-events__field-value">{event.skill_level}</p>
                    </div>
                    <div className="created-events__field">
                      <h6 className="created-events__field-name">Start location:</h6>
                      <p className="created-events__field-value">{event.start_location}</p>
                    </div>
                    <div className="created-events__field">
                      <h6 className="created-events__field-name">End location:</h6>
                      <p className="created-events__field-value">{event.end_location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Profile;