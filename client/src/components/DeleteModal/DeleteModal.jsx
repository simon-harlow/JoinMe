import React from "react";
import ReactDOM from "react-dom";

import Close from '../../assets/icons/web/close.svg';
import Button from "../Button/Button";

import "./DeleteModal.scss";

const DeleteModal = ({ isOpen, onClose, handleCancelClick, handleConfirmDeleteClick }) => {
	if (!isOpen) {
		return null;
	}

	return ReactDOM.createPortal(
		<div className="delete-modal-container">
			<div className="delete-modal">
				<div className="delete-modal__header">
					<h3 className="delete-modal__title">Delete Event</h3>
					<button className="delete-modal__close" onClick={onClose}>
						<img className="delete-modal__close-icon" src={Close} alt="close"/>
					</button>
				</div>
				<div className="delete-modal__body">
                    <p>Are you sure you want to delete this event?</p>
                </div>
                <div className="delete-modal__buttons">
                    <Button text="Cancel" bgColor="#eeeeee" textColor="#000000" onClick={handleCancelClick} />
                    <Button text="Delete" onClick={handleConfirmDeleteClick} />
                </div>
			</div>
		</div>,
		document.body
	);
};

export default DeleteModal;
