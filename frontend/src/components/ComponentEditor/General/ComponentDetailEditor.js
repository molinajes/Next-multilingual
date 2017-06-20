import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import DeleteObject from '../../Delete/DeleteObject';

import ComponentEditorName from './ComponentEditorName';
import ComponentEditorDescription from './ComponentEditorDescription';



@inject('uiStore', 'componentStore','useCaseStore','requirementStore','packageStore')
@observer
class InformationEditor extends Component {
	static propTypes = {
		componentStore: PropTypes.object.isRequired,
		useCaseStore: PropTypes.object.isRequired,
		requirementStore: PropTypes.object.isRequired,
		packageStore: PropTypes.object.isRequired,
		componentData: PropTypes.object.isRequired,
		componentType: PropTypes.string.isRequired,		
		componentIcon: PropTypes.string.isRequired,		
		uiStore: PropTypes.object.isRequired
	}

	handleClickDelete = () => {
		const {componentData, componentStore, componentType, packageStore, requirementStore, useCaseStore, uiStore} = this.props;

		switch (componentType) {
			case 'iface':
			case 'object':
			case 'form':
			case 'rule':
				componentStore.deleteComponent(componentType, componentData.persistent_id);
				break;
			case 'useCase':
				useCaseStore.deleteUseCase(componentData);
				break;
			case 'package':
				packageStore.deletePackage(componentData)
				break;
			case 'requirement':
				requirementStore.deleteRequirement(componentData);
				break;
			case 'detail':
				requirementStore.deleteDetail(componentData);
				break;
			default:
				break;			
		}
		uiStore.setBottomBarDetails('','');
		
	}

	

	render() {
		const {componentData, componentType, componentIcon} = this.props;

		let descriptionOutput;
		switch(componentType) {
			case 'rule':
			case 'requirement':
			case 'detail':
				descriptionOutput = null;
				break;
			default:
				descriptionOutput = (
					<div className="componentEditorDescription">
						<ComponentEditorDescription componentData={componentData} componentType={componentType}/>
					</div>
				)
				break;
		}


		return (
			<div className="componentDetailEditor__container">					
				<div className="componentEditorName">
					<ComponentEditorName componentData={componentData} componentType={componentType} componentIcon={componentIcon}/>
				</div>
				{descriptionOutput}
				<div style={{marginLeft: 'auto'}}>
					{/*<IconPositioned iconSize="40" iconicType={'trash-sm'} iconHoverColor='mango' onClick={this.handleClickDelete} />*/}
					{componentType !== 'overview' && <DeleteObject data={componentData} onDelete={this.handleClickDelete}/>}
				</div>
			{/* TODO: add icon hover color as props | AjH */}
			</div>
		);
	}
}

export default InformationEditor;
