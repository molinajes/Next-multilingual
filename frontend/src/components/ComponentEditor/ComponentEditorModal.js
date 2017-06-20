import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';
import Modal from 'react-modal';
// import GatherSidebar from '../GatherSidebar/GatherSidebar';
import getIconicName from '../../utils/getIconicName';
import IconPositioned from '../Iconic/IconPositioned';

import ComponentDetailEditor from './General/ComponentDetailEditor';
import RuleEditor from './Rule/RuleEditor';
import FormEditor from './Form/FormEditor';
import ObjectEditor from './Object/ObjectEditor';
import InterfaceEditor from './Interface/InterfaceEditor';
import ActorEditor from './Actor/ActorEditor';
import PackageEditor from './Package/PackageEditor';
import RequirementEditor from './Requirement/RequirementEditor';
import DetailEditor from './Requirement/DetailEditor';
import UseCaseEditor from './UseCase/UseCaseEditor';
import LinkedUsage from './General/LinkedUsage';
import LinkedRequirements from './General/LinkedRequirements';
import OverviewEditor from './Overview/OverviewEditor';

import UserSettings from '../User/UserSettings';
import History from '../History/History';

@inject('uiStore', 'componentStore', 'packageStore', 'useCaseStore', 'requirementStore', 'projectStore')
@observer
class ComponentEditorModal extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired,
		componentStore: PropTypes.object.isRequired,
		packageStore: PropTypes.object.isRequired,
		requirementStore: PropTypes.object.isRequired,
		useCaseStore: PropTypes.object.isRequired,
		projectStore: PropTypes.object.isRequired
	}

	handleClose = () => {
		const {uiStore} = this.props;
		uiStore.setBottomBarDetails('','');
	}

	

	render() {
		const { uiStore, 
			componentStore, 
			packageStore, 
			useCaseStore, 
			requirementStore,
			projectStore
		} = this.props;

		const componentsData = componentStore.componentData;

		let output, footerOutput;
		let data;
		let icon;
		let modalName;
		let outputDivClass = "componentEditorModal__section";		
		let componentType = uiStore.bottomBarDetails.type


		/// Shambles.... NEED to tidy up.

		switch (componentType) {
			case 'overview':
				modalName = "Project Overview";
				data = {};
				output = <OverviewEditor divClass={outputDivClass}  />
				footerOutput = (
					<div className="componentEditorModal__footer">
						
					</div>
				);
				icon = projectStore.projectDetails.project_icon;
				break; 
			case 'rule':
				modalName = "Rule Editor";
				data = componentsData.rule.find(obj => obj.persistent_id === uiStore.bottomBarDetails.id);
				output = <RuleEditor divClass={outputDivClass} componentData={data} />
				footerOutput = (
					<div className="componentEditorModal__footer">
						<LinkedRequirements componentData={data}/>
						<LinkedUsage componentData={data}/>
					</div>
				);
				icon = 'rules';
				break;
			case 'form':
				modalName = "Form Editor";
				data = componentsData.form.find(obj => obj.persistent_id === uiStore.bottomBarDetails.id);
				output = <FormEditor divClass={outputDivClass} componentData={data} />
				footerOutput = (
					<div className="componentEditorModal__footer">
						<LinkedRequirements componentData={data}/>
						<LinkedUsage componentData={data}/>
					</div>
				);
				icon = 'forms';
				break;
			case 'object':
				modalName = "Object Editor";
				data = componentsData.object.find(obj => obj.persistent_id === uiStore.bottomBarDetails.id);
				output = <ObjectEditor divClass={outputDivClass} componentData={data} />
				footerOutput = (
					<div className="componentEditorModal__footer">
						<LinkedRequirements componentData={data}/>
						<LinkedUsage componentData={data}/>
					</div>
				);
				icon = 'objects';
				break;
			case 'iface':
				modalName = "Interface Editor";
				data = componentsData.iface.find(obj => obj.persistent_id === uiStore.bottomBarDetails.id);
				output = <InterfaceEditor divClass={outputDivClass} componentData={data} />
				footerOutput = (
					<div className="componentEditorModal__footer">
						<LinkedRequirements componentData={data}/>
						<LinkedUsage componentData={data}/>
					</div>
				);
				icon = 'iface';
				break;
			case 'actor':
				modalName = "Actor Editor";
				data = true;
				output = <ActorEditor divClass={outputDivClass}  />
				footerOutput = (
					<div className="componentEditorModal__footer">
						
					</div>
				);
				icon = 'actor';
				break;
			case 'package':
				modalName = "Package Editor";
				data = packageStore.packageData.find(obj => obj.persistent_id === uiStore.bottomBarDetails.id);
				output = <PackageEditor divClass={outputDivClass} componentData={data} />
				footerOutput = (
					<div className="componentEditorModal__footer">
						
					</div>
				);
				icon = 'fire-sm';
				break;
			case 'useCase':
				modalName = "Use Case Editor";
				data = useCaseStore.useCaseData.find(obj => obj.persistent_id === uiStore.bottomBarDetails.id);
				output = <UseCaseEditor divClass={outputDivClass} componentData={data} />
				footerOutput = (
					<div className="componentEditorModal__footer">
						
					</div>
				);
				icon = 'useCase';
				break;
			case 'requirement':
				modalName = "Requirement Editor";
				data = requirementStore.requirementData.find(obj => obj.persistent_id === uiStore.bottomBarDetails.id);
				output = <RequirementEditor divClass={outputDivClass} componentData={data} />
				footerOutput = (
					<div className="componentEditorModal__footer">
						
					</div>
				);
				icon = 'requirement';
				break;
			case 'detail':
				modalName = "Detail Editor";
				data = requirementStore.detailData.find(obj => obj.persistent_id === uiStore.bottomBarDetails.id);
				output = <DetailEditor divClass={outputDivClass} componentData={data} />
				footerOutput = (
					<div className="componentEditorModal__footer">
						
					</div>
				);
				icon = 'detail';
				break;
			case 'history':
				// console.log('here in comp editmodal')
				modalName = "History";
				data = true;
				output = <History />
				footerOutput = null;
				icon = 'history';
				break;
			case 'user':
				modalName = "User Settings";
				data = true;
				output = <UserSettings />
				footerOutput = null;
				icon = 'person-genderless';
				break;
			default:
				break;
		}
		// console.log('data is',data);
		

		
		return (
			<Modal
				isOpen={data ? true : false}
				// onAfterOpen={afterOpenFn}
				onRequestClose={this.handleClose}
				// closeTimeoutMS={n}
				// style={customStyles}
				contentLabel="Modal"
				overlayClassName="componentEditor__overlay"
				className={"componentEditor__content--" + componentType}
			>
				<div className="componentEditorModal__background">
					<div className={"componentEditorModal__border--" + componentType}>
						<div className="componentEditorModal__content">
							<div className="componentEditorModal__close" onClick={this.handleClose}>
								<IconPositioned
									iconSize='56'
									iconicType={getIconicName('close')} />
							</div>
							<div className="componentEditorModal__titleGroup">
								{icon && <IconPositioned
									iconSize='40'
									iconicType={icon} />}
								<h1 className="componentEditorModal__title">{modalName}</h1>
							</div>
							{(componentType !== 'actor' && componentType !== 'history' && componentType !== 'user') && <ComponentDetailEditor componentData={data} componentType={componentType} componentIcon={getIconicName(icon) || (icon + "-sm")}/>}
							{output}
							{footerOutput}
						</div>
					</div>
				</div>
			</Modal>
			
		);

	}
}

export default ComponentEditorModal;
