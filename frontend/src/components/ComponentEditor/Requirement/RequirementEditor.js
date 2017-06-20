import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import TextAreaField from '../../Editable/TextAreaField';
import IconPositioned from '../../Iconic/IconPositioned';

@inject('uiStore', 'requirementStore')
@observer
class RuleEditor extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired,
		requirementStore: PropTypes.object.isRequired,
		componentData: PropTypes.object.isRequired
	}

	handleEditName = (value) => {
		const {componentData, requirementStore} = this.props;
		requirementStore.updateBasic(componentData.persistent_id, 'requirement', value, 'text')
	}

	render() {
		const {componentData} = this.props;
		return (
			<div className="ruleEditor__container">
				<div className="componentEditorModal__sectionTitle--center">
					<IconPositioned 
					iconSize='40' 
					iconicType='chat-sm'  />
					Edit your Requirement's information below
				</div>
				<div className="componentEditorModal__sectionContent">
					<TextAreaField
						onSubmit={this.handleEditName}
						label={"Definition"}
						value={componentData.text}
						placeholder={"Input a Description for this component here"}
						divClass={"ruleEditor__inputField"}
						formClass={"ruleEditor__ruleDefinition__form"}
						rows={6}
					/>
				</div>
			</div>
		);
	}
}

export default RuleEditor;
