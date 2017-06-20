import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

// import UseCaseActorList from './UseCaseActorList';
import IconPositioned from '../Iconic/IconPositioned';
import RequirementsDropdown from '../Requirement/RequirementsDropdown';
import StepPreview from '../Steps/StepPreview';

import UseCaseTitle from './UseCaseTitle';
// import TextAreaField from '../Editable/TextAreaField';

import Tooltip  from 'rc-tooltip';

import recalculateUseCaseNumbers from '../../utils/recalculateUseCaseNumbers';
import getIconicName from '../../utils/getIconicName';

import { DropTarget, DragSource } from 'react-dnd';


const useCaseSource = {
	beginDrag(props) {
		// original index stuff
	
		const parentId = props.useCaseData.parent_id;
		return {
			draggedObject: props.useCaseData,
			originalParent: parentId
		}
	},
	isDragging(props, monitor) {
		return props.useCaseData.persistent_id === monitor.getItem().draggedObject.persistent_id;
	},
	endDrag(props, monitor) {
		const draggedObject = monitor.getItem().draggedObject;
		//  const originalIndex = monitor.getItem().originalIndex;  
		const originalParent = monitor.getItem().originalParent;
		const didDrop = monitor.didDrop();
		if (didDrop) {
			const checkParentsChanged = originalParent !== draggedObject.parent_id;
			window.dropOutput = window.toJS(recalculateUseCaseNumbers(props.packageStore, draggedObject.persistent_id, checkParentsChanged));
			props.useCaseStore.reorderUseCases(recalculateUseCaseNumbers(props.packageStore, draggedObject.persistent_id, checkParentsChanged));
		}
		else {
			// console.log('didnt drop')
		}
	}

}
const useCaseTarget = {
	drop(props) {
		return { id: props.useCaseData.id}
	},
	hover(props, monitor) {
		const draggedObject = monitor.getItem().draggedObject;
		const overObject = props.useCaseData;
		if (!draggedObject) return;
		if (draggedObject.persistent_id !== overObject.persistent_id) {
			if (overObject.parent_id === draggedObject.parent_id) {
				const useCaseArray = props.packageStore.packageData.find(obj => obj.persistent_id === draggedObject.parent_id).children;
				const draggedIndex = useCaseArray.findIndex(obj => obj.persistent_id === draggedObject.persistent_id)
				const overIndex = useCaseArray.findIndex(obj => obj.persistent_id === overObject.persistent_id)
				useCaseArray.splice(overIndex, 0, useCaseArray.splice(draggedIndex, 1)[0]);
			}
			else {
				const previousPackageArray = props.packageStore.packageData.find(obj => obj.persistent_id === draggedObject.parent_id).children;
				// Set where the new monitored item is temp stored
				monitor.getItem().draggedObject.parent_id = overObject.parent_id;
				previousPackageArray.splice(previousPackageArray.findIndex(obj => obj.persistent_id === draggedObject.persistent_id),1);
				const newPackageArray = props.packageStore.packageData.find(obj => obj.persistent_id === overObject.parent_id).children;
				draggedObject.parent_id = overObject.parent_id;
				newPackageArray.push(draggedObject);
			}
		}
	}
}

@inject('useCaseStore','packageStore', 'actorStore', 'uiStore', 'traceStore')
@DropTarget(['useCase','requirementListItem'], useCaseTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))
@DragSource('useCase', useCaseSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))
@observer
class UseCase extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired,
		traceStore: PropTypes.object.isRequired,
		useCaseStore: PropTypes.object.isRequired,
		packageStore: PropTypes.object.isRequired,
		actorStore: PropTypes.object.isRequired,
		useCaseData: PropTypes.object.isRequired,
		packageNumber: PropTypes.string.isRequired,
		connectDragSource: PropTypes.func.isRequired,
		connectDragPreview: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		isOver: PropTypes.bool.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			dropdownActive: false
		}
	}

	handleSubmitName = (value) => {
		const {useCaseStore, useCaseData} = this.props;
		useCaseStore.editUseCase(useCaseData.persistent_id, 'name', value)
	}

	handleSubmitDescription = (value) => {
		const {useCaseStore, useCaseData} = this.props;
		useCaseStore.editUseCase(useCaseData.persistent_id, 'text', value)
	}

	handleClickRequirements = () => {
		this.setState({
			dropdownActive: true
		})
	}

	handleClickOutsideDropdown = () => {
		this.setState({
			dropdownActive: false
		})
	}

	handleClickExpand = () => {
		const {useCaseData} = this.props;
		useCaseData.setExpanded(!useCaseData.expanded);
	}

	handleClickStepEditor = () => {
		const {uiStore, useCaseData} = this.props;
		if (!useCaseData.loading) {
			uiStore.setBottomBarDetails('useCase', useCaseData.persistent_id);
		}
	}

	render() {
		const {
			// actorStore,
			traceStore,
			useCaseData, 
			connectDragPreview,
			connectDragSource,
			connectDropTarget, 
			isOver,
			isDragging,
			packageNumber,
			uiStore
		} = this.props;

		let opacity = isDragging ? 0 : 1;
		opacity = useCaseData.loading ? 0.5 : opacity;

		let actorsIds = []

		let numberOfSteps = 0;
		useCaseData.children.forEach(flow => {
			flow.children.forEach(step => {
				numberOfSteps++;
				const actorId = step.related1_id;
				if (actorsIds.findIndex(actor => actor === actorId) === -1 ) {
					actorsIds.push(actorId);
				}
			})
		})

		/*let actorList = actorsIds.map(actorId => {
			return actorStore.actorData.find(actor => actor.persistent_id === actorId);
		})*/

		const linked = traceStore.traceData.filter(trace => {
			return trace.type === '10' && trace.related1_id === useCaseData.persistent_id;
		})

		let flows = useCaseData.children.map(flow => {
			let steps = flow.children.map(step => {
				return (
					<StepPreview data={step} useCaseId={useCaseData.persistent_id} key={step.persistent_id}/>
				)
			})
			return (
				<div className="useCase__flow" key={flow.persistent_id}>
					<div className="useCase__flowName">{flow.name}</div>
					{steps.length > 0 ? steps : (
						<div className="useCase__flowName" style={{opacity: 0.5}}>No Steps</div>
					)}
				</div>
			)
		})

		return (
			connectDropTarget(connectDragPreview(
				<div className="useCase" ref={(pill) => this.pillRef = pill} style={{opacity}}>				
					<div 
						className="useCase__pill" 
						style={{backgroundColor: (isOver || (uiStore.activeUseCase === useCaseData.persistent_id)) ? '#FFE7D3' : '', justifyContent: 'space-between'}}>
						
						<div className="useCase__titleInformation">
							{connectDragSource(
								<div >
									<IconPositioned iconSize="40" iconicType={'fire-sm'} iconHoverColor='orange' onClick={this.handleClickExpand}>
										<div className="useCase__expandIcon">
											
											<IconPositioned iconSize="24" iconicType={'fullscreen-enter-sm'} />
										</div>
									</IconPositioned>
								</div>
							)}
							<p className="useCase__number">UC&nbsp;-&nbsp;{packageNumber}.{useCaseData.number}</p>
							<UseCaseTitle useCaseData={useCaseData} />
						</div>
						<div className="useCase__descriptionButtons">
							<div className="useCase__description" onClick={this.handleClickRequirements}>
								Link to Requirements
								<IconPositioned iconSize="40" iconicType={'link-intact-sm'} iconHoverColor='yellow' >
									<div className="reqDropdown__count" style={{position: 'absolute', bottom: '0', right: '0', marginLeft: 'auto'}}>
										{linked.length}
									</div>
								</IconPositioned>
								{(this.state.dropdownActive && !useCaseData.loading) && 
									<RequirementsDropdown 
										useCaseData={useCaseData} 
										onClickOutSide={this.handleClickOutsideDropdown}
										linkedTraces={linked}/>}
							</div>

							<div className="useCase__buttons" onClick={this.handleClickStepEditor}>
								Add Steps
								<Tooltip placement="left" 
									trigger={['hover']} 
									overlay={'Click to Edit Steps for this Use Case'} 
									mouseEnterDelay={0.5}
									destroyTooltipOnHide={true}
									> 
									<IconPositioned iconSize="40" iconicType={getIconicName('step')} iconHoverColor='yellow' >
										<div className="reqDropdown__count" style={{position: 'absolute', bottom: '0', right: '0', marginLeft: 'auto'}}>
											
											{numberOfSteps}
										</div>
									</IconPositioned>
								</Tooltip>
							</div>
						</div>
						
					</div>
					{useCaseData.expanded && flows}
				</div>
			))
		)
	}
}

export default UseCase;



/*
<div className="useCase" ref={(pill) => this.pillRef = pill}>
	
	{connectDropTarget(connectDragSource(connectDragPreview(
		<div 
			className="useCase__pill" 
			style={{opacity, backgroundColor: (isOver || (uiStore.activeUseCase === useCaseData.persistent_id)) ? '#FFE7D3' : '', justifyContent: 'space-between'}}>
			
			<div className="useCase__titleInformation">
				<IconPositioned iconSize="40" iconicType={'fire-sm'} iconHoverColor='orange' />

				<UseCaseTitle useCaseData={useCaseData} />
				<p className="useCase__number">UC{useCaseData.number}</p>
			</div>
			<div className="useCase__descriptionButtons">
				<div className="useCase__description">
					<TextAreaField
						divClass="useCase__descriptionDiv"
						formClass="textAreaField__form"
						label="Description"
						value={useCaseData.text}
						onSubmit={this.handleSubmitDescription}/>
				</div>
				<div className="useCase__buttons">
					<IconPositioned iconSize="40" iconicType={'link-intact-sm'} iconHoverColor='yellow' onClick={this.handleClickRequirements}>
						<div className="reqDropdown__count" style={{position: 'absolute', bottom: '0', right: '0', marginLeft: 'auto'}}>
							{linked.length}
						</div>
					</IconPositioned>
					{this.state.dropdownActive && <RequirementsDropdown 
														useCaseData={useCaseData} 
														onClickOutSide={this.handleClickOutsideDropdown}
														linkedTraces={linked}/>}
					<Tooltip placement="left" 
						trigger={['hover']} 
						overlay={'Actors used in this Use Case'} 
						mouseEnterDelay={0.5}
						destroyTooltipOnHide={true}
						> 
						<IconPositioned iconSize="40" iconicType={'person-genderless-sm'} iconHoverColor='yellow' onClick={this.handleClickStepEditor}>
							<div className="reqDropdown__count" style={{position: 'absolute', bottom: '0', right: '0', marginLeft: 'auto'}}>
								{actorsIds.length}
							</div>
						</IconPositioned>
					</Tooltip>
					<Tooltip placement="left" 
						trigger={['hover']} 
						overlay={'Click to Edit Steps for this Use Case'} 
						mouseEnterDelay={0.5}
						destroyTooltipOnHide={true}
						> 
						<IconPositioned iconSize="40" iconicType={'signpost-sm'} iconHoverColor='yellow' onClick={this.handleClickStepEditor}>
							<div className="reqDropdown__count" style={{position: 'absolute', bottom: '0', right: '0', marginLeft: 'auto'}}>
								
								{numberOfSteps}
							</div>
						</IconPositioned>
					</Tooltip>
				</div>
			</div>
		</div>

	)))}

</div>

*/
