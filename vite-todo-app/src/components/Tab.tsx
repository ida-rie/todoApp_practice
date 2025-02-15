import React from 'react';

type TabProp = {
	label: string;
	onClick: () => void;
	filter?: string;
};

export const Tab: React.FC<TabProp> = ({ label, onClick, filter }) => {
	return (
		<>
			<button onClick={onClick} className={`px-4 py-2 rounded ${filter}`}>
				{label}
			</button>
		</>
	);
};
