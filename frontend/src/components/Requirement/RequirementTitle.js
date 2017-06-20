import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import { DropTarget } from 'react-dnd';

import InputField_Auto from '../Editable/InputField_Auto';
import removeItemFromArray from '../../utils/removeItemFromArray';

const requirementTarget = {
	canDrop() {
		return true;
	},
	hover(props, monitor) {
		const draggedObject = monitor.getItem().draggedObject;
		const overObject = props.requirementData;

		if (!draggedObject) return;
		if (draggedObject.persistent_id === overObject.parent_id) {
			
			return;
		}
		if (draggedObject.children.length > 0) {
			// can't demote if it has children
			return;
		}
		if (draggedObject.persistent_id === overObject.persistent_id) {
			if (draggedObject.children.length === 0) {
				const groupArray = props.requirementStore.groupData.find(obj => obj.persistent_id === draggedObject.parent_id).children;
				const draggedIndex = groupArray.findIndex(obj => obj.persistent_id === draggedObject.persistent_id);
				if (draggedIndex > 0) {
					// get the above requirement so we can place this one as a child of it.
					draggedObject.parent_id = groupArray[draggedIndex - 1].persistent_id;
					groupArray.splice(groupArray.findIndex(obj => obj.persistent_id === draggedObject.persistent_id),1);
					groupArray[draggedIndex - 1].children.push(draggedObject);
					removeItemFromArray(props.requirementStore.requirementData, draggedObject.persistent_id);
					props.requirementStore.detailData.push(draggedObject);
					draggedObject.basicType = 'detail';
				}
			}
			// TODO: warn why it failed: since req has children | JH
			
		}
		if (draggedObject.persistent_id !== overObject.persistent_id) {
			// Determine rectangle on screen
			// const hoverBoundingRect = component.getDecoratedComponentInstance().requirementRef.getBoundingClientRect();
			// // Get vertical middle
			// const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			// // Determine mouse position
			// const clientOffset = monitor.getClientOffset();
			// // Get pixels to the top
			// const hoverClientY = clientOffset.y - hoverBoundingRect.top;
			// console.log(props.uiStore.hoveredDropTarget)			
			// Maybe do something here about the 50% above/below
			
			if (draggedObject.basicType === 'requirement') {
				console.log('here on hovering title with requirement')
				// Set where the new monitored item is temp stored
				const oldGroupArray = props.requirementStore.groupData.find(obj => obj.persistent_id === draggedObject.parent_id).children;
				monitor.getItem().draggedObject.parent_id = overObject.persistent_id;
				oldGroupArray.splice(oldGroupArray.findIndex(obj => obj.persistent_id === draggedObject.persistent_id),1);
				const newGroupArray = props.requirementStore.requirementData.find(obj => obj.persistent_id === overObject.persistent_id).children;
				draggedObject.parent_id = overObject.persistent_id;
				draggedObject.basicType = 'detail';
				newGroupArray.push(draggedObject);
			}

			
		}
	},
}

@inject('requirementStore')
@DropTarget('requirement', requirementTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@observer
class RequirementTitle extends Component {
	static propTypes = {
		requirementData: PropTypes.object.isRequired,
		requirementStore: PropTypes.object.isRequired,
		connectDropTarget: PropTypes.func.isRequired
	}

	componentDidUpdate = () => {
		if(this.textInput) this.textInput.focus();
	}

	handleSubmit = (value) => {
		const {requirementStore, requirementData} = this.props;
		requirementStore.updateBasic(requirementData.persistent_id, 'requirement', value, 'name');
	}

	render() {
		const {requirementData, connectDropTarget} = this.props;

		return connectDropTarget(
			<div className="requirementTitle__container" >
				<InputField_Auto
					divClass="requirement__nameInput"
					disabled={requirementData.loading}
					placeholder="Requirement Title"
					value={requirementData.name}
					onSubmit={this.handleSubmit}/>
			</div>
		)

	}
}

export default RequirementTitle;
