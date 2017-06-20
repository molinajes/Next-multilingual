import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import InputField from '../../Editable/InputField_Auto';

@inject('mainStore', 'uiStore', 'componentStore', 'useCaseStore', 'packageStore', 'actorStore', 'projectStore')
@observer
class ComponentEditorName extends Component {
	static propTypes = {
		mainStore: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired,
		componentStore: PropTypes.object.isRequired,
		useCaseStore: PropTypes.object.isRequired,
		packageStore: PropTypes.object.isRequired,
		actorStore: PropTypes.object.isRequired,
		componentData: PropTypes.object.isRequired,
		componentIcon: PropTypes.string,
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
			projectStore,
			mainStore
		} = this.props;
		if (componentType === 'useCase') {
			useCaseStore.editUseCase(componentData.persistent_id, 'name', value);
		}
		else if (componentType === 'package') {
			packageStore.editPackage(componentData.persistent_id, 'name', value);
		}
		else if (componentType === 'overview') {
			projectStore.editProjectDetails('project_name', value);
			mainStore.getMetaData();  // so that the icon will be updated if the user returns to the index page
		}
		else if (componentType === 'actor') {
			actorStore.editActor(componentData.persistent_id, 'name', value);
		}
		else {
			componentStore.editComponent(componentType, componentData.persistent_id, 'name', value)
		}
	}

	render() {
		const {componentData, componentIcon, componentType, projectStore} = this.props;

		let iconActiveColor; 
		switch (componentType) {
			case 'rule':
				iconActiveColor = 'orange';
				break;
			case 'form':
				iconActiveColor = 'yellow';
				break;
			case 'object':
				iconActiveColor = 'primary';
				break;
			case 'iface':
			case 'overview':
				iconActiveColor = 'mango';
				break;
			default: 
				iconActiveColor = 'primary';
				break;
		}
		return (
				<InputField 
					value={componentType !== 'overview' ? componentData.name : projectStore.projectDetails.project_name}
					onSubmit={this.handleSubmit}
					label={"Name"}
					inputClass={"inputClass"}
					formClass={"formClass"}
					divClass={"componentEditorName__div--" + componentType}
					iconicType={componentIcon}
					iconSize="32"
					iconActiveColor={iconActiveColor}
				/>
		);
	}
}

export default ComponentEditorName;
