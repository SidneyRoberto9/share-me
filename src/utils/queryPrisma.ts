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
