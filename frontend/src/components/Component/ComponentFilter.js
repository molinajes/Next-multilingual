import React, { Component, PropTypes } from 'react';
import IconicIcon from '../Iconic/IconicIcon';

import {observer, inject} from 'mobx-react';

const componentIcons = {
	"iface": "laptop-md",
	"rule": "cogs-md",
	"form": "list-rich-md",
	"object": "connections-md"
}

@inject('uiStore')
@observer
class ComponentFilter extends Component {

	static propTypes = {
		type: PropTypes.string.isRequired,
		uiStore: PropTypes.object.isRequired
	}

	handleClick = () => {
		const {type, uiStore} = this.props;
		uiStore.toggleComponentFilter(type);
	}

	render() {
		const {uiStore,type} = this.props;
		const componentIcon = componentIcons[type];
		return (
			<div className="component__filter" >
				<div className={uiStore.componentFilters[type] ? "componentFilter__icon--active" : "componentFilter__icon"} onClick={this.handleClick}>
					<IconicIcon dataSrc={componentIcon} iconClass={'componenent__icon'} />
				</div>				
			</div>
		);
	}
}

export default ComponentFilter;
