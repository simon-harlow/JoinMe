import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom"

import JoinMeWhite from "../../assets/icons/web/joinme_logo_white.svg";
import Button from "../../components/Button/Button";

import "./Login.scss";


const Login = ({ userData }) => {


    const navigate = useNavigate();

    const handleLogin = () => navigate(`/users/${userData.id}`)


	return (
		<div className="modal-container">
			<div className="modal">
				<div className="modal__header">
					<h3 className="modal__title">Log In</h3>
				</div>
				<div className="modal__body">
                    <p>Click below to login with your Strava account</p>
                </div>
                <div className="modal__buttons">
                    <Button text="Login" onClick={handleLogin} />
                </div>
			</div>
		</div>
	);
};

export default Login;
