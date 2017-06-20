export default function (array, id, field = 'persistent_id') {
	const index = array.findIndex(obj => obj[field] === id);

	if (index === -1) {
		throw Error("Returned -1 on removeItemFromArray");
	}
	return array.splice(index,1)[0];
}