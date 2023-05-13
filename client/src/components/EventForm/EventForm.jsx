import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DateTimePicker from 'react-datetime-picker';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import axios from "axios";

import { API_URL} from "../Utils/const";
import Activities from '../Utils/activities';
import Button from "../Button/Button";

import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import "./EventForm.scss";

function EventForm() {
	// check for existence of eventId, if true then render edit event and not create event
	const { eventId } = useParams();
	const isEdit = !!eventId;

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [event_time, setEventTime] = useState("");
	const [activity_type, setActivityType] = useState("");
	const [start_location, setStartLocation] = useState("");
	const [start_lat, setStartLat] = useState("")
	const [start_lon, setStartLon] = useState("")
	const [end_location, setEndLocation] = useState("");
	const [end_lat, setEndLat] = useState("")
	const [end_lon, setEndLon] = useState("")
	const [event_duration, setEventDuration] = useState("");
	const [event_distance, setEventDistance] = useState("");
	const [intensity_level, setIntensityLevel] = useState("");

	const [formErrors, setFormErrors] = useState();

	const navigate = useNavigate();
	const formRedirect = () => navigate(`/events`);
	const backPage = () => navigate(`/events/${eventId}`);

	useEffect(() => {
		// Only get data if isEdit is true
		if (isEdit) {
			axios
				.get(`${API_URL}/events/${eventId}`)
				.then((response) => {
					const data = response.data;
					setTitle(data.title);
					setDescription(data.description);
					setActivityType(data.activity_type);
					setEventTime(data.event_time);
					setStartLocation(data.start_location);
					setStartLat(data.start_lat);
					setStartLon(data.start_lon);
					setEndLocation(data.end_location);
					setEndLat(data.end_lat);
					setEndLon(data.end_lon);
					setEventDistance(data.event_distance);
					setEventDuration(data.event_duration);
					setIntensityLevel(data.intensity_level)
				})
				.catch((error) => {
					console.error("Error fetching event data:", error);
				});
		}
	}, [isEdit, eventId]);


	const handleStartSelect = async (value) => {
		const results = await geocodeByAddress(value);
		const latLng = await getLatLng(results[0]);
		setStartLocation(value);
		setStartLat(latLng.lat);
		setStartLon(latLng.lng);
	};

	const handleEndSelect = async (value) => {
		const results = await geocodeByAddress(value);
		const latLng = await getLatLng(results[0]);
		setEndLocation(value);
		setEndLat(latLng.lat);
		setEndLon(latLng.lng);
	};

	const isFormValid = () => {
		const errors = [];

		if (!title.trim()) {
			errors.push("Title is required");
		}
		if (!description.trim()) {
			errors.push("Description is required");
		}
		if (!activity_type.trim()) {
			errors.push("Activity Type is required");
		}
		if (!event_time) {
			errors.push("Date & Time is required");
		}
		if (!start_location.trim()) {
			errors.push("Start Location is required");
		}
		if (!end_location.trim()) {
			errors.push("End Location is required");
		}
		if (!event_duration.trim()) {
			errors.push("Duration is required");
		}
		if (!event_distance) {
			errors.push("Distance is required");
		}
		if (!intensity_level.trim()) {
			errors.push("Intensity Level is required");
		}
		return errors;
	};

	// handler for adding new warehouse
	const handleFormSubmit = (event) => {
		event.preventDefault();
		const errors = isFormValid();

		if (errors.length === 0) {
			const data = {
				title,
				description,
				activity_type,
				event_time,
				start_location,
				start_lat,
				start_lon,
				end_location,
				end_lat,
				end_lon,
				event_duration,
				event_distance,
				intensity_level,
			};

			const method = isEdit ? "put" : "post";
			const url = isEdit
				? `${API_URL}/events/${eventId}`
				: `${API_URL}/events`;

			axios[method](url, data)
				.then(() => {
					setFormErrors([]);
					setTitle("");
					setDescription("");
					setActivityType("");
					setEventTime("");
					setStartLocation("");
					setStartLat("");
					setStartLon("");
					setEndLocation("");
					setEndLat("");
					setEndLon("");
					setEventDuration("");
					setEventDistance("");
					setIntensityLevel("");
					formRedirect();
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			setFormErrors(errors);
		}
	};


	return (
		<main className="event-form">
			<div className="event-form__card">
				<header className="event-form__header">
					<h1 className="event-form__header-title">
						Create Event
					</h1>
				</header>
				<form onSubmit={handleFormSubmit}>
					<div className="event-form__form">
						<div className="event-form__form-left">
						<label className="event-form__form-label" htmlFor="title">Title:</label>
						<input
							className="event-form__form-input"
							type="text"
							id="title"
							name="title"
							maxLength="50"
							placeholder="Name your event..."
							value={title}
							onChange={(event) => setTitle(event.target.value)}
						/>


						<label className="event-form__form-label" htmlFor="description">Description:</label>
						<textarea
							className="event-form__form-input event-form__form-input--textarea"
							id="description"
							name="description"
							maxLength="200"
							placeholder="Describe the event and mention any useful info that others should know..."
							value={description}
							onChange={(event) => setDescription(event.target.value)}
						/>

						<label className="event-form__form-label" htmlFor="activity_type">Activity Type:</label>
						<select
						className="event-form__form-select"
						id="activity_type"
						name="activity_type"
						value={activity_type}
						onChange={(event) => setActivityType(event.target.value)}
						>
							<option value="" disabled hidden>
								{isEdit ? "Please select an activity type" : "Choose an activity type"}
							</option>
							{Activities.map((activity, index) => (
								<option key={index} value={activity}>
								{activity}
								</option>
							))}
						</select>

						<label className="event-form__form-label" htmlFor="event_time">Date & Time:</label>
						<DateTimePicker
						onChange={(event) => setEventTime(event.getTime())}
						id="event_time"
						name="event_time"
						value={event_time}
						minDate={new Date()}
						showLeadingZeros={true}
						minDetail={"year"}
						clearIcon={null}
						disableClock={true}
						locale={"en-GB"}
						/>

						</div>
						<div className="event-form__form-right">
						<label className="event-form__form-label" htmlFor="start_location">Start Location:</label>
						<PlacesAutocomplete
							value={start_location}
							onChange={setStartLocation}
							onSelect={handleStartSelect}
							id="start_location"
							name="start_location"
							>
							{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
								<>
								<input 
									{...getInputProps({
									placeholder: "Start typing and pick a location from the list...",
									className: "event-form__form-input",
									})}
								/>
								<div className="autocomplete-dropdown-container" >
									{loading && <div>Loading...</div>}
									{suggestions.map((suggestion) => {
									const className = suggestion.active
										? "suggestion-item--active"
										: "suggestion-item";
									const style = suggestion.active
										? { backgroundColor: "#f7f7f7", cursor: "pointer" }
										: { backgroundColor: "transparent", cursor: "pointer" };
									return (
										<div
										{...getSuggestionItemProps(suggestion, {
											className,
											style,
										})}
										>
										<span>{suggestion.description}</span>
										</div>
									);
									})}
								</div>
								</>
							)}
						</PlacesAutocomplete>

						<label className="event-form__form-label" htmlFor="end_location">End Location:</label>
						<PlacesAutocomplete
							value={end_location}
							onChange={setEndLocation}
							onSelect={handleEndSelect}
							id="end_location"
							name="end_location"
							>
							{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
								<>
								<input 
									{...getInputProps({
									placeholder: "Start typing and pick a location from the list...",
									className: "event-form__form-input",
									})}
								/>
								<div className="autocomplete-dropdown-container" >
									{loading && <div>Loading...</div>}
									{suggestions.map((suggestion) => {
									const className = suggestion.active
										? "suggestion-item--active"
										: "suggestion-item";
									const style = suggestion.active
										? { backgroundColor: "#f7f7f7", cursor: "pointer" }
										: { backgroundColor: "transparent", cursor: "pointer" };
									return (
										<div
										{...getSuggestionItemProps(suggestion, {
											className,
											style,
										})}
										>
										<span>{suggestion.description}</span>
										</div>
									);
									})}
								</div>
								</>
							)}
						</PlacesAutocomplete>
						{/* <input
							className="event-form__form-input"
							type="text"
							id="end_location"
							name="end_location"
							maxLength="30"
							value={end_location}
							onChange={(event) => setEndLocation(event.target.value)}
						/> */}

						<label className="event-form__form-label" htmlFor="event_duration">Duration:</label>
						<input
							className="event-form__form-input"
							type="text"
							id="event_duration"
							name="event_duration"
							maxLength="10"
							placeholder="30 mins or 4 hours etc..."
							value={event_duration}
							onChange={(event) => setEventDuration(event.target.value)}
						/>

						<label className="event-form__form-label" htmlFor="event_distance">Distance (KM):</label>
						<input
							className="event-form__form-input"
							type="text"
							id="event_distance"
							name="event_distance"
							maxLength="3"
							placeholder="Number of KMs..."
							value={event_distance}
							onChange={(event) => setEventDistance(event.target.value)}
						/>

						<label className="event-form__form-label" htmlFor="intensity_level">Intensity Level:</label>
						<select
							className="event-form__form-select"
							id="intensity_level"
							name="intensity_level"
							value={intensity_level}
							onChange={(event) => setIntensityLevel(event.target.value)}
						>
							<option value="" disabled hidden>
								{isEdit ? "Please select an intensity level" : "Choose an intensity level"}
							</option>
							{["Easy", "Moderate", "Advanced", "Elite"].map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</select>
						</div>
					</div>
					<div className="event-form__form-buttons">
						<Button text="Cancel" textColor="#000000" bgColor="#eeeeee" onClick={backPage}/>
						<Button type="submit" text={isEdit ? "Update Event" : "Create Event"} onSubmit={handleFormSubmit}/>
					</div>
				</form>
			</div>
		</main>
	);
}

export default EventForm;
