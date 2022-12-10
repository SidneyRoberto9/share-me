type ISaveBodyParam = {
	postId: string;
	userId: string;
};

type ICommentBodyParam = {
	text: string;
	postId: string;
	userId: string;
};

type IPostQueryParam = {
	postId: string;
};

type IPostDeleteBodyParam = {
	fileName: string;
};

type IPostAddBodyParam = {
	title: string;
	destination: string;
	category: string;
	image: string;
	imageName: string;
	email: string;
};
