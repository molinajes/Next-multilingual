import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';

import IconPositioned from '../../Iconic/IconPositioned';

import getItemFromArray from '../../../utils/getItemFromArray';

@inject('useCaseStore', 'stepObjectStore', 'stepStore', 'useCaseStore', 'flowStore')
@observer
class LinkedUsage extends Component {

	static propTypes = {
		componentData: PropTypes.object.isRequired,
		stepObjectStore: PropTypes.object.isRequired,
		stepStore: PropTypes.object.isRequired,
		flowStore: PropTypes.object.isRequired,
		useCaseStore: PropTypes.object.isRequired
	}

	render() {

		const { componentData, stepObjectStore, stepStore, useCaseStore, flowStore} = this.props;

		let useCaseIds = [];
		
		const stepObjects = stepObjectStore.stepObjectData.filter(stepObject => {
			return stepObject.related1_id === componentData.persistent_id && stepObject.type === componentData.object;
		});

		stepStore.stepData.forEach(step => {
			if (stepObjects.some(stepObject => {
				return stepObject.parent_id === step.persistent_id
			})) {
				const flowId = step.parent_id;
				const currentFlow = getItemFromArray(flowStore.flowData, flowId);
				if (currentFlow) {

					if (useCaseIds.indexOf(currentFlow.parent_id) === -1) {
						useCaseIds.push(currentFlow.parent_id);
					}					
				}
			}
				
		})
		let useCaseOutput = useCaseIds.map(useCaseId => {
			return getItemFromArray(useCaseStore.useCaseData, useCaseId);
		}).map(useCase => {
			return (
				<div className={"linkedUsage__item"} key={useCase.id}>
					<IconPositioned iconSize="32" iconicType={'fire-sm'}  iconHoverColor='mango' />
					<div className={"linkedUsage__itemName"}>
						{useCase.name}							
					</div>
				</div>
			)
		})

		return ( 
			<div className="linkedUsage__container">
				<div className="linkedUsage__title">
					<IconPositioned 
					iconSize='40' 
					iconicType='fire-sm'  />
					Component Usage
				</div>
				<div className="linkedUsage__content">
					{/*<div className={"linkedUsage__item"}>						
						<IconSwitch 
						iconSize='32' 
						iconicType='fire-sm'
						iconicHoverType='external-link-sm' />
						<div className="linkedUsage__itemName">
							Go to use cases							
						</div>
					</div>*/}
					{useCaseOutput}
				</div>
			</div>
		);
	}
}

export default LinkedUsage;
