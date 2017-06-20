import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import { DragSource } from 'react-dnd';
import IconicIcon from '../Iconic/IconicIcon';

const requirementSource = {
	beginDrag(props) {
		// console.log("Began a drag on a req list item");
		return {id: props.data.id}
	},
	endDrag(props, monitor) {
		// console.log("Ended drag",component);
		if(monitor.didDrop()) {
			let dragResult = monitor.getDropResult();
			console.log("Will create a link between RequirementId:", props.data.id, "and UseCaseId:", dragResult.id)
		}
	}
}

@inject('requirementStore')
@DragSource('requirementListItem', requirementSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
@observer
class RequirementsListItem extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		connectDragSource: PropTypes.func.isRequired
	}

	render() {
		const {connectDragSource, data} = this.props;
		return (
			connectDragSource(
				<div className='requirementList__item' style={{marginLeft: "1.5rem"}}>
					<IconicIcon dataSrc={'screenshot-sm'} iconClass={'requirementList__item__icon'} />
					{data.name}
				</div>
			)
		);
	}
}

export default RequirementsListItem;
