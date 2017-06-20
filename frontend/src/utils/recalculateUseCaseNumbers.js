const recalculateUseCaseNumbers = (store, draggedId, parentChanged, force) => {
	let output = [];

	store.packageData.forEach(currentPackage => {
		currentPackage.children.forEach((useCase, index) => {
			// console.log(currentPackage.number, index+1)
			if (force || (useCase.number !== (index+1).toString()) || (parentChanged && draggedId === useCase.persistent_id)) {
				// If the number is changed we need to keep track of it in output
				// If the parent of the dragged object was changed in the dragging then 
				// we must also add this to the list to ensure this parent is updated.
				output.push({
					persistent_id: useCase.persistent_id,
					newParentId: useCase.parent_id,
					newNumber: (index+1).toString()
				})
			}
		})
	})

	return output;
}

export default recalculateUseCaseNumbers;