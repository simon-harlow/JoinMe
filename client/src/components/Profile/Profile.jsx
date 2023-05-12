import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { API_URL } from "../Utils/const";
import EventList from "../EventList/EventList";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Location from "../../assets/icons/web/location_target.svg";
import Strava from "../../assets/icons/web/strava_orange_icon.svg";
import "./Profile.scss";

const Profile = ({ userData }) => {

	const { id } = useParams();
	const [userProfileData, setUserProfileData] = useState("");
	const [userCreatedEvents, setUserCreatedEvents] = useState([]);
	const [userJoinedEvents, setUserJoinedEvents] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	const handleClickEvent = (eventId) => {
		navigate(`/events/${eventId}`);
	};

	// if profile clicked on is not the logged in user passed down as userData in props, then get this users data
	useEffect(() => {
		setIsLoading(true);
		if (id !== userData.id) {
			axios
				.get(`${API_URL}/users/${id}`)
				.then((response) => {
					setUserProfileData(response.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}
		else {
			setUserProfileData(userData)
		}
	}, [id, userData.id]);

	// to get events created by the the user
	useEffect(() => {
		if (userProfileData.id) {
			axios
				.get(`${API_URL}/events/users/${userProfileData.id}`)
				.then((response) => {
					setUserCreatedEvents(response.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [userProfileData.id]);

	// to get events joined by the user
	useEffect(() => {
		if (userProfileData.id) {
			axios
				.get(`${API_URL}/events/users/${userProfileData.id}/joined`)
				.then((response) => {
					setUserJoinedEvents(response.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [userProfileData.id]);

	return (
		<main className="profile">
			{isLoading && <LoadingSpinner />}
			<header className="profile__card">
				<div className="profile__pic">
					<img
						src={userProfileData.avatar_url}
						alt="avatar"
						className="profile__pic-img"
					/>
				</div>
				<div className="profile__details">
					<div className="profile__name">
						<h2 className="profile__name-text">
							{userProfileData.first_name} {userProfileData.last_name}
						</h2>
					</div>
					<div className="profile__location">
						<img
							src={Location}
							alt="location"
							className="profile__location-icon"
						/>
						<p className="profile__location-text">
							{userProfileData.city}, {userProfileData.state},{" "}
							{userProfileData.country}
						</p>
					</div>
					<div className="profile__strava">
						<img
							src={Strava}
							alt="link"
							className="profile__strava-icon"
						/>
						<a
							href={userProfileData.strava_url}
							target="_blank"
							rel="noopener noreferrer"
							className="profile__strava-link"
						>
							{userProfileData.first_name}'s Strava
						</a>
					</div>
					<div className="profile__bio">
						<p className="profile__bio-text">{userProfileData.bio}</p>
					</div>
				</div>
			</header>
			<article className="user-events__card">
				<div className="user-events__title">
					<h2 className="user-events__title-text">
						{userProfileData.first_name} is Organizing!
					</h2>
				</div>
				{userCreatedEvents.length === 0 ? (
					<div className="profile__placeholder">
						<p>No events organized</p>
					</div>
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
			</article>
			<article className="user-events__card">
				<div className="user-events__title">
					<h2 className="user-events__title-text">
						{userProfileData.first_name} has Joined!
					</h2>
				</div>
				{userJoinedEvents.length === 0 ? (
					<div className="profile__placeholder">
						<p>No events joined</p>
					</div>
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
			</article>
		</main>
	);
};

export default Profile;
