import React from 'react';

type EditProps = {
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const EditForm: React.FC<EditProps> = ({ value, onChange }) => {
	return (
		<input
			type="text"
			className="flex-grow bg-white border-2 border-gray-300 rounded-lg py-1 px-2 focus:outline-none focus:border-blue-400 w-full md:w-auto"
			value={value}
			onChange={onChange}
		></input>
	);
};
