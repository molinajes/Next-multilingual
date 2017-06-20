import React, { Component, PropTypes } from 'react';
// import IconicIcon from '../Iconic/IconicIcon';
import {observer, inject} from 'mobx-react';

import IconicIcon from '../Iconic/IconicIcon';

@inject('uiStore', 'requirementStore', 'traceStore')
@observer
class ComponentDropdownLinkedItem extends Component {
	static propTypes = {
		onClick: PropTypes.func,
		onRequestCloseMenu: PropTypes.func.isRequired, 
		traceId: PropTypes.string.isRequired,
		reqData: PropTypes.object.isRequired,
		isDetail: PropTypes.bool,
		traceStore: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired
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
		const {traceStore, traceId} = this.props;
		
		traceStore.deleteTrace(traceId);
		this.props.onRequestCloseMenu();
		// uiStore.updateComponentDropdownActive('');

	}

	render() {
		const {reqData, isDetail} = this.props;
		return (
			<div 
				tabIndex={"0"}
				onKeyDown={this.handleKeyDown}
				className='componentDropdown__listItem--linked'
				onClick={this.onClickComponent}
				ref={ref => this.wrapper = ref}
				style={{marginLeft: isDetail ? '2em' : ''}}
			>
				<IconicIcon dataSrc={isDetail ? 'screenshot-sm' : 'chat-sm'} iconClass={''} onClick={this.props.onClick}/>
				<div className="componentDropdown__title">{reqData.name}</div>
			</div>
		);
	}
}

export default ComponentDropdownLinkedItem;
