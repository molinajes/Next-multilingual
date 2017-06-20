import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';


@inject('formPropertyStore')
@observer
class FormEditorRowCreate extends Component {

	static propTypes = {
		formPropertyStore: PropTypes.object.isRequired,
		formId: PropTypes.string.isRequired
	}

	handleClickCreate = () => {
		const {formPropertyStore, formId} = this.props;
		formPropertyStore.createFormProperty(formId);
	}

	render() {
		
		return (
			<div className="formEditor__row" onClick={this.handleClickCreate}>
				<div className="formEditor__cell formEditor__cell--text">+</div>
				<div className="formEditor__addRowCell">Create a new form field</div>
			</div>
		);
	}
}

export default FormEditorRowCreate;
