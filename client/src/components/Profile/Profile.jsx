import React from 'react';

import Location from "../../assets/icons/web/location_target.svg";
import ExitTo from "../../assets/icons/web/exit_to.svg";
import './Profile.scss';

const Profile = ({userData}) => {

  
  
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
            <img src={ExitTo} alt="link" className="profile__strava-icon" />
            <a href={userData.strava_url} target="_blank" rel="noopener noreferrer" className="profile__strava-link">Strava Profile</a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;