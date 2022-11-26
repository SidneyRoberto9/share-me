export const includeForIUserFull = {
	posts: {
		include: {
			author: {
				include: {
					comment: {
						include: {
							author: true,
							post: true,
						},
					},
					save: {
						include: {
							user: true,
							post: true,
						},
					},
					accounts: true,
					posts: true,
					sessions: true,
				},
			},
			comment: {
				include: {
					author: true,
					post: true,
				},
			},
			save: {
				include: {
					user: true,
					post: true,
				},
			},
		},
	},
	comment: {
		include: {
			author: true,
			post: true,
		},
	},
	save: {
		include: {
			user: true,
			post: {
				include: {
					author: true,
				},
			},
		},
	},
};

export const getFullUserWithEmail = async (email: any) => {
	return await prisma.user.findUnique({
		where: {
			email: email,
		},
		include: includeForIUserFull,
	});
};

export const getManyFullPosts = async () => {
	return await prisma.post.findMany({
		orderBy: {
			createdAt: 'desc',
		},
		include: {
			comment: {
				include: {
					author: true,
					post: true,
				},
			},
			save: {
				include: {
					user: true,
					post: true,
				},
			},
			author: {
				include: {
					comment: true,
					posts: true,
					save: true,
				},
			},
		},
	});
};
