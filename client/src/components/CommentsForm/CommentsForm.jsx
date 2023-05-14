import React from "react";
import { useState } from "react";
import axios from "axios";

import { API_URL } from "../Utils/const";
import Button from "../Button/Button";

import "./CommentsForm.scss";

export default function CommentsForm({ userData, eventData, addComment }) {

	const [comment, setComment] = useState("");
	const [formError, setFormError] = useState("");

	const handleChangeComment = (event) => {
		setComment(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (comment.trim() === "") {
			setFormError({ inputName: "comment", message: "Please enter a comment" });
			return;
		}
		axios.post(
			`${API_URL}/events/${eventData.id}/comments`,
			{
				comment
			}
		)
		.then((response) => {
			addComment(response.data);
			setComment("")
			setFormError("")
		})
		.catch((error) => {
			console.error(error);
		});
	};

	return (
		<div className="comments__form-container">
			<img
				className="comments__profile-pic"
				id="profile-pic"
				src={userData?.avatar_url}
				alt={userData?.first_name}
			/>
			<form
				className="comments__form" id="comments-form" onSubmit={handleSubmit}>
				<textarea
					className={`comments__form-input ${formError && formError.inputName === "comment" ? "form__error" : ""}`}
					name="comment"
					id="comment"
					maxLength="200"
					placeholder="Add a comment"
					onChange={handleChangeComment}
					value={comment}
				></textarea>
				<Button text="Add Comment"/>
			</form>
		</div>
	);
}