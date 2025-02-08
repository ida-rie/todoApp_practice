import React from 'react';

type InputProps = {
	value: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onClick: () => void;
};

export const InputForm: React.FC<InputProps> = ({ value, onChange, onClick }) => {
	return (
		<div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
			<input
				type="text"
				className="flex-grow bg-gray-100 border-2 border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:border-blue-400 w-full md:w-auto"
				placeholder="タスクを入力"
				value={value}
				onChange={onChange}
			/>
			<button
				className="bg-yellow-400 hover:bg-yellow-300 text-white font-bold py-3 px-6 rounded-lg shadow-md w-full md:w-auto"
				onClick={onClick}
			>
				作成
			</button>
		</div>
	);
};
