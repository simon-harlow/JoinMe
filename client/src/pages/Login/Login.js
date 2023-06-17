import React from "react";
import { useNavigate } from "react-router-dom"

import StravaLogo from "../../assets/icons/web/strava_logo_icon.svg"
import Button from "../../components/Button/Button";

import "./Login.scss";


const Login = ({ userData }) => {


    const navigate = useNavigate();

    const handleLogin = () => navigate(`/welcome`)


	return (
		<div className="login-modal-container">
			<div className="login-modal">
				<div className="login-modal__header">
					<h3 className="login-modal__title">Log In</h3>
				</div>
				<div className="login-modal__body">
                    <p>Powered By:</p>
                    <img src={StravaLogo} alt="Strava logo" />
                    <p>Click below to login with your Strava account</p>
                </div>
                <div className="login-modal__buttons">
                    <Button text="Login" onClick={handleLogin} />
                </div>
			</div>
		</div>
	);
};

export default Login;
