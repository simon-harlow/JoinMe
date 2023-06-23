import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DateTimePicker from 'react-datetime-picker';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import axios from "axios";
import { toast } from "react-toastify";

import { API_URL} from "../Utils/const";
import Activities from "../Utils/activities";
import Button from "../Button/Button";

import "react-toastify/dist/ReactToastify.css";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import "./EventForm.scss";

function EventForm() {
	// check for existence of eventId, if true then render edit event and not create event
	const { eventId } = useParams();
	const isEdit = !!eventId;

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [event_time, setEventTime] = useState(Date.now());
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
	const [gpx_url, setGpxUrl] = useState("");

	const [formError, setFormError] = useState([]);

	const navigate = useNavigate();
	const formRedirect = () => navigate(`/events`);
	const backToEvent = () => navigate(`/events/${eventId}`)

	const handleCancelClick = () => {
		if (isEdit) {
			backToEvent();
		} else {
			formRedirect();
		}
	};

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
					setIntensityLevel(data.intensity_level);
					setGpxUrl(data.gpx_url)
				})
				.catch((error) => {
					console.error("Error fetching event data:", error);
				});
		}
	}, [isEdit, eventId]);

	// handle start and end location address and co-ordinates for Map
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

	// form validation - add error message to interface in future version
	const checkInputs = () => {
		const errors = [];

		if (title.trim() === "") {
			errors.push({ inputName: "title", message: "Please add a title" });
		}
		if (description.trim() === "") {
			errors.push({inputName: "description", message: "Please add a description",});
		}
		if (activity_type === "") {
			errors.push({inputName: "activity_type", message: "Please choose an activity",});
		}
		if (event_time === "") {
			errors.push({inputName: "event_time", message: "Please choose a date and time",});
		}
		if (start_location.trim() === "") {
			errors.push({inputName: "start_location", message: "Please add a start location",});
		}
		if (end_location.trim() === "") {
			errors.push({inputName: "end_location", message: "Please add a end location",});
		}
		if (event_duration.trim() === "") {
			errors.push({inputName: "event_duration", message: "Please add a time duration",});
		}
		if (event_distance === "") {
			errors.push({ inputName: "event_distance", message: "Please add a distance in KMs" });
			} else if (isNaN(event_distance)) {
			errors.push({ inputName: "event_distance", message: "Distance must be a number" });
			}
		if (intensity_level === "") {
			errors.push({inputName: "intensity_level", message: "Please choose intensity",});
		}

		if (errors.length > 0) {
			setFormError(errors);
			return false;
		} else {
			setFormError([]);
			return true;
		}
	};

	const isFormValid = () => {
        if (!checkInputs()) {
            return false;
        }
        return true;
    }

	// handler for adding new event
	const handleFormSubmit = (event) => {
		event.preventDefault();
	
		if (isFormValid()) {
			const data = new FormData();
			data.append("title", title);
			data.append("description", description);
			data.append("activity_type", activity_type);
			data.append("event_time", event_time);
			data.append("start_location", start_location);
			data.append("start_lat", start_lat);
			data.append("start_lon", start_lon);
			data.append("end_location", end_location);
			data.append("end_lat", end_lat);
			data.append("end_lon", end_lon);
			data.append("event_duration", event_duration);
			data.append("event_distance", event_distance);
			data.append("intensity_level", intensity_level);
			
			if (gpx_url && gpx_url !== "") {
				data.append("gpx_url", gpx_url);
			}

			const method = isEdit ? "put" : "post";
			const url = isEdit
				? `${API_URL}/events/${eventId}`
				: `${API_URL}/events`;

			axios[method](url, data)
				.then(() => {
					setFormError([]);
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
					setGpxUrl("");
					if (isEdit) {
						backToEvent();
					} else {
						formRedirect();
					}
					if (isEdit) {
						toast.success("Update successful!", {theme: "colored"});
					} else {
						toast.success("Event Created successfully!", {theme: "colored"});
					}
				})
				.catch((error) => {
					console.error(error);
				});
		}
	};

	return (
		<main className="event-form">
			<div className="event-form__card">
				<header className="event-form__header">
				<h1 className="event-form__header-title">
					{isEdit ? 'Edit Event' : 'Create Event'}
				</h1>
				</header>
				<form onSubmit={handleFormSubmit} enctype="multipart/form-data">
					<div className="event-form__form">
						<div className="event-form__form-left">
						<label className="event-form__form-label" htmlFor="title">Title:</label>
						<input
							className={`event-form__form-input
							${formError && formError.find((error) => error.inputName === "title")
								? "form__error"
								: ""
							}`}
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
							className={`event-form__form-input event-form__form-input--textarea
							${formError && formError.find((error) => error.inputName === "description")
								? "form__error"
								: ""
							}`}
							id="description"
							name="description"
							maxLength="200"
							placeholder="Describe the event and mention any useful info that others should know..."
							value={description}
							onChange={(event) => setDescription(event.target.value)}
						/>

						<label className="event-form__form-label" htmlFor="activity_type">Activity Type:</label>
						<select
						className={`event-form__form-select
						${formError && formError.find((error) => error.inputName === "activity_type")
							? "form__error"
							: ""
						}`}
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

						<label className="event-form__form-label" htmlFor="gpx_url">GPX File:</label>
						<input
						className="event-form__form-label event-form__form-label--file-button"
						onChange={(event) => setGpxUrl(event.target.files[0])}
						type="file"
						name="gpx_url"
						id="gpx_url"
						disabled={isEdit ? true : false}
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
									className: `event-form__form-input ${formError && formError.find(error => error.inputName === "start_location") ? "form__error" : ""}`,
									})}
								/>
								<div className="autocomplete-dropdown-container" >
									{loading && <div>Loading...</div>}
									{suggestions.map((suggestion) => {
									const className = suggestion.active
										? "suggestion-item--active"
										: "suggestion-item";
									return (
										<div
										{...getSuggestionItemProps(suggestion, {
											className,
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
									className: `event-form__form-input ${formError && formError.find(error => error.inputName === "end_location") ? "form__error" : ""}`,
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

						<label className="event-form__form-label" htmlFor="event_duration">Duration:</label>
						<input
							className={`event-form__form-input
							${formError && formError.find((error) => error.inputName === "event_duration")
								? "form__error"
								: ""
							}`}
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
							className={`event-form__form-input
							${formError && formError.find((error) => error.inputName === "event_distance")
								? "form__error"
								: ""
							}`}
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
							className={`event-form__form-select
							${formError && formError.find((error) => error.inputName === "intensity_level")
								? "form__error"
								: ""
							}`}
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
						<Button text="Cancel" textColor="#000000" bgColor="#eeeeee" onClick={handleCancelClick}/>
						<Button type="submit" text={isEdit ? "Update Event" : "Create Event"} onSubmit={handleFormSubmit}/>
					</div>
				</form>
			</div>
		</main>
	);
}

export default EventForm;
