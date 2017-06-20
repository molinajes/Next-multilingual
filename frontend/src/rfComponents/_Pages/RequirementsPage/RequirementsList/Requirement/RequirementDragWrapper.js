import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import { DragSource, DropTarget } from "react-dnd";
import {
	requirementTarget,
	requirementSource
} from "../../../../../utils/dragLogic/requirementDragLogic";

import Requirement from './Requirement';

@inject('requirementStore')
@DropTarget("requirement", requirementTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver()
}))
@DragSource("requirement", requirementSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	connectDragPreview: connect.dragPreview(),
	isDragging: monitor.isDragging()
}))
@observer
class RequirementDragWrapper extends Component {
	static propTypes = {
		requirementStore: PropTypes.object.isRequired
	}

	render() {
		const {
			...other
		} = this.props;
		return (
			<Requirement {...other} />
		);
	}
}

export default RequirementDragWrapper;
