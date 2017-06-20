import React, { Component, PropTypes } from 'react';
import ComponentDropdown from './ComponentDropdown';
import IconPositioned from '../Iconic/IconPositioned';
import getIconicName from '../../utils/getIconicName';

import componentNameToId from '../../utils/componentNameToId';

import {observer, inject} from 'mobx-react';


@inject('uiStore','traceStore','stepObjectStore','ruleStore',
	'formStore',
	'objectStore',
	'ifaceStore')
@observer
class ComponentSelector extends Component {

	static propTypes = {
		componentType: PropTypes.string.isRequired,
		parentType: PropTypes.string.isRequired,
		parentData: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired,
		traceStore: PropTypes.object.isRequired,
		ruleStore: PropTypes.object.isRequired,
		formStore: PropTypes.object.isRequired,
		objectStore: PropTypes.object.isRequired,
		ifaceStore: PropTypes.object.isRequired,
		stepObjectStore: PropTypes.object.isRequired,
		parentLoading: PropTypes.bool,
		onMouseEnter: PropTypes.func,
		onMouseLeave: PropTypes.func
	}

	static defaultProps = {
		parentLoading: false
	}

	handleClick = () => {
		const {uiStore, parentData, componentType} = this.props;
		let constructedId = `${parentData.id}_${componentType}`;
		if(uiStore.componentDropdownActive === constructedId) {
			uiStore.updateComponentDropdownActive('');
			uiStore.dropdownInput = '';
		}
		else {
			uiStore.updateComponentDropdownActive(constructedId);
		}
	}

	handleKeyDown = (e) => {
		if (e.keyCode === 13) { // Enter 
			this.handleClick();
		}
	}

	handleDropdownClose = () => {
		this.handleClick();
	}

	handleMouseEnter = (e) => {
		if (this.props.onMouseEnter) {
			this.props.onMouseEnter(e);
		}
	}

	handleMouseLeave = (e) => {
		if (this.props.onMouseLeave) {
			this.props.onMouseLeave(e);
		}
	}

	/* = () => {
		this.props.uiStore.setActiveTooltip('componentSelector');
	}

	onMouseLeaveComponent = () => {
		this.props.uiStore.setActiveTooltip('');
	}*/

	render() {
		const {traceStore, stepObjectStore, uiStore, componentType, parentType, parentData,
				ruleStore,
				formStore,
				objectStore,
				parentLoading,
				ifaceStore
		} = this.props;

		let linkedComponents;
		if (parentType === 'requirement' || parentType === 'detail') {
			linkedComponents = traceStore.traceData.filter(trace => {
				return (trace.type === componentNameToId(componentType)) && (trace.parent_id === parentData.persistent_id)
			})
		}
		else if (parentType === 'step') {
			linkedComponents = stepObjectStore.stepObjectData.filter(stepobject => {
				return (stepobject.type === componentNameToId(componentType)) && (stepobject.parent_id === parentData.persistent_id)
			})
		}
		else {
			console.error('Got a component type in a selector that does not exist');
			// TODO: Better error logging | JH
		}

		let storeData;
		switch (componentType) {
			case 'rule':
				storeData = ruleStore.ruleData;
				break;
			case 'form':
				storeData = formStore.formData;
				break;
			case 'object':
				storeData = objectStore.objectData;
				break;
			case 'iface':
				storeData = ifaceStore.ifaceData;
				break;
			default:
				break;
		}

		let constructedId = `${parentData.id}_${componentType}`;
		let output = (!parentLoading && (uiStore.componentDropdownActive === constructedId)) &&
					<ComponentDropdown 
						handleCloseMenu={this.handleDropdownClose}
						linkedComponentsData={linkedComponents}
						parentData={parentData}
						parentType={parentType}
						componentType={componentType}
						storeData={storeData}
					/>;


					// TODO: Do we need to revisit how this dropdown is opened? | JH
		let enableComponentSelector = uiStore.componentDropdownActive === constructedId ? ' component__selector--enabled ' : '';
		let activeComponentSelector =  linkedComponents.length ? ' component__selector--active' : '';
		return (
			<div 
				className={'component__selector ' +enableComponentSelector + ' ' + activeComponentSelector}
				onClick={this.handleClick}
				onKeyDown={this.handleKeyDown}

				tabIndex={"0"}
			>
				<div className="component__icon" 
					ref={(icon) => this.icon = icon}
					onMouseEnter={this.handleMouseEnter} 
					onMouseLeave={this.handleMouseLeave}
				>
					<IconPositioned 
						iconicType={getIconicName(componentType)} 
						iconSize='40'
						iconHoverColor='yellow'>

					<div className="component__count">
						{linkedComponents.length ? linkedComponents.length : '+'}
					</div>
					</IconPositioned>

				</div>
				{output}
			</div>
		);
	}
}

export default ComponentSelector;
