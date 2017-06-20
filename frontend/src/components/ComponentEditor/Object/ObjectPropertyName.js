import React, { Component, PropTypes } from 'react';
import {observer} from 'mobx-react';

import InputField_Auto from '../../Editable/InputField_Auto';

// @inject('')
@observer
class ObjectPropertyName extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		onSubmit: PropTypes.func.isRequired
	}

	handleSubmitName = (value) => {
		this.props.onSubmit(value);
	}

	render() {
		const {data} = this.props;
		return (
			<InputField_Auto
				value={data.name}
				placeholder="Edit Object Property Name"
				onSubmit={this.handleSubmitName}
				inputClass={"inputClass"}
				formClass={"formClass"}
				divClass={"objectEditorRow__inputDiv"}
				/>
		);
	}
}

export default ObjectPropertyName;
