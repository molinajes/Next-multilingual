export default (input) => {
	if (input.indexOf('BA') !== 0) {
		// Input string did not contain 'BA'
		return null;
	}
	const strippedText = input.replace('BA','');
	return getLevel(...strippedText.split('.'));
}

const getLevel = (groupNumber, requirementNumber, detailNumber) => {
	let type = 'group';
	if (detailNumber) {
		type = 'detail';
	}
	else if (requirementNumber) {
		type = 'requirement'
	}
	return {
		groupNumber,
		requirementNumber,
		detailNumber,
		type
	}
}