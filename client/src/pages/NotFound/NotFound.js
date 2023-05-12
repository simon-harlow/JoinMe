import React from 'react'
import { useNavigate } from 'react-router-dom'

import GIF from "../../assets/images/not_found.gif"
import Button from '../../components/Button/Button';
import "./NotFound.scss"


function NotFound() {

    const navigate = useNavigate();

    const handleHomeClick = () => navigate(`/events`)

    return (
            <section className="not-found">
                <div className="not-found__container">
                    <div className="not-found__image">
                        <img className="not-found__gif" src={GIF} alt="lost in mountains gif" />
                    </div>
                    <div className="not-found__content">
                        <p className="not-found__text">We cannot find what you are looking for</p>
                        <p className="not-found__text">Click the button below to go to the Events page</p>
                    </div>
                    <div>
                        <Button text="Events" onClick={handleHomeClick}/>
                    </div>
                </div>
            </section>
    );
}


export default NotFound;