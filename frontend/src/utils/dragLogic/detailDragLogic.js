import recalculateBasicNumbers from '../recalculateBasicNumbers';
import removeItemFromArray from '../removeItemFromArray';

const requirementSource = {
	beginDrag(props) {
		const persistent_id = props.requirementData.persistent_id;
		const parent_id = props.requirementData.parent_id;
		console.log(parent_id);
		console.log(props.requirementStore.requirementData.find(obj => obj.persistent_id === parent_id))
		const originalIndex = props.requirementStore.requirementData.find(obj => obj.persistent_id === parent_id).children.findIndex(obj => obj.persistent_id === persistent_id);
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

const reorder = (store, draggedObject, overObject) => {
	console.count('reorder')
	const reqArray = store.requirementData.find(obj => obj.persistent_id === overObject.parent_id).children
	const draggedIndex = reqArray.findIndex(obj => obj.persistent_id === draggedObject.persistent_id)
	const overIndex = reqArray.findIndex(obj => obj.persistent_id === overObject.persistent_id)
	reqArray.splice(overIndex, 0, reqArray.splice(draggedIndex, 1)[0])
}

const moveTo = (store, draggedObject, overObject, monitor) => {
	console.count('move to')
	let oldArray = findArrayWithChild(store, draggedObject.parent_id);

	if (oldArray) {
		// Set where the new monitored item is temp stored
		monitor.getItem().draggedObject.parent_id = overObject.parent_id;

		// Remove from old array
		removeItemFromArray(oldArray, draggedObject.persistent_id)
		
		let newArray = findArrayWithChild(store, overObject.parent_id);
		
		draggedObject.parent_id = overObject.parent_id;
		newArray.push(draggedObject);
	}
	
}

const findArrayWithChild = (store, idToFind) => {
	// Search the groups first
	let group = store.groupData.find(obj => obj.persistent_id === idToFind);
	if (group) return group.children;

	// Search the requirements now
	let requirement = store.requirementData.find(obj => obj.persistent_id === idToFind);
	if (requirement) return requirement.children;

	// Return 
	return null;
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
		const overObject = props.requirementData;

		if (!draggedObject) return;
		if (draggedObject.children.length > 0) {
			// can't demote if it has children
			console.log('Dragged object has children....')
			return;
		}
		// console.log({
		// 	dragged: draggedObject.name,
		// 	over: overObject.name
		// })
		if (draggedObject.persistent_id === overObject.parent_id) return;
		if (draggedObject.persistent_id !== overObject.persistent_id) {
			console.log('here')

			// if (overObject.parent_id === draggedObject.parent_id) {
			// 	console.log('same parent')
			// 	const reqArray = props.requirementStore.requirementData.find(obj => obj.persistent_id === overObject.parent_id).children
			// 	const draggedIndex = reqArray.findIndex(obj => obj.persistent_id === draggedObject.persistent_id)
			// 	const overIndex = reqArray.findIndex(obj => obj.persistent_id === overObject.persistent_id)
			// 	reqArray.splice(overIndex, 0, reqArray.splice(draggedIndex, 1)[0])
			// }
			// else if (overObject.basicType !== draggedObject.basicType) {
			// 	console.log('diffent type')
			// 	// Set where the new monitored item is temp stored
			// 	const oldGroupArray = props.requirementStore.groupData.find(obj => obj.persistent_id === draggedObject.parent_id).children;
			// 	monitor.getItem().draggedObject.parent_id = overObject.parent_id;
			// 	oldGroupArray.splice(oldGroupArray.findIndex(obj => obj.persistent_id === draggedObject.persistent_id),1);
			// 	const newGroupArray = props.requirementStore.requirementData.find(obj => obj.persistent_id === overObject.parent_id).children;
			// 	draggedObject.parent_id = overObject.parent_id;
			// 	draggedObject.basicType = 'detail';
			// 	newGroupArray.push(draggedObject);
			// }
			if (overObject.parent_id === draggedObject.parent_id) {
				console.log('same parent')
				reorder(props.requirementStore, draggedObject, overObject);
			}
			else {
				console.log('diff parent')
				moveTo(props.requirementStore, draggedObject, overObject, monitor)
			}

			
		}
	},

}

export {requirementTarget, requirementSource};
