import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import componentNameToId from '../../utils/componentNameToId';
import getIconicName from '../../utils/getIconicName';

import IconPositioned from '../Iconic/IconPositioned';
import IconSwitch from '../Iconic/IconSwitch';
import Tooltip  from 'rc-tooltip';

@inject('uiStore', 'requirementStore', 'stepObjectStore', 'traceStore')
@observer
class ComponentDropdownUnlinkedItem extends Component {
	
	static propTypes = {
		parentId: PropTypes.string.isRequired,
		parentType: PropTypes.string.isRequired,
		componentType: PropTypes.string.isRequired,
		componentData: PropTypes.object.isRequired,
		componentId: PropTypes.string.isRequired,
		requirementStore: PropTypes.object.isRequired,
		stepObjectStore: PropTypes.object.isRequired,
		traceStore: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			hovered: false
		};
	}

	mouseEnterEdit = () => {
		this.setState({hovered: true});
	}

	mouseLeaveEdit = () => {
		this.setState({hovered: false});
	}

	componentDidMount = () => {
		window.a = this.ref;
	}

	onClickComponent = (e) => {
		e.stopPropagation();
		const {uiStore, traceStore, stepObjectStore, parentId, parentType, componentId, componentType} = this.props;

		if(parentType === 'step') {
			stepObjectStore.createStepObject(parentId, componentId, componentNameToId(componentType));
			console.log('made a link between ', parentId, componentId, 'type', componentType);
			uiStore.updateComponentDropdownActive('');
		}
		else if (parentType === 'requirement' || parentType === 'detail') {
			traceStore.createTrace(componentNameToId(componentType), componentId, parentId);
			uiStore.updateComponentDropdownActive('');
		}
		else {
			console.error('Got an unknown type of component in Component Dropdown'); // TODO: Better Logging | JH
		}
	}

	handleKeyDown = (e) => {
		// If enter is pressed whilst focused then trigger the click event.
		e.preventDefault();
		if (e.keyCode === 13) {
			this.onClickComponent(e);  // We pass the event so that e.stopProp is avail in onClickComp.
		}
		else if (e.keyCode === 38) {  // Up
			if (this.wrapper && this.wrapper.previousElementSibling) {
				this.wrapper.previousElementSibling.focus();
			}
		}
		else if (e.keyCode === 40) {  // Down
			if (this.wrapper && this.wrapper.nextElementSibling) {
				this.wrapper.nextElementSibling.focus();
			}
		}
	}

	handleClickEdit = (e) => {
		const {uiStore, componentData, componentType} = this.props;
		uiStore.setBottomBarDetails(componentType, componentData.persistent_id);
		e.stopPropagation();
	}

	render() {
		const {componentData, componentType} = this.props;

		return (
			
			<div className={"addComponentsItem__tile"}
				onMouseOver={this.mouseEnterEdit}
				onMouseLeave={this.mouseLeaveEdit}
				onClick={this.onClickComponent}
				ref={ref => this.wrapper = ref}
				tabIndex={"0"}
				onKeyDown={this.handleKeyDown}
			>
{/*<div 
	tabIndex={"0"}
	onKeyDown={this.handleKeyDown}
	className='componentDropdown__listItem--linked'
	onClick={this.onClickComponent}
	ref={ref => this.wrapper = ref}
>
	{componentName}
</div>*/}
				<Tooltip 
					placement="topLeft" 
					trigger={['hover']} 
					overlay={'Click to Link this Component'} 
					mouseEnterDelay={0.5}
					destroyTooltipOnHide={true}
				> 	
					<IconSwitch 
					iconSize='40' 
					override={this.state.hovered}
					iconicType={getIconicName(componentType)}
					// iconBackgroundColor={null}
					iconicHoverType='link-intact-sm' />
				</Tooltip>
				<div className="addComponentsItem__name">
					<p>{componentData.name}</p>
				</div>
				<Tooltip 
					placement="topLeft" 
					trigger={['hover']} 
					overlay={'Click to Edit this Component'} 
					mouseEnterDelay={0.5}
					destroyTooltipOnHide={true}
				> 	
					<IconPositioned 
					onClick={this.handleClickEdit}
					iconSize='40' 
					iconicType={getIconicName('edit')}
					iconHoverColor={'orange'}/>
				</Tooltip>
			</div>
		);
	}
}

export default ComponentDropdownUnlinkedItem;
