import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import Requirement from '../Requirement/Requirement';
import CreateRequirement from '../Requirement/CreateRequirement';
import IconPositioned from '../Iconic/IconPositioned';
import InputField from '../Editable/InputField_Auto';

import DeleteObject from '../Delete/DeleteObject';

// import levelDetailsFromNumber from '../../utils/levelDetailsFromNumber';

import {observer, inject} from 'mobx-react';

/*const groupSource = {
	beginDrag(props) {
		return {
			persistent_id: props.groupData.persistent_id,
		}
	},
	/*endDrag(props) {

	}*/
// }*/

const groupTarget = {
	hover(props, monitor) {

		if (monitor.getItemType() === 'requirement') {  // Note this is the drag type, so details also enter here
			const draggedObject = monitor.getItem().draggedObject;
			const overObject = props.groupData;

			if (!draggedObject) return;
			if (draggedObject.persistent_id !== overObject.persistent_id) {

				if (draggedObject.type === 'requirement') {
					// Adding a requirement into this group
					const oldGroupArray = props.requirementStore.groupData.find(obj => obj.persistent_id === draggedObject.parent_id).children;

					// Set where the new monitored item is temp stored
					monitor.getItem().draggedObject.parent_id = overObject.persistent_id;

					oldGroupArray.splice(oldGroupArray.findIndex(obj => obj.persistent_id === draggedObject.persistent_id),1);
					const newGroupArray = overObject.children;
					draggedObject.parent_id = overObject.persistent_id;
					draggedObject.type = 'requirement';
					props.requirementStore.requirementData.push(draggedObject);
					newGroupArray.push(draggedObject);
				}
				if (draggedObject.type === 'detail') {
					// Demoting a detail into this group
					const oldGroupArray = props.requirementStore.requirementData.find(obj => obj.persistent_id === draggedObject.parent_id).children;

					// Set where the new monitored item is temp stored
					monitor.getItem().draggedObject.parent_id = overObject.persistent_id;

					oldGroupArray.splice(oldGroupArray.findIndex(obj => obj.persistent_id === draggedObject.persistent_id),1);
					const newGroupArray = overObject.children;
					draggedObject.parent_id = overObject.persistent_id;
					draggedObject.type = 'requirement';
					props.requirementStore.requirementData.push(draggedObject);
					newGroupArray.push(draggedObject);
				}

			}
		}
		if (monitor.getItemType() === 'group') {
			console.log('being dragged is group')
		}
		

			
		
	}
}


@inject('requirementStore','uiStore')
@DropTarget(['group','requirement'], groupTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))
/*@DragSource('group', groupSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))*/
@observer
class Group extends Component {
	static propTypes = {
		groupData: PropTypes.object.isRequired,
		firstChild: PropTypes.bool.isRequired,
		uiStore: PropTypes.object.isRequired,
		requirementStore: PropTypes.object.isRequired,
		// connectDragSource: PropTypes.func.isRequired,
		// connectDragPreview: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		// isDragging: PropTypes.bool.isRequired,
		isOver: PropTypes.bool.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			expanded: true
		}
	}

	onSubmit = (value) => {
		// e.preventDefault();
		const {requirementStore, groupData} = this.props;
		requirementStore.updateBasic(groupData.persistent_id, 'group', value, 'name');
		// uiStore.updateEditBasicName('','');
	}


	onClickTitle = () => {
		const {uiStore, groupData} = this.props;
		uiStore.updateEditBasicName(groupData.persistent_id,groupData.name);
		// this.textInput.focus();
	}

	handleToggleExpanded = () => {
		const {groupData} = this.props;
		groupData.setExpanded(!groupData.expanded);
	}

	handleClickDelete = () => {
		const {requirementStore, groupData} = this.props;
		requirementStore.deleteModule(groupData.persistent_id);
	}

	render() {
		const {groupData, uiStore, connectDropTarget, firstChild} = this.props;
		
		const requirements = groupData.children.filter((req) => {
			return req.name.toLowerCase().indexOf(uiStore.requirementSearchInput.toLowerCase()) !== -1;
		}).map((req, index) => {
			return <Requirement requirementData={req} key={req.persistent_id} firstChild={firstChild && (index === 0)} />
		})

		let numberRequirements, numberDetails;
		if (!groupData.expanded) {
			numberRequirements = groupData.children.length;
			numberDetails = groupData.children.reduce((total, req) => {
				return total + req.children.length;
			}, 0)
		}


		return (
			// connectDragPreview(
			<div className="group__container" style={{opacity: groupData.loading ? 0.5 : ''}}>				
				{connectDropTarget(
					<div className="group__banner ">
						<div onClick={this.handleToggleExpanded}>
							<IconPositioned 
								className="group__icon"
								iconSize={'40'} 
								iconicType={'grid-four-up-sm'} />
						</div>
						<InputField 
								value={groupData.name}
								onSubmit={this.onSubmit}
								placeholder={"Create a new module"}
								inputClass={"inputClass"}
								formClass={"formClass"}
								// onChange={this.onChange}
								divClass={"group__nameInput"} />

						<DeleteObject data={groupData} onDelete={this.handleClickDelete}/>
					</div>
				)}
				{groupData.expanded ? (
					<div className="group__content">
						{requirements}
						<CreateRequirement 
							groupId={groupData.persistent_id} 
							number={requirements.length + 1}
							disabled={groupData.loading}
						/>
					</div>
				) : (
					<div className="group__content--hidden">
						{numberRequirements} Requirement{numberRequirements !== 1 ? 's' : ''}. 
						{numberDetails} Detail{numberDetails !== 1 ? 's' : ''}.
					</div>
				)
				}
			</div>
		);
	}
}

export default Group;
