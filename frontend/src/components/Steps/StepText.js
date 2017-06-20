import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import InputField_Auto from '../Editable/InputField_Auto';

@inject('stepStore')
@observer
class StepText extends Component {
	static propTypes = {
		stepStore: PropTypes.object.isRequired,
		stepData: PropTypes.object.isRequired,
		disabled: PropTypes.bool.isRequired
	}

	componentDidUpdate = () => {
		if(this.textInput) this.textInput.focus();
	}

	onSubmit = (value) => {
		const {stepStore, stepData} = this.props;
		stepStore.updateStep(stepData.persistent_id, value, 'text');  
	}


	render() {
		const {stepData, disabled} = this.props;
		
		return (
			<InputField_Auto
				divClass="stepText__inputField"
				placeholder="Action"
				label="Actor action"
				value={stepData.text}
				disabled={disabled}
				onSubmit={this.onSubmit}/>
		)
		
	}
}

export default StepText;
