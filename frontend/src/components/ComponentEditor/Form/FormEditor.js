import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import IconPositioned from '../../Iconic/IconPositioned';
import FormEditorRow from './FormEditorRow';
import FormEditorRowCreate from './FormEditorRowCreate';


@inject('uiStore')
@observer
class FormEditor extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired,
		componentData: PropTypes.object.isRequired
	}

	handleClickDelete = () => {

	}

	render() {
		const {componentData} = this.props;
		const formProperties = componentData.children.map(formProp => {
			return <FormEditorRow formPropertyData={formProp} key={formProp.persistent_id}/>
		})

		return (
			<div className="formEditor__container">
				<div className="componentEditorModal__sectionTitle--center">
					<IconPositioned 
					iconSize='40' 
					iconicType='list-rich-sm'  />
					Define your form below

				</div>
				<div className="formEditor__sectionContent">
					<div className="formEditor__table">
						<div className="formEditor__tableHead">
							<div className="formEditor__cell">#</div>
							<div className="formEditor__cell">Field Name</div>
							<div className="formEditor__cell">Type</div>
							<div className="formEditor__cell">Validation</div>
							<div className="formEditor__cell">*</div>
							<div className="formEditor__cell">Description</div>
							<div className="formEditor__cell"></div>
						</div>
					</div>
					
					{formProperties}
					<FormEditorRowCreate formId={componentData.persistent_id}/>
				</div>
			</div>
		);
	}
}

export default FormEditor;
