import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import IconPositioned from '../Iconic/IconPositioned';
import { DropTarget } from 'react-dnd';

import InputFieldSubmit from '../Editable/InputField_Submit';

import getIconicName from '../../utils/getIconicName';

const useCaseTarget = {

	hover(props, monitor) {
		const draggedObject = monitor.getItem().draggedObject;
		const overPackageId = props.packageId;
		if (!draggedObject) return;
		if (draggedObject.parent_id !== overPackageId) {
			//Add the dragged usecase to this packages list
			const previousPackageArray = props.packageStore.packageData.find(obj => obj.persistent_id === draggedObject.parent_id).children;
			// Set where the new monitored item is temp stored
			monitor.getItem().draggedObject.parent_id = overPackageId;
			previousPackageArray.splice(previousPackageArray.findIndex(obj => obj.persistent_id === draggedObject.persistent_id),1);
			const newPackageArray = props.packageStore.packageData.find(obj => obj.persistent_id === overPackageId).useCases;
			draggedObject.parent_id = overPackageId;
			newPackageArray.push(draggedObject);
		}
	}
}

@inject('packageStore', 'uiStore','useCaseStore', 'flowStore', 'stepStore', 'actorStore')
@DropTarget(['useCase'], useCaseTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))
@observer
class CreateUseCase extends Component {
	static propTypes = {
		useCaseNumber: PropTypes.number.isRequired,
		uiStore: PropTypes.object.isRequired,
		packageStore: PropTypes.object.isRequired,
		flowStore: PropTypes.object.isRequired,
		stepStore: PropTypes.object.isRequired,
		actorStore: PropTypes.object.isRequired,
		useCaseStore: PropTypes.object.isRequired,
		packageId: PropTypes.string.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
	}

	onSubmit = (value) => {
		const {flowStore, stepStore, actorStore} = this.props;
		// e.preventDefault();
		const {packageId, useCaseStore, useCaseNumber} = this.props;
		useCaseStore.createUseCase(value, packageId, useCaseNumber, actorStore.actorData[0].persistent_id)
		.then(response => {
			console.log({response})
			flowStore.loadFlow(response[1].content);
			stepStore.loadStep(response[2].content);
		})
		.catch(() => {}) // This has been handled at lower levels.  Just ensures flows and steps aren't created. JH
		
		// uiStore.updateCreateUseCase('');
	}

	onChange = (e) => {
		const {packageId, uiStore} = this.props;
		uiStore.updateCreateUseCase(e.target.value, packageId);
	}

	render() {
		const {connectDropTarget} = this.props;
		return connectDropTarget(
			<div className="useCase" style={{opacity: 0.54}} onClick={this.onClick} ref={(pill) => this.pillRef = pill}>				
				<div className="useCase__pill">
					{/*<form onSubmit={this.onSubmit}>
						<input type="text" 
							placeholder={'Create a New Use Case'}
							onChange={this.onChange}
							value={(uiStore.createUseCase.packageId === packageId) ? uiStore.createUseCase.name : ''}/>
					</form>*/}
					<div className="useCase__titleInformation">
						<IconPositioned iconSize="40" iconicType={getIconicName('add')} iconHoverColor='orange' />
						<p className="useCase__number">UC&nbsp;-&nbsp;#</p>
						<InputFieldSubmit
							value={''}
							placeholder="Create a Use Case"
							onSubmit={this.onSubmit}
							inputClass={"inputClass"}
							formClass={"formClass"}
							divClass={"useCase__nameInput"}
							/>
					</div>
					<div className="useCase__descriptionButtons">
						<div className="useCase__description">
							
						</div>
						<div className="useCase__buttons">
							
							
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default CreateUseCase;
