import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import TextAreaField from '../../Editable/TextAreaField';

@inject('uiStore', 'componentStore', 'useCaseStore', 'packageStore', 'actorStore', 'projectStore')
@observer
class ComponentEditorDescription extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired,
		componentStore: PropTypes.object.isRequired,
		useCaseStore: PropTypes.object.isRequired,
		packageStore: PropTypes.object.isRequired,
		actorStore: PropTypes.object.isRequired,
		componentData: PropTypes.object.isRequired,
		componentType: PropTypes.string.isRequired,
		projectStore: PropTypes.object.isRequired
	}


	handleSubmit = (value) => {
		const {componentStore, 
			useCaseStore,
			packageStore,
			actorStore,
			componentData, 
			componentType,
			projectStore
		} = this.props;
		if (componentType === 'useCase') {
			useCaseStore.editUseCase(componentData.persistent_id, 'text', value);
		}
		else if (componentType === 'package') {
			packageStore.editPackage(componentData.persistent_id, 'text', value);
		}
		else if (componentType === 'actor') {
			actorStore.editActor(componentData.persistent_id, 'text', value);
		}
		else if (componentType === 'overview') {
			projectStore.editProjectDetails('project_description', value);
		}
		else {
			componentStore.editComponent(componentType, componentData.persistent_id, 'text', value)
		}
	};


	render() {
		const {componentData, componentType, projectStore} = this.props;

		return (
			<TextAreaField
				value={componentType !== 'overview' ? componentData.text : projectStore.projectDetails.project_description}
				onSubmit={this.handleSubmit}
				label={"Description"}
				placeholder={"Input a Description for this component here"}
				divClass={"componentEditorDescription__div--" + componentType}
				formClass={'textAreaField__form'}
			/>
		);
	}
}

export default ComponentEditorDescription;
