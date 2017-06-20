import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import TextAreaField from '../../Editable/TextAreaField';
import IconPositioned from '../../Iconic/IconPositioned';

@inject('uiStore', 'ruleStore')
@observer
class RuleEditor extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired,
		ruleStore: PropTypes.object.isRequired,
		componentData: PropTypes.object.isRequired
	}

	handleEditDefinition = (value) => {
		const {componentData, ruleStore} = this.props;
		ruleStore.editRule(componentData.persistent_id, 'text', value)
	}

	render() {
		const {componentData} = this.props;
		return (
			<div className="ruleEditor__container">
				<div className="componentEditorModal__sectionTitle--center">
					<IconPositioned 
					iconSize='40' 
					iconicType='cogs-sm'  />
					Define your business rule below
				</div>
				<div className="componentEditorModal__sectionContent">
					<TextAreaField
						onSubmit={this.handleEditDefinition}
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
