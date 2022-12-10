import React from 'react';
import { useParams } from 'react-router-dom';

export const Search = () => {
	const { content } = useParams();
	console.log(content);
	return <div>Search</div>;
};
