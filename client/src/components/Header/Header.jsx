import React from 'react'
import { NavLink } from 'react-router-dom'

import './Header.scss'
import JoinMeText from '../../../src/assets/icons/web/joinme_logo.svg'
import UserAvatar from '../../../src/assets/images/simon-harlow-strava.png'
import Logout from '../../../src/assets/icons/web/logout.svg'



export default function Header() {
    return (
        <header className="header-container">
            <div className="header">
                <div className="header__left">
                    <NavLink to="/">
                        <img className="header__logo" src={JoinMeText} alt="JoinMe logo"/>
                    </NavLink>
                </div>
                <div className="header__right">
                    <NavLink to="/users/4780c8ef-6659-4f56-a6ea-cd0486a39f59">
                        <img className="header__avatar" src={UserAvatar} alt="user avatar"/>
                    </NavLink>
                    <NavLink to="/login">
                      <button className="header__logout-button">
                          <img className="header__logout-icon" src={Logout} alt="logout"/>
                      </button>
                    </NavLink>
                </div>
            </div>
        </header>
    )
}