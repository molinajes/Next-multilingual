import React, { Component, PropTypes } from 'react';

import ComponentSelector from '../Component/ComponentSelector';
import StepText from './StepText';
import StepResult from './StepResult';
import StepActor from './StepActor';
import IconPositioned from '../Iconic/IconPositioned';
import DeleteObject from '../Delete/DeleteObject';

import recalculateStepNumbers from '../../utils/recalculateStepNumbers';

import {observer, inject} from 'mobx-react';

import { DropTarget, DragSource } from 'react-dnd';


const stepSource = {
	beginDrag(props) {
		
		return {
			draggedObject: props.stepData,
		}
	},
	isDragging(props, monitor) {
		return props.stepData.persistent_id === monitor.getItem().draggedObject.persistent_id;
	},
	endDrag(props, monitor) {
		const draggedObject = monitor.getItem().draggedObject;
		//  const originalIndex = monitor.getItem().originalIndex;  
		const originalParent = monitor.getItem().originalParent;
		const didDrop = monitor.didDrop();
		if (didDrop) {
			const checkParentsChanged = originalParent !== draggedObject.parent_id;
			window.dropOutput = window.toJS(recalculateStepNumbers(props.flowStore, draggedObject.persistent_id, checkParentsChanged));
			props.stepStore.reorderSteps(recalculateStepNumbers(props.flowStore, draggedObject.persistent_id, checkParentsChanged));
		}
		else {
			console.log('didnt drop')
		}
	}

}
const stepTarget = {

	hover(props, monitor) {
		const draggedObject = monitor.getItem().draggedObject;
		const overObject = props.stepData;
		if (!draggedObject) return;
		if (draggedObject.persistent_id !== overObject.persistent_id) {
			if (overObject.parent_id === draggedObject.parent_id) {
				const stepArray = props.flowStore.flowData.find(obj => obj.persistent_id === draggedObject.parent_id).children;
				const draggedIndex = stepArray.findIndex(obj => obj.persistent_id === draggedObject.persistent_id)
				const overIndex = stepArray.findIndex(obj => obj.persistent_id === overObject.persistent_id)
				stepArray.splice(overIndex, 0, stepArray.splice(draggedIndex, 1)[0]);
			}
			else {
				const previousFlowArray = props.flowStore.flowData.find(obj => obj.persistent_id === draggedObject.parent_id).children;
				// Set where the new monitored item is temp stored
				monitor.getItem().draggedObject.parent_id = overObject.parent_id;
				previousFlowArray.splice(previousFlowArray.findIndex(obj => obj.persistent_id === draggedObject.persistent_id),1);
				const newFlowArray = props.flowStore.flowData.find(obj => obj.persistent_id === overObject.parent_id).children;
				draggedObject.parent_id = overObject.parent_id;
				newFlowArray.push(draggedObject);
			}
		}
	}
}


@inject("uiStore", 'stepStore', 'flowStore')
@DropTarget('step', stepTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))
@DragSource('step', stepSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))
@observer
class Step extends Component {
	static propTypes = {
		useCaseId: PropTypes.string.isRequired,
		stepData: PropTypes.object.isRequired,
		stepStore: PropTypes.object.isRequired,
		flowStore: PropTypes.object.isRequired,
		connectDragSource: PropTypes.func.isRequired,
		connectDragPreview: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		isOver: PropTypes.bool.isRequired,
	}

	handleDelete = () => {
		const {stepStore, stepData} = this.props;
		stepStore.deleteStep(stepData);
	}

	handleFork = () => {
		const {stepData, useCaseId, flowStore} = this.props;

		flowStore.createFlow('Alternative Flow', useCaseId, stepData.number,"-1")
	}

	render() {
		const {
			stepData,
			connectDragSource,
			connectDragPreview,
			connectDropTarget,
			isDragging
		} = this.props;

		let opacity = isDragging ? '0' : '1';		
		opacity = stepData.loading ? 0.5 : opacity;

		return connectDragPreview(connectDropTarget(
			<div className="step" style={{opacity}}>
				
				<div className="step__detailContainer">
				{connectDragSource(
					<div className="step__number">
						{stepData.number}
					</div>
				)}
					<IconPositioned iconSize="40" iconicType={'person-genderless-sm'}  />
					<div className="step__actor">
						<StepActor stepData={stepData} />
					</div>
					<div className="step__components">
						<ComponentSelector 
							componentType='iface' 
							parentType='step' 
							parentData={stepData} 
							parentLoading={stepData.loading} />
						<ComponentSelector 
							componentType='rule' 
							parentType='step' 
							parentData={stepData} 
							parentLoading={stepData.loading} />
						<ComponentSelector 
							componentType='form' 
							parentType='step' 
							parentData={stepData} 
							parentLoading={stepData.loading} />
						<ComponentSelector 
							componentType='object' 
							parentType='step' 
							parentData={stepData} 
							parentLoading={stepData.loading} />
					</div>
				</div>
					<div className="step__activity">
						<IconPositioned 
						iconSize="40" 
						iconicType={'fork-sm'} 
						iconHoverColor='yellow' 
						onClick={this.handleFork} />

						<StepText stepData={stepData} disabled={stepData.loading} />
					</div>

					<div className="step__activity">
						<DeleteObject data={stepData} onDelete={this.handleDelete}/>

						<StepResult stepData={stepData} disabled={stepData.loading} />
					</div>

				{/*
				<ComponentSelector componentType='iface' parentType='steps' parentData={stepData} traceData={traceData.iface}/>
				<ComponentSelector componentType='rule' parentType='steps' parentData={stepData} traceData={traceData.rule}/>
				<ComponentSelector componentType='form' parentType='steps' parentData={stepData} traceData={traceData.form}/>
				*/}

			</div>
		));
	}
}

export default Step;
