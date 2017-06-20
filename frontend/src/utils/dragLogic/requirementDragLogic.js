import recalculateBasicNumbers from "../recalculateBasicNumbers";
import removeItemFromArray from "../removeItemFromArray";

const requirementSource = {
	beginDrag(props) {
		// const persistent_id = props.requirementData.persistent_id;
		const parent_id = props.requirementData.parent_id;
		// TODO:  ... this implementation... ehh
		// const originalIndex = props.requirementStore.groupData
			// .find(obj => obj.persistent_id === parent_id)
			// .children.findIndex(obj => obj.persistent_id === persistent_id);
		return {
			draggedObject: props.requirementData,
			// originalIndex: originalIndex,
			originalParent: parent_id
		};
	},
	isDragging(props, monitor) {
		return (
			props.requirementData.persistent_id ===
			monitor.getItem().draggedObject.persistent_id
		);
	},
	endDrag(props, monitor) {
		const draggedObject = monitor.getItem().draggedObject;
		//  const originalIndex = monitor.getItem().originalIndex;  // TODO: Use original index to put item back on fail | JH
		const originalParent = monitor.getItem().originalParent;
		const didDrop = monitor.didDrop();
		if (didDrop) {
			const checkParentsChanged =
				originalParent !== draggedObject.parent_id;
			window.dropOutput = window.toJS(
				recalculateBasicNumbers(
					props.requirementStore,
					draggedObject.persistent_id,
					checkParentsChanged
				)
			);
			props.requirementStore.reorderRequirements(
				recalculateBasicNumbers(
					props.requirementStore,
					draggedObject.persistent_id,
					checkParentsChanged
				)
			);
		} else {
			console.log("didnt drop");
			// const reqArray = props.requirementStore.groupData.find(obj => obj.basic_id === droppedParentId).requirements;
			// const droppedIndex = reqArray.findIndex(obj => obj.basic_id === droppedId);
			// reqArray.splice(originalIndex, 0, reqArray.splice(droppedIndex, 1)[0])
		}
	}
};

const reorder = (store, draggedObject, overObject) => {
	console.count("reorder");

	let array = store.groupData.find(obj => obj.persistent_id === overObject.parent_id);
	
	array = array ? array : store.requirementData.find(obj => obj.persistent_id === overObject.parent_id);

	let childArray = array.children;

	const draggedIndex = childArray.findIndex(
		obj => obj.persistent_id === draggedObject.persistent_id
	);
	const overIndex = childArray.findIndex(
		obj => obj.persistent_id === overObject.persistent_id
	);
	childArray.splice(overIndex, 0, childArray.splice(draggedIndex, 1)[0]);
};

const moveTo = (store, draggedObject, target, monitor) => {
	console.count("move to");
	console.log(draggedObject);
	console.log(target);

	let oldArray = findArrayWithChild(store, draggedObject.parent_id);
	console.log("old array", oldArray);

	if (oldArray) {
		// Set where the new monitored item is temp stored
		monitor.getItem().draggedObject.parent_id = target;

		// Remove from old array
		removeItemFromArray(oldArray, draggedObject.persistent_id);

		let newArray = findArrayWithChild(store, target);
		console.log("new array", newArray);

		draggedObject.parent_id = target;
		newArray.push(draggedObject);
	}
};

const findArrayWithChild = (store, idToFind) => {
	// Search the groups first
	let group = store.groupData.find(obj => obj.persistent_id === idToFind);
	if (group) return group.children;

	// Search the requirements now
	let requirement = store.requirementData.find(
		obj => obj.persistent_id === idToFind
	);
	if (requirement) return requirement.children;

	// Return
	return null;
};

const requirementTarget = {
	canDrop() {
		return true;
	},
	hover(props, monitor) {
		const draggedObject = monitor.getItem().draggedObject;
		const overObject = props.requirementData;

		if (draggedObject.persistent_id === overObject.persistent_id) {
			// console.log('checking')
			if (
				monitor.getInitialClientOffset().x + 50 <
					monitor.getClientOffset().x &&
				draggedObject.basicType === "requirement"
			) {
				console.log("checking out to the right");
				let array = findArrayWithChild(
					props.requirementStore,
					draggedObject.parent_id
				);
				console.log(array);
				let index = array.findIndex(
					item => item.persistent_id === draggedObject.persistent_id
				);

				if (index > 0) {
					console.log(index);
					console.log("found a requirement. moving to detail");
					let target = array[index - 1];
					moveTo(
						props.requirementStore,
						draggedObject,
						target.persistent_id,
						monitor
					);
					draggedObject.basicType = "detail";
				}
			} else if (
				monitor.getInitialClientOffset().x - 50 >
					monitor.getClientOffset().x &&
				draggedObject.basicType === "detail"
			) {
				console.log("checking out to the left");
				let req = props.requirementStore.requirementData.find(
					obj => obj.persistent_id === draggedObject.parent_id
				);
				// let group = props.requirementStore.groupData.find(
				// 	obj => obj.persistent_id === req.parent_id
				// );

				// console.log(array)
				// let index = group.findIndex(
				// 	item => item.persistent_id === draggedObject.parent_id
				// );

				// if (index > 0) {
				// console.log(index)
				console.log("found a detail. moving to requirement");
				// let target = array[index - 1];
				moveTo(
					props.requirementStore,
					draggedObject,
					req.parent_id,
					monitor
				);
				draggedObject.basicType = "requirement";
				// }
			}
			return;
		}

		if (draggedObject.persistent_id !== overObject.persistent_id) {
			// console.log({
			// 	dragged: draggedObject.name,
			// 	over: overObject.name
			// })
			if (overObject.parent_id === draggedObject.parent_id) {
				console.log("same parent");
				reorder(props.requirementStore, draggedObject, overObject);
			} else {
				console.log("diff parent");
				moveTo(
					props.requirementStore,
					draggedObject,
					overObject.parent_id,
					monitor
				);
			}
		}

		// if (!draggedObject) return;
		// if (draggedObject.persistent_id !== overObject.persistent_id) {

		// 	if ((monitor.getInitialClientOffset().x + 50) < monitor.getClientOffset().x) {
		// 		if (draggedObject.children.length === 0) {
		// 			const groupArray = props.requirementStore.groupData.find(obj => obj.persistent_id === draggedObject.parent_id).children;
		// 			const draggedIndex = groupArray.findIndex(obj => obj.persistent_id === draggedObject.persistent_id);
		// 			if (draggedIndex > 0) {
		// 				// get the above requirement so we can place this one as a child of it.
		// 				draggedObject.parent_id = groupArray[draggedIndex - 1].persistent_id;
		// 				groupArray.splice(groupArray.findIndex(obj => obj.persistent_id === draggedObject.persistent_id),1);
		// 				groupArray[draggedIndex - 1].children.push(draggedObject);
		// 				removeItemFromArray(props.requirementStore.requirementData, draggedObject.persistent_id);
		// 				props.requirementStore.detailData.push(draggedObject);
		// 				draggedObject.basicType = 'detail';
		// 			}
		// 		}
		// 		return;
		// 	}

		// 	// Determine rectangle on screen
		// 	// const hoverBoundingRect = component.getDecoratedComponentInstance().requirementRef.getBoundingClientRect();
		// 	// Get vertical middle
		// 	// const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
		// 	// Determine mouse position
		// 	// const clientOffset = monitor.getClientOffset();
		// 	// Get pixels to the top
		// 	// const hoverClientY = clientOffset.y - hoverBoundingRect.top;
		// 	// console.log(props.uiStore.hoveredDropTarget)
		// 	// Maybe do something here about the 50% above/below
		// 	if (overObject.parent_id === draggedObject.parent_id) {
		// 		const reqArray = props.requirementStore.groupData.find(obj => obj.persistent_id === overObject.parent_id).children
		// 		const draggedIndex = reqArray.findIndex(obj => obj.persistent_id === draggedObject.persistent_id)
		// 		const overIndex = reqArray.findIndex(obj => obj.persistent_id === overObject.persistent_id)
		// 		reqArray.splice(overIndex, 0, reqArray.splice(draggedIndex, 1)[0])
		// 	}
		// 	else if (overObject.basicType !== draggedObject.basicType) {
		// 		// Demoting a detail
		// 		const oldGroupArray = props.requirementStore.requirementData.find(obj => obj.persistent_id === draggedObject.parent_id).children;

		// 		// Set where the new monitored item is temp stored
		// 		monitor.getItem().draggedObject.parent_id = overObject.parent_id;

		// 		oldGroupArray.splice(oldGroupArray.findIndex(obj => obj.persistent_id === draggedObject.persistent_id),1);
		// 		const newGroupArray = props.requirementStore.groupData.find(obj => obj.persistent_id === overObject.parent_id).children;
		// 		draggedObject.parent_id = overObject.parent_id;
		// 		draggedObject.basicType = 'requirement';
		// 		props.requirementStore.requirementData.push(draggedObject);
		// 		newGroupArray.push(draggedObject);

		// 	}
		// 	else {

		// 		const oldGroupArray = props.requirementStore.groupData.find(obj => obj.persistent_id === draggedObject.parent_id).children;

		// 		// Set where the new monitored item is temp stored
		// 		monitor.getItem().draggedObject.parent_id = overObject.parent_id;

		// 		oldGroupArray.splice(oldGroupArray.findIndex(obj => obj.persistent_id === draggedObject.persistent_id),1);
		// 		const newGroupArray = props.requirementStore.groupData.find(obj => obj.persistent_id === overObject.parent_id).children;
		// 		draggedObject.parent_id = overObject.parent_id;
		// 		newGroupArray.push(draggedObject);
		// 	}

		// }
	}
};

export { requirementTarget, requirementSource };
