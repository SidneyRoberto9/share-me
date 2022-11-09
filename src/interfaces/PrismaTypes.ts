export type Session = {
	id: string;
	sessionToken: string;
	userId: String;
	expires: Date;
	user: User;
};

export type User = {
	id: string;
	name: string;
	email: string;
	emailVerified: Date;
	image: string;
	accounts: any[];
	sessions: Session[];
	Post: any[];
	Save: any[];
};
