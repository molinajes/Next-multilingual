const recalculateStepNumbers = (store, draggedId, parentChanged, force) => {
	let output = [];

	store.flowData.forEach(currentPackage => {
		currentPackage.children.forEach((step, index) => {
			// console.log(currentPackage.number, index+1)
			if (force || (step.number !== (index+1).toString()) || (parentChanged && draggedId === step.persistent_id)) {
				// If the number is changed we need to keep track of it in output
				// If the parent of the dragged object was changed in the dragging then 
				// we must also add this to the list to ensure this parent is updated.
				let alternativeFlowLabel = '';
				let lastChar = step.number.substring(step.number.length-1);
				// Also may need to reappend the letter if the last char is an alpha char
				if (lastChar.match(/[a-zA-Z]/i)) {
					alternativeFlowLabel = lastChar;
				}


				output.push({
					persistent_id: step.persistent_id,
					newParentId: step.parent_id,
					newNumber: (index+1).toString() + alternativeFlowLabel
				})
			}
		})
	})

	return output;
}

export default recalculateStepNumbers;