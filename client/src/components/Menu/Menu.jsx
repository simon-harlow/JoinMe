import React from "react";
import { NavLink } from "react-router-dom";

import "./Menu.scss";
import JoinMeWhite from "../../assets/icons/web/joinme_logo_white.svg";
import Run from "../../assets/icons/activity/run.svg";
import Calendar from "../../assets/icons/web/calendar.svg";
import Profile from "../../assets/icons/web/profile.svg";
import Logout from "../../assets/icons/web/logout.svg";

const Menu = ({ userData }) => {

	return (
		<nav className="menu">
			<header className="menu__header">
				<img
					className="menu__header-run"
					src={Run}
					alt="joinme logo running man"
				/>
				<img
					className="menu__header-logo"
					src={JoinMeWhite}
					alt="joinme logo text"
				/>
			</header>
			<div className="menu__links">
				<NavLink to="/events" className="menu__link">
					<img className="menu__icon" src={Calendar} alt="icon" />
					<span className="menu__text">Events</span>
				</NavLink>
				{userData && (
					<NavLink
						to={`/users/${userData?.id}`}
						className="menu__link"
					>
						<img className="menu__icon" src={Profile} alt="icon" />
						<span className="menu__text">My Profile</span>
					</NavLink>
				)}
				<NavLink to="/login" className="menu__link">
					<img className="menu__icon" src={Logout} alt="icon" />
					<span className="menu__text">Logout</span>
				</NavLink>
			</div>
		</nav>
	);
};

export default Menu;
