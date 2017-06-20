import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';
import { DragSource, DropTarget } from 'react-dnd';

import recalculateBasicNumbers from '../../utils/recalculateBasicNumbers';
import getIconicName from '../../utils/getIconicName';
import IconPositioned from '../Iconic/IconPositioned';

// TODO: Reseting all Drag Errors.... | JH
const moduleSource = {
	beginDrag(props) {
		return {
			draggedObject: props.groupData,
			// originalIndex: originalIndex,
			// originalParent: parent_id
		}
	},
	isDragging(props, monitor) {
		return props.groupData.persistent_id === monitor.getItem().draggedObject.persistent_id
	},
	endDrag(props, monitor) {
		const draggedObject = monitor.getItem().draggedObject;
		//  const originalIndex = monitor.getItem().originalIndex;  
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

const moduleTarget = {
	hover(props, monitor) {
		const draggedObject = monitor.getItem().draggedObject;
		const overObject = props.groupData;

		if (!draggedObject) return;
		if (draggedObject.persistent_id !== overObject.persistent_id) {
			const groupData = props.requirementStore.groupData;
			const draggedIndex = groupData.findIndex(obj => obj.persistent_id === draggedObject.persistent_id)
			const overIndex = groupData.findIndex(obj => obj.persistent_id === overObject.persistent_id)
			groupData.splice(overIndex, 0, groupData.splice(draggedIndex, 1)[0])
		}
	}
}

@inject('requirementStore','uiStore')
@DropTarget('module', moduleTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))
@DragSource('module', moduleSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
}))
@observer
class ModuleTitle extends Component {
	static propTypes = {
		firstChild: PropTypes.bool.isRequired,
		groupData: PropTypes.object.isRequired,
		requirementStore: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired,
		connectDragSource: PropTypes.func.isRequired,
		connectDragPreview: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		isOver: PropTypes.bool.isRequired
	}

	handleToggleExpanded = () => {
		const {groupData} = this.props;
		groupData.setExpanded(!groupData.expanded);
	}

	render() {
		const {
			// firstChild,
			groupData, 
			connectDragPreview, 
			connectDragSource, 
			connectDropTarget, 
			isDragging
		} = this.props;

		

		const opacity = isDragging ? '0' : '1';

		const numRequirements = groupData.children.length;
		const numDetails = groupData.children.reduce((total, req) => {
			return total + req.children.length;
		}, 0)

		return connectDragPreview(
			<div className="moduleTitle__tile" style={{opacity}}>
				{connectDragSource(connectDropTarget(
					<div onClick={this.handleToggleExpanded}>
					<IconPositioned 
						className="moduleTitle__icon"
						iconSize='40'
						iconicType='grid-four-up-sm' />
						</div>
				))}
				<div className="moduleTitle__name">
					{groupData.name}
				</div>
				<div className="moduleTitle__size">
					<IconPositioned 
						iconSize='24'
						iconicType={getIconicName('requirement')} />
					<span className="pageNav__contentStat">{numRequirements} </span>
					<IconPositioned 
						iconSize='24'
						iconicType={getIconicName('detail')} />
					<span className="pageNav__contentStat">{numDetails} </span>
				</div> {/* TODO: This is the relative weighting of links in this module compared to the total | AjH */}
			</div>
		);
	}
}

export default ModuleTitle;
