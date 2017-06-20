import recalculateBasicNumbers from '../../utils/recalculateBasicNumbers';

const requirementSource = {
	beginDrag(props) {
		const persistent_id = props.detailData.persistent_id;
		const parent_id = props.detailData.parent_id;
		console.log(parent_id);
		console.log(props.requirementStore.requirementData.find(obj => obj.persistent_id === parent_id))
		const originalIndex = props.requirementStore.requirementData.find(obj => obj.persistent_id === parent_id).children.findIndex(obj => obj.persistent_id === persistent_id);
		return {
			draggedObject: props.detailData,
			originalIndex: originalIndex,
			originalParent: parent_id
		}
	},
	isDragging(props,monitor) {
		
		return props.detailData.persistent_id === monitor.getItem().draggedObject.persistent_id
	},
	endDrag(props, monitor) {
		const draggedObject = monitor.getItem().draggedObject;
		// const originalIndex = monitor.getItem().originalIndex;
		const originalParent = monitor.getItem().originalParent;
		const didDrop = monitor.didDrop();
		if (didDrop) {
			const checkParentsChanged = originalParent !== draggedObject.parent_id;
			window.dropOutput = window.toJS(recalculateBasicNumbers(props.requirementStore, draggedObject.persistent_id, checkParentsChanged));
			props.requirementStore.reorderRequirements(recalculateBasicNumbers(props.requirementStore, draggedObject.persistent_id, checkParentsChanged));
		}
		else {
			console.log('didnt drop')
			// const reqArray = props.requirementStore.groupData.find(obj => obj.persistent_id === droppedParentId).requirements;
			// const droppedIndex = reqArray.findIndex(obj => obj.persistent_id === droppedId);
			// reqArray.splice(originalIndex, 0, reqArray.splice(droppedIndex, 1)[0])
		}
	}
}

const requirementTarget = {
	canDrop(props,monitor) {
		const draggedObject = monitor.getItem().draggedObject;
		if (draggedObject.details.length) {
			// alert("You nested a requirement with children (Will block this and display a warning)") 
			// TODO: Block the user from demoting something with children | JH
			return false;
		}
		return true;

	},
	hover(props, monitor) {
		const draggedObject = monitor.getItem().draggedObject;
		const overObject = props.detailData;

		if (!draggedObject) return;
		if (draggedObject.children.length > 0) {
			// can't demote if it has children
			return;
		}
		if (draggedObject.persistent_id === overObject.parent_id) return;
		if (draggedObject.persistent_id !== overObject.persistent_id) {

			if (overObject.parent_id === draggedObject.parent_id) {
				const reqArray = props.requirementStore.requirementData.find(obj => obj.persistent_id === overObject.parent_id).children
				const draggedIndex = reqArray.findIndex(obj => obj.persistent_id === draggedObject.persistent_id)
				const overIndex = reqArray.findIndex(obj => obj.persistent_id === overObject.persistent_id)
				reqArray.splice(overIndex, 0, reqArray.splice(draggedIndex, 1)[0])
			}
			else if (overObject.basicType !== draggedObject.basicType) {
				// Set where the new monitored item is temp stored
				const oldGroupArray = props.requirementStore.groupData.find(obj => obj.persistent_id === draggedObject.parent_id).children;
				monitor.getItem().draggedObject.parent_id = overObject.parent_id;
				oldGroupArray.splice(oldGroupArray.findIndex(obj => obj.persistent_id === draggedObject.persistent_id),1);
				const newGroupArray = props.requirementStore.requirementData.find(obj => obj.persistent_id === overObject.parent_id).children;
				draggedObject.parent_id = overObject.parent_id;
				draggedObject.basicType = 'detail';
				newGroupArray.push(draggedObject);
			}

			
		}
	},

}

export {requirementTarget, requirementSource};
