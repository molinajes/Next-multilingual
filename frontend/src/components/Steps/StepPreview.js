import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import getIconicName from '../../utils/getIconicName';

import IconSwitch from '../Iconic/IconSwitch';

@inject('uiStore')
@observer
class StepPreview extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired,
		data: PropTypes.object.isRequired,
		useCaseId: PropTypes.string.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			hovered: false
		};
	}

	handleMouseEnter = () => {
		this.setState({hovered: true});
	}

	handleMouseLeave = () => {
		this.setState({hovered: false});
	}

	handleClick = () => {
		const {uiStore, useCaseId} = this.props;
		uiStore.setBottomBarDetails('useCase', useCaseId);
	}

	render() {
		const {data} = this.props;
		return (
			<div 
				className="stepPreview__container" 
				onClick={this.handleClick}
				onMouseOver={this.handleMouseEnter}
				onMouseLeave={this.handleMouseLeave}
			>
				<IconSwitch 
					iconSize='40' 
					override={this.state.hovered}
					className="stepPreview__icon"
					iconicType={getIconicName('step')}
					iconicHoverType={getIconicName('edit')} />

				<div className="stepPreview__content">
					<div className="stepPreview__action">
						{data.text || <span style={{opacity: 0.5}}>Action</span>}
					</div>
					<div className="stepPreview__response">
						{data.text2 || <span style={{opacity: 0.5}}>Response</span>}
					</div>
				</div>
			</div>
		);
	}
}

export default StepPreview;
