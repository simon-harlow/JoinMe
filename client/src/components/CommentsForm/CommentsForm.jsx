import React from "react";
import { useState } from "react";
import axios from "axios";

import { API_URL } from "../Utils/const";

import "./CommentsForm.scss";
import Avatar from "../../assets/images/Mohan-muruge.jpg";
import CommentIcon from "../../assets/images/add_comment.svg";

export default function CommentsForm() {

	const [name, setName] = useState("");
	const [comment, setComment] = useState("");
	const [formError, setFormError] = useState("");

	const handleChangeName = (event) => {
		setName(event.target.value);
	};

	const handleChangeComment = (event) => {
		setComment(event.target.value);
	};

	const checkInputs = () => {
	};

    const isFormValid = () => {
        if (!checkInputs()) {
            return false;
        }

        return true;
    }

	const handleSubmit = (event) => {
		event.preventDefault();

        if (isFormValid()) {
                    axios.post(
                        `${API_URL}/videos/${videoId}/comments`,
                        {
                            name,
                            comment,
                        }
                    )
                    .then((result) => {
                        addComment(result.data);
                        setName("");
                        setComment("");
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
		}

	return (
		<div className="comments__form-container">
			<img
				className="comments__profile-pic"
				id="profile-pic"
				src={Avatar}
				alt="user avatar"
			/>
			<form
				className="comments__form"
				id="comments-form"
				onSubmit={handleSubmit}
			>
				<label className="comments__form-subhead" htmlFor="name">
					NAME
				</label>
				<input
					className={`comments__form-input comments__form-input--name ${formError && formError.inputName === "name" ? "form__error" : ""}`}
					type="text"
					name="name"
					id="name"
					maxLength="30"
					placeholder="Enter your name"
					onChange={handleChangeName}
					value={name}
				/>
				<label className="comments__form-subhead" htmlFor="comment">
					COMMENT
				</label>
				<textarea
					className={`comments__form-input ${formError && formError.inputName === "comment" ? "form__error" : ""}`}
					name="comment"
					id="comment"
					maxLength="200"
					placeholder="Add a new comment"
					onChange={handleChangeComment}
					value={comment}
				></textarea>
				<button
					className="comments__form-button"
					type="submit"
					id="submit"
				>
					<img
						className="comments__form-button-img"
						src={CommentIcon}
						alt="comment icon"
					/>
					<span className="comments__form-button-text">COMMENT</span>
				</button>
			</form>
		</div>
	);
}
