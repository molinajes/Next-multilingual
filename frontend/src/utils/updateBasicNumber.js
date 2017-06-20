export default (input) => {
	if (input.indexOf('BA') !== 0) {
		// Input string did not contain 'BA'
		// Can just pass number back
		return input;
	}
	const splitText = input.replace('BA','').split('.');

	return splitText[splitText.length -1];
}
