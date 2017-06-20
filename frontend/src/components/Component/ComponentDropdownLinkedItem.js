import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import getIconicName from '../../utils/getIconicName';
import IconPositioned from '../Iconic/IconPositioned';
import IconSwitch from '../Iconic/IconSwitch';
import Tooltip  from 'rc-tooltip';

@inject('uiStore', 'requirementStore','stepObjectStore', 'traceStore')
@observer
class ComponentDropdownLinkedItem extends Component {
	static propTypes = {
		linkedComponentId: PropTypes.string.isRequired,
		parentType: PropTypes.string.isRequired,
		componentType: PropTypes.string.isRequired,
		componentData: PropTypes.object.isRequired,
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

	onClickComponent = (e) => {
		e.stopPropagation();
		const {uiStore, traceStore, stepObjectStore, parentType, linkedComponentId} = this.props;
		
		if(parentType === 'step') {
			stepObjectStore.deleteStepObject(linkedComponentId)
			uiStore.updateComponentDropdownActive('');
		}
		else if (parentType === 'requirement' || parentType === 'detail') {
			traceStore.deleteTrace(linkedComponentId);
			uiStore.updateComponentDropdownActive('');
		}
		else {
			console.error('Got an unknown type of component in Component Dropdown'); // TODO: Better Logging | JH
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
			
			<div className={"addComponentsItem__tile componentTile__linked"}
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
					overlay={'Click to Unlink this Component'} 
					mouseEnterDelay={0.5}
					destroyTooltipOnHide={true}
				> 	
					<IconSwitch 
					iconSize='40' 
					override={this.state.hovered}
					iconicType={getIconicName(componentType)}
					// iconBackgroundColor={null}
					iconicHoverType='link-broken-sm' />
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

export default ComponentDropdownLinkedItem;
