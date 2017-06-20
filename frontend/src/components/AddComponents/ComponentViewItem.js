import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';
import IconSwitch from '../Iconic/IconSwitch';

import Tooltip  from 'rc-tooltip';

import getIconicName from '../../utils/getIconicName';

@inject('requirementStore','uiStore')
@observer
class ComponentViewItem extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired,
		componentData: PropTypes.object.isRequired,
		componentType: PropTypes.string.isRequired,
		componentIcon: PropTypes.string.isRequired
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

	handleClickEdit = () => {
		const { componentData, componentType, uiStore } = this.props;
		if (!componentData.loading) {
			uiStore.setBottomBarDetails(componentType, componentData.persistent_id);
		}
	}

	render() {

		const { componentData, componentType, componentIcon } = this.props;

		let iconBackgroundColor; 
		let isStub = false;
		switch (componentType) {
			case 'rule':
				iconBackgroundColor = 'orange';
				isStub = componentData.text === "";
				break;
			case 'form':
				iconBackgroundColor = 'yellow';
				isStub = componentData.children.length === 0;
				break;
			case 'object':
				iconBackgroundColor = 'primary';
				isStub = componentData.children.length === 0;
				break;
			case 'iface':
				iconBackgroundColor = 'mango';
				isStub = componentData.children.length === 0;
				break;
			default: 
				break;
		}

		const tileModifier = "addComponentsItem__tile--"+`${componentType}`;

		let opacity = componentData.loading ? 0.5 : '';

		return (
			<div className={"addComponentsItem__tile "+tileModifier}
				style={{opacity}}
				onMouseOver={this.mouseEnterEdit}
				onMouseLeave={this.mouseLeaveEdit}
				onClick={this.handleClickEdit} 
				>
				<Tooltip 
					placement="topLeft" 
					trigger={['hover']} 
					overlay={'Click to Edit this Component'} 
					mouseEnterDelay={0.5}
					destroyTooltipOnHide={true}
				> 	
					<IconSwitch 
					iconSize='40' 
					override={!componentData.loading && this.state.hovered}
					iconicType={componentIcon}
					iconBackgroundColor={this.state.hovered ? iconBackgroundColor : null}
					iconicHoverType={getIconicName('edit')} />
				</Tooltip>
				<div className="addComponentsItem__name">
					<p>{componentData.name}</p>
					{isStub ? (
						<Tooltip 
							placement="bottom" 
							trigger={['hover']} 
							overlay={'This component requires more information'} 
							mouseEnterDelay={0.5}
							destroyTooltipOnHide={true}
						>
							<span className="addComponentsItem__stub">Stub</span>
						</Tooltip>
					) : null}
				</div>
			</div>
		);
	}
}

export default ComponentViewItem;
