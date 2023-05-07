import React, { useState } from "react";

import Button from "../Button/Button";
import "./EventForm.scss";

function EventForm() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [eventTime, setEventTime] = useState(new Date());
	const [activityType, setActivityType] = useState("");
	const [startLocation, setStartLocation] = useState("");
	const [endLocation, setEndLocation] = useState("");
	const [duration, setDuration] = useState("");
	const [distance, setDistance] = useState("");
	const [intensityLevel, setIntensityLevel] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		// code to send form data to database
	};

	return (
		<main className="event-form">
			<div className="event-form__card">
				<div className="event-form__header">
					<h1 className="event-form__header-title">
						Create New Event
					</h1>
				</div>
				<form className="event-form__form" onSubmit={handleSubmit}>
                    <div className="event-form__form-left">
					<label className="event-form__form-label" htmlFor="title">Title:</label>
					<input
                        className="event-form__form-input"
						type="text"
						id="title"
						value={title}
						onChange={(event) => setTitle(event.target.value)}
					/>

					<label className="event-form__form-label" htmlFor="description">Description:</label>
					<input
                        className="event-form__form-input event-form__form-input--textarea"
						type="textarea"
						id="description"
						value={description}
						onChange={(event) => setDescription(event.target.value)}
					/>

					<label className="event-form__form-label" htmlFor="activity-type">Activity Type:</label>
					<select
                        className="event-form__form-select"
						id="activity-type"
						value={activityType}
						onChange={(event) => setActivityType(event.target.value)}
					>
						<option className="event-form__form-select-option" value="">Select an activity type</option>
						<option className="event-form__form-select-option" value="Run">Run</option>
						<option className="event-form__form-select-option" value="Bike">Bike</option>
						<option className="event-form__form-select-option" value="Swim">Swim</option>
						<option className="event-form__form-select-option" value="Downhill Ski">Downhill Ski</option>
						<option className="event-form__form-select-option" value="Other">Other</option>
					</select>

					<label className="event-form__form-label" htmlFor="event-time">Event Time:</label>


                    </div>
                    <div className="event-form__form-right">
					<label className="event-form__form-label" htmlFor="start-location">Start Location:</label>
					<input
                        className="event-form__form-input"
						type="text"
						id="start-location"
						value={startLocation}
						onChange={(event) => setStartLocation(event.target.value)}
					/>

					<label className="event-form__form-label" htmlFor="end-location">End Location:</label>
					<input
                        className="event-form__form-input"
						type="text"
						id="end-location"
						value={endLocation}
						onChange={(event) => setEndLocation(event.target.value)}
					/>

					<label className="event-form__form-label" htmlFor="duration">Duration:</label>
					<input
                        className="event-form__form-input"
						type="text"
						id="duration"
						value={duration}
						onChange={(event) => setDuration(event.target.value)}
					/>

					<label className="event-form__form-label" htmlFor="distance">Distance:</label>
					<input
                        className="event-form__form-input"
						type="text"
						id="distance"
						value={distance}
						onChange={(event) => setDistance(event.target.value)}
					/>

					<label className="event-form__form-label" htmlFor="intensity-level">Intensity Level:</label>
					<select
                        className="event-form__form-select"
						id="intensity-level"
						value={intensityLevel}
						onChange={(event) => setIntensityLevel(event.target.value)}
					>
						<option value="">Select an intensity level</option>
						<option value="Easy">Easy</option>
						<option value="Moderate">Moderate</option>
						<option value="Advanced">Advanced</option>
						<option value="Elite">Elite</option>
					</select>
                    </div>
				</form>
                <div className="event-form__form-buttons">
                    <Button type="cancel" text="Cancel" bgColor="#eeeeee"/>
                    <Button type="submit" text="Create Event"/>
                </div>
			</div>
		</main>
	);
}

export default EventForm;
