import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import InputField_Auto from '../Editable/InputField_Auto';

@inject('stepStore', 'uiStore')
@observer
class StepResult extends Component {
	static propTypes = {
		stepStore: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired,
		stepData: PropTypes.object.isRequired,
		disabled: PropTypes.bool.isRequired
	}

	componentDidUpdate = () => {
		if(this.textInput) this.textInput.focus();
	}

	onSubmit = (value) => {
		const {stepStore, stepData} = this.props;
		stepStore.updateStep(stepData.persistent_id, value, 'text2');  
	}

	render() {
		const {stepData, disabled} = this.props;
		
		return (
			<InputField_Auto
				divClass="stepText__inputField"
				placeholder="Response"
				label="System response"
				value={stepData.text2}
				disabled={disabled}
				onSubmit={this.onSubmit}/>
		)
	}
}

export default StepResult;
