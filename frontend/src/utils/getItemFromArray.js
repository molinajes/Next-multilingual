export default function (array, id, field = 'persistent_id') {
	const item = array.find(obj => obj[field] === id);
	// const item = -1;

	return item;
}