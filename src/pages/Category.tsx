import React from 'react';
import { useParams } from 'react-router-dom';

export const Category = () => {
	const { name } = useParams();

	return <div>Category</div>;
};
