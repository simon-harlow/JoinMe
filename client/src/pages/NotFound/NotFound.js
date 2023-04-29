import React from 'react'
import { NavLink } from 'react-router-dom'


function NotFound() {
    return (
            <section className="not-found">
                <div className="not-found__container">
                    <p className="not-found__text">We cannot find what you are looking for.<br></br>Click the button below to return to the Homepage.</p>
                    <NavLink to="/">
                        <button className="not-found__button">
                            Home
                        </button>
                    </NavLink>
                </div>
            </section>
    );
}


export default NotFound