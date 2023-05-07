import React from "react";
import "./Button.scss";

const Button = ({ onClick, text, textColor, bgColor }) => {
	return (
		<button
			className="button"
			style={{ backgroundColor: bgColor, color: textColor }}
			onClick={onClick}
		>
			<span className="button-text">{text}</span>
		</button>
	);
};

export default Button;
