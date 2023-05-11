import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";

import Close from '../../assets/icons/web/close.svg';
import Button from "../Button/Button";

import "./Modal.scss";

const Modal = ({ isOpen, onClose, handleCancelClick, handleConfirmDeleteClick }) => {
	if (!isOpen) {
		return null;
	}

	return ReactDOM.createPortal(
		<div className="modal-container">
			<div className="modal">
				<div className="modal__header">
					<h3 className="modal__title">Delete Event</h3>
					<button className="modal__close" onClick={onClose}>
						<img className="modal__close-icon" src={Close} alt="close"/>
					</button>
				</div>
				<div className="modal__body">
                    <p>Are you sure you want to delete this event?</p>
                </div>
                <div className="modal__buttons">
                    <Button text="Cancel" bgColor="#eeeeee" textColor="#000000" onClick={handleCancelClick} />
                    <Button text="Delete" onClick={handleConfirmDeleteClick} />
                </div>
			</div>
		</div>,
		document.body
	);
};

export default Modal;
