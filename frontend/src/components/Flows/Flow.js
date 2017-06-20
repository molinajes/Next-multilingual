import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import Step from '../Steps/Step';
import CreateStep from '../Steps/CreateStep';
// import IconPositioned from '../Iconic/IconPositioned';

import DeleteObject from '../Delete/DeleteObject';

@inject('uiStore', 'requirementStore', 'flowStore')
@observer
class Flow extends Component {
	static propTypes = {
		flowData: PropTypes.object.isRequired,
		requirementStore: PropTypes.object.isRequired,
		flowStore: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired
	}

	handleDelete = () => {
		const {flowStore, flowData} = this.props;

		flowStore.deleteFlow(flowData);
		// console.warn("Warning: This did not delete the steps") 
		// TODO: Need to handle deleting steps when deleting flows| JH
	}

	render() {
		const {flowData} = this.props;
		
		let steps = flowData.children.map((step) => {			
			return <Step stepData={step} useCaseId={flowData.parent_id} key={step.persistent_id}/>
		})

		return (
			<div className="flow">
				<div className="flow__title">
					<p>Flow: {flowData.name}</p>
					{flowData.name !== 'Main' && <span>Branches from {flowData.related1_id}</span>}
					{/*<span className="flow__delete" onClick={this.handleDelete}>
						<IconPositioned iconSize="40" iconicType={'trash-sm'}  iconHoverColor='yellow' />
					</span>*/}
					<DeleteObject data={flowData} onDelete={this.handleDelete}/>
				</div>
				{steps}
				<CreateStep flowData={flowData} number={steps.length + 1}/>
			</div>
		);
	}
}

export default Flow;
