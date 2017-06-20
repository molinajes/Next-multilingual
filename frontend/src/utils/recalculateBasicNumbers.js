const recalculateBasicNumbers = (store, draggedId, parentChanged, force) => {
	let output = [];

	store.groupData.forEach((group, index) => {
		if (force || (group.number !== (index+1).toString()))  {
			output.push({				
				persistent_id: group.persistent_id,
				newParentId: "-1",
				newNumber: (index+1).toString()
			})
		}	
	})

	store.groupData.forEach(group => {
		group.children.forEach((req, index) => {
			// console.log(req.number, index+1)
			if (force || (req.number !== (index+1).toString()) || (parentChanged && draggedId === req.persistent_id)) {
				// If the number is changed we need to keep track of it in output
				// If the parent of the dragged object was changed in the dragging then 
				// we must also add this to the list to ensure this parent is updated.
				output.push({					
					persistent_id: req.persistent_id,
					newParentId: req.parent_id,
					newNumber: (index+1).toString()
				})
			}
		})
	})

	store.requirementData.forEach(req => {
		req.children.forEach((detail, index) => {
			// console.log(req.number, index+1)
			if (force || (detail.number !== (index+1).toString()) || (parentChanged && draggedId === detail.persistent_id)) {
				// If the number is changed we need to keep track of it in output
				// If the parent of the dragged object was changed in the dragging then 
				// we must also add this to the list to ensure this parent is updated.
				output.push({
					persistent_id: detail.persistent_id,
					newParentId: detail.parent_id,
					newNumber: (index+1).toString()
				})
			}
		})
	})

	return output;
}

export default recalculateBasicNumbers;