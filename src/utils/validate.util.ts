export const isEmpty = (obj: any) => {
	return (
		obj === undefined ||
		obj === null ||
		Object.entries(obj).length === 0 ||
		obj.length === 0
	);
};
