import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import Select from 'react-select';

@inject('stepStore', 'actorStore', 'uiStore')
@observer
class StepActor extends Component {
	static propTypes = {
		stepStore: PropTypes.object.isRequired,
		actorStore: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired,
		stepData: PropTypes.object.isRequired
	}

	handleChange = (data) => {		
		const {stepStore, uiStore, actorStore, stepData} = this.props;
		if (data.value === 'newActor') {
			
			uiStore.setBottomBarDetails('actor', actorStore.actorData[0].persistent_id);
		{/* TODO: this is unfinished | JH */}
		}
		else {
			stepStore.updateStep(stepData.persistent_id,data.value, 'related1_id');			
		}
	}

	render() {
		const {stepData, actorStore} = this.props;
		const actorData = actorStore.actorData.find(actor => {
			return actor.persistent_id === stepData.related1_id;
		});

		const options = []
		actorStore.actorData.forEach(actor => {
			options.push({
				value: actor.persistent_id,
				label: actor.name
			})
		})
		options.push({
			value: 'newActor',
			label: 'Create New Actor'
		})
		return (
			<Select
				name="form-actor-select"
				value={actorData ? actorData.persistent_id : null}
				options={options}
				onChange={(e) => this.handleChange(e)}
				clearable={false}
			/>
		)
	}
}

export default StepActor;
