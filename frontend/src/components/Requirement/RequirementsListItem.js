import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import { DragSource } from 'react-dnd';
import IconicIcon from '../Iconic/IconicIcon';

import DetailListItem from '../Detail/DetailListItem';

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

		const details = data.details.map(detail => {
			return <DetailListItem data={detail} key={detail.id} />
		})

		return (
			<div>
				{connectDragSource(
					<div className='requirementList__item'>
						<IconicIcon dataSrc={'chat-sm'} iconClass={'requirementList__item__icon'} />
						{data.name}
					</div>
				)}
				{details}
			</div>
		);
	}
}

export default RequirementsListItem;
