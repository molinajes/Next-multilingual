import React, { Component, PropTypes } from 'react';
import { observer, inject } from 'mobx-react';

import InputField from '../../Editable/InputField_Auto';
import IconPositioned from '../../Iconic/IconPositioned';

@inject('formPropertyStore')
@observer
class FormEditorRow extends Component {

	static propTypes = {
		formPropertyData: PropTypes.object.isRequired,
		formPropertyStore: PropTypes.object.isRequired
	}

	handleSubmitName = (value) => {
		const {formPropertyData, formPropertyStore} = this.props;
		formPropertyStore.editFormProperty(formPropertyData.persistent_id, 'name', value)
	}

	handleSubmitDescription = (value) => {
		const {formPropertyData, formPropertyStore} = this.props;
		formPropertyStore.editFormProperty(formPropertyData.persistent_id, 'text', value)
	}

	handleSubmitValidation = (value) => {
		const {formPropertyData, formPropertyStore} = this.props;
		formPropertyStore.editFormProperty(formPropertyData.persistent_id, 'text2', value)
	}

	handleChangeType = (value) => {
		const {formPropertyData, formPropertyStore} = this.props;
		formPropertyStore.editFormProperty(formPropertyData.persistent_id, 'text3', value)
	}

	handleClickRequired = (e) => {
		const {formPropertyData, formPropertyStore} = this.props;
		if (!formPropertyData.loading) {
			formPropertyStore.editFormProperty(formPropertyData.persistent_id, 'flag', e.target.checked ? '1' : '0')
		}
	}

	handleClickDelete = () => {
		const {formPropertyData, formPropertyStore} = this.props;
		if (!formPropertyData.loading) {
			formPropertyStore.deleteFormProperty(formPropertyData)
		}
	}

	render() {
		const {formPropertyData} = this.props;

		const opacity = formPropertyData.loading ? 0.5 : '';

		return (
			<div className="formEditor__row" style={{opacity: opacity}}>
				<div className="formEditor__cell formEditor__cell--text">#</div>
				<div className="formEditor__cell">
					<InputField
						value={formPropertyData.name}
						placeholder="Edit Form Name"
						onSubmit={this.handleSubmitName}
						disabled={formPropertyData.loading}
						inputClass={"inputClass"}
						formClass={"formClass"}
						divClass={"formEditorRow__inputDiv"}
						/>
				</div>
				<div className="formEditor__cell">
					<InputField
						value={formPropertyData.text3}
						placeholder="Edit Type"
						onSubmit={this.handleChangeType}
						disabled={formPropertyData.loading}
						inputClass={"inputClass"}
						formClass={"formClass"}
						divClass={"formEditorRow__inputDiv"}
						/>
				</div>
				<div className="formEditor__cell">
					<InputField
						value={formPropertyData.text2}
						placeholder="Edit Validation"
						onSubmit={this.handleSubmitValidation}
						disabled={formPropertyData.loading}
						inputClass={"inputClass"}
						formClass={"formClass"}
						divClass={"formEditorRow__inputDiv"}
						/>
				</div>				
				<div className="formEditor__cell formEditor__cell--text">
					<input 
						type="checkbox" 
						value={formPropertyData.flag === '1'}
						checked={formPropertyData.flag === '1'}
						onChange={this.handleClickRequired}/>
				</div>
				<div className="formEditor__cell">
					<InputField
						value={formPropertyData.text}
						placeholder="Edit Form Description"
						onSubmit={this.handleSubmitDescription}
						disabled={formPropertyData.loading}
						inputClass={"inputClass"}
						formClass={"formClass"}
						divClass={"formEditorRow__inputDiv"}
						/>
				</div>
				<div className="formEditor__cell formEditor__cell--text" onClick={this.handleClickDelete}>
					<IconPositioned 
					iconSize='40' 
					iconicType='trash-sm'
					iconHoverColor='yellow'  />
				</div>
			</div>
		);
	}
}

export default FormEditorRow;
