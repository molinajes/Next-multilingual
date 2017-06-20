import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import getIconicName from '../../../utils/getIconicName';

import IconPositioned from '../../Iconic/IconPositioned';
import InputField from '../../Editable/TextAreaField';

import Flow from '../../Flows/Flow';

@inject('useCaseStore')
@observer
class UseCaseEditor extends Component {
	static propTypes = {
		componentData: PropTypes.object.isRequired,
		useCaseStore: PropTypes.object.isRequired
	}

	handleSubmitPreCondition = (value) => {
		const {useCaseStore, componentData} = this.props;
		useCaseStore.editUseCase(componentData.persistent_id, 'text2', value);
	}

	render() {
		const { componentData } = this.props;
		
		const flows = componentData.children.map(flow => {
			return <Flow flowData={flow} key={flow.persistent_id}/>
		})
		

		return (
			<div className="formEditor__container">
				<InputField 
					value={componentData.text2}
					onSubmit={this.handleSubmitPreCondition}
					label={"Preconditions for the use case"}
					inputClass={"inputClass"}
					formClass={"formClass"}
					divClass={"componentEditorDescription__div--object" }
					iconicType={getIconicName('useCase')}
					iconSize="32"
					iconActiveColor={'primary'}
				/>
				<div className="componentEditorModal__sectionTitle--center">
					<IconPositioned 
					iconSize='40' 
					iconicType={getIconicName('step')}  />
					Edit Use Case steps below					
				</div>
				<div className="flowEditor__sectionContent">
					{flows}
				</div>
			</div>
		);

	}
}

export default UseCaseEditor;
