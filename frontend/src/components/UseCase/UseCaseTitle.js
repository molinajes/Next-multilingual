import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import InputField_Auto from '../Editable/InputField_Auto';

@inject('useCaseStore')
@observer
class UseCaseTitle extends Component {
	static propTypes = {
		useCaseStore: PropTypes.object.isRequired,
		useCaseData: PropTypes.object.isRequired
	}

	componentDidUpdate = () => {
		if(this.textInput) this.textInput.focus();
	}

	onSubmit = (value) => {
		const {useCaseStore, useCaseData} = this.props;
		useCaseStore.editUseCase(useCaseData.persistent_id, 'name', value);
	}


	render() {
		const {useCaseData} = this.props;
		return (
			<InputField_Auto
				divClass="useCase__nameInput"
				placeholder="Use Case Name"
				value={useCaseData.name}
				onSubmit={this.onSubmit}/>
		)
	}
}

export default UseCaseTitle;
