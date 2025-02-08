import React from 'react';

type ButtonProp = {
	label: string;
	onClick: () => void;
	className?: string;
};

export const Button: React.FC<ButtonProp> = ({ label, className, onClick }) => {
	return (
		<button className={`text-lg ${className}`} onClick={onClick}>
			{label}
		</button>
	);
};
