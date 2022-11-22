import { User } from '@prisma/client';
import React from 'react';

interface IUserProfileComponentProps {
	user: User;
}

export const UserProfile = ({ user }: IUserProfileComponentProps) => {
	return <div>{user.id}</div>;
};
