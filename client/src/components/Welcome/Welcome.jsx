import React from 'react';
import { useNavigate } from 'react-router-dom';

import Calendar from "../../assets/icons/web/calendar.svg";
import Profile from "../../assets/icons/web/profile.svg";
import Bike from "../../assets/icons/activity/bike.svg";
import './Welcome.scss';

function Welcome({ userData }) {

  console.log(userData);

  const navigate = useNavigate();

  const handleClickEvents = () => {
		navigate(`/events/`);
	};

  const handleClickProfile = () => {
		navigate(`/users/${userData.id}`);
	};

  const handleClickCreateEvent = () => {
		navigate(`/events/new`);
	};

  if (!userData) {
    return null;
  }

  return (
    <main className="welcome">
      <header className="welcome-header-card">
        <h1 className="welcome-header-card__title">Welcome to <span className="welcome-header-card__title--span">JoinMe</span> {userData.first_name}!</h1>
        <h4 className="welcome-header-card__subtitle">A community for Strava athletes to socialize and enjoy activities together </h4>
        <p className="welcome-header-card__text">Please choose one of the following options to get started:</p>
      </header>
      <section className="card-container">
        <article className="card" onClick={handleClickEvents}>
        <figure>
            <img className="card__icon" src={Calendar} alt="Calendar icon"/>
          </figure>
          <div>
            <h2 className="card__title">View Events</h2>
            <p className="card__text">Search events to join</p>
          </div>
        </article>
        <article className="card" onClick={handleClickProfile}>
          <figure>
            <img className="card__icon" src={Profile} alt="Profile icon"/>
          </figure>
          <div>
            <h2 className="card__title">My Profile</h2>
            <p className="card__text">View your profile</p>
          </div>
        </article>
        <article className="card" onClick={handleClickCreateEvent}>
        <figure>
            <img className="card__icon" src={Bike} alt="Bike icon"/>
          </figure>
          <div>
            <h2 className="card__title">Create Event</h2>
            <p className="card__text">Create a new event</p>
          </div>
        </article>
      </section>
    </main>
  );
}

export default Welcome;