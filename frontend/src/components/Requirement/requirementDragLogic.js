import recalculateBasicNumbers from '../../utils/recalculateBasicNumbers';

const requirementSource = {
	beginDrag(props) {
		const persistent_id = props.requirementData.persistent_id;
		const parent_id = props.requirementData.parent_id;
		// TODO:  ... this implementation... ehh
		const originalIndex = props.requirementStore.groupData.find(obj => obj.persistent_id === parent_id).children.findIndex(obj => obj.persistent_id === persistent_id);
		return {
			draggedObject: props.requirementData,
			originalIndex: originalIndex,
			originalParent: parent_id
		}
	},
	isDragging(props,monitor) {
		return props.requirementData.persistent_id === monitor.getItem().draggedObject.persistent_id
	},
	endDrag(props, monitor) {
		const draggedObject = monitor.getItem().draggedObject;
		//  const originalIndex = monitor.getItem().originalIndex;  // TODO: Use original index to put item back on fail | JH
		const originalParent = monitor.getItem().originalParent;
		const didDrop = monitor.didDrop();
		if (didDrop) {
			const checkParentsChanged = originalParent !== draggedObject.parent_id;
			window.dropOutput = window.toJS(recalculateBasicNumbers(props.requirementStore, draggedObject.persistent_id, checkParentsChanged));
			props.requirementStore.reorderRequirements(recalculateBasicNumbers(props.requirementStore, draggedObject.persistent_id, checkParentsChanged));
		}
		else {
			console.log('didnt drop')
			// const reqArray = props.requirementStore.groupData.find(obj => obj.basic_id === droppedParentId).requirements;
			// const droppedIndex = reqArray.findIndex(obj => obj.basic_id === droppedId);
			// reqArray.splice(originalIndex, 0, reqArray.splice(droppedIndex, 1)[0])
		}
	}
}

const requirementTarget = {
	canDrop() {
		return true;
	},
	hover(props, monitor) {
		const draggedObject = monitor.getItem().draggedObject;
		const overObject = props.requirementData;

		if (!draggedObject) return;
		if (draggedObject.persistent_id !== overObject.persistent_id) {
			// Determine rectangle on screen
			// const hoverBoundingRect = component.getDecoratedComponentInstance().requirementRef.getBoundingClientRect();
			// Get vertical middle
			// const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			// Determine mouse position
			// const clientOffset = monitor.getClientOffset();
			// Get pixels to the top
			// const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			// console.log(props.uiStore.hoveredDropTarget)			
			// Maybe do something here about the 50% above/below
			if (overObject.parent_id === draggedObject.parent_id) {
				const reqArray = props.requirementStore.groupData.find(obj => obj.persistent_id === overObject.parent_id).children
				const draggedIndex = reqArray.findIndex(obj => obj.persistent_id === draggedObject.persistent_id)
				const overIndex = reqArray.findIndex(obj => obj.persistent_id === overObject.persistent_id)
				reqArray.splice(overIndex, 0, reqArray.splice(draggedIndex, 1)[0])
			}
			else if (overObject.basicType !== draggedObject.basicType) {
				// Demoting a detail
				const oldGroupArray = props.requirementStore.requirementData.find(obj => obj.persistent_id === draggedObject.parent_id).children;

				// Set where the new monitored item is temp stored
				monitor.getItem().draggedObject.parent_id = overObject.parent_id;

				oldGroupArray.splice(oldGroupArray.findIndex(obj => obj.persistent_id === draggedObject.persistent_id),1);
				const newGroupArray = props.requirementStore.groupData.find(obj => obj.persistent_id === overObject.parent_id).children;
				draggedObject.parent_id = overObject.parent_id;
				draggedObject.basicType = 'requirement';
				props.requirementStore.requirementData.push(draggedObject);
				newGroupArray.push(draggedObject);


			}
			else {
				
				const oldGroupArray = props.requirementStore.groupData.find(obj => obj.persistent_id === draggedObject.parent_id).children;

				// Set where the new monitored item is temp stored
				monitor.getItem().draggedObject.parent_id = overObject.parent_id;

				oldGroupArray.splice(oldGroupArray.findIndex(obj => obj.persistent_id === draggedObject.persistent_id),1);
				const newGroupArray = props.requirementStore.groupData.find(obj => obj.persistent_id === overObject.parent_id).children;
				draggedObject.parent_id = overObject.parent_id;
				newGroupArray.push(draggedObject);
			}

			
		}
	},

}

export {requirementTarget, requirementSource};
