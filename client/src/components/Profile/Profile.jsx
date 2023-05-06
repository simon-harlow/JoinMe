import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { API_URL } from '../Utils/Const';
import EventList from '../EventList/EventList';
import ActivityIcon from '../Utils/ActivityIcons';
import Location from "../../assets/icons/web/location_target.svg";
import Strava from "../../assets/icons/web/strava_orange_icon.svg";
import './Profile.scss';

const Profile = ({userData}) => {

  const [userCreatedEvents, setUserCreatedEvents] = useState([]);
  const [userJoinedEvents, setUserJoinedEvents] = useState([]);

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

  // to get events joined by the user
  useEffect(() => {
    axios
      .get(`${API_URL}/events/users/${userData.id}/joined`)
      .then((response) => {
        console.log(response.data);
        setUserJoinedEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userData.id]);
  
  return (
		<main className="profile">
			<div className="profile__card">
				<div className="profile__pic">
					<img
						src={userData.avatar_url}
						alt="avatar"
						className="profile__pic-img"
					/>
				</div>
				<div className="profile__details">
					<div className="profile__name">
						<h2 className="profile__name-text">
							{userData.first_name} {userData.last_name}
						</h2>
					</div>
					<div className="profile__location">
						<img
							src={Location}
							alt="location"
							className="profile__location-icon"
						/>
						<p className="profile__location-text">
							{userData.city}, {userData.state},{" "}
							{userData.country}
						</p>
					</div>
					<div className="profile__strava">
						<img
							src={Strava}
							alt="link"
							className="profile__strava-icon"
						/>
						<a
							href={userData.strava_url}
							target="_blank"
							rel="noopener noreferrer"
							className="profile__strava-link"
						>
							{userData.first_name}'s Strava
						</a>
					</div>
				</div>
			</div>
			<div className="user-events__card">
				<div className="user-events__title">
					<h2 className="user-events__title-text">
						{userData.first_name} is Organizing!
					</h2>
				</div>
				{userCreatedEvents.length === 0 ? (
					<p>No events created</p>
				) : (
					<div className="user-events__list">
						{userCreatedEvents.map((event) => (
							<EventList
								key={event.id}
								event={event}
								handleClickEvent={handleClickEvent}
							/>
						))}
					</div>
				)}
			</div>
			<div className="user-events__card">
				<div className="user-events__title">
					<h2 className="user-events__title-text">
						{userData.first_name} has Joined!
					</h2>
				</div>
				{userJoinedEvents.length === 0 ? (
					<p>No events joined</p>
				) : (
					<div className="user-events__list">
						{userJoinedEvents.map((event) => (
							<EventList
								key={event.id}
								event={event}
								handleClickEvent={handleClickEvent}
							/>
						))}
					</div>
				)}
			</div>
		</main>
  );
};

export default Profile;