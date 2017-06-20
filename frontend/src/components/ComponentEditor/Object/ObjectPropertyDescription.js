import React, { Component, PropTypes } from 'react';
import {observer} from 'mobx-react';

import InputField_Auto from '../../Editable/InputField_Auto';

// @inject('')
@observer
class ObjectPropertyDescription extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		onSubmit: PropTypes.func.isRequired
	}

	handleSubmitDescription = (value) => {
		this.props.onSubmit(value);
	}

	render() {
		const {data} = this.props;
		return (
			<InputField_Auto
				value={data.text}
				placeholder="Edit Object Property Description"
				onSubmit={this.handleSubmitDescription}
				inputClass={"inputClass"}
				formClass={"formClass"}
				divClass={"objectEditorRow__inputDiv"}
				/>
		);
	}
}

export default ObjectPropertyDescription;
