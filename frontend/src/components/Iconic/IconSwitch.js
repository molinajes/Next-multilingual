import React, { Component, PropTypes } from 'react';

import IconPositioned from './IconPositioned';

class IconSwitch extends Component {
	static propTypes = {
		iconSize: PropTypes.string.isRequired,
		iconicType: PropTypes.string.isRequired,
		iconicHoverType: PropTypes.string.isRequired,
		override: PropTypes.bool,
		iconColor: PropTypes.string,
		iconBackgroundColor: PropTypes.string,
		iconHoverColor: PropTypes.string,
		onMouseEnter: PropTypes.func,
		onMouseLeave: PropTypes.func,
		onClick: PropTypes.func,
		className: PropTypes.string
	}

	static defaultProps = {
		className: ''
	}

	constructor(props) {
		super(props);
		this.state = {
			hoverEdit: !!this.props.override 
		};
	}

	mouseEnterEdit = (e) => {
		this.setState({hoverEdit: true});
		if (this.props.onMouseEnter) {
			this.props.onMouseEnter(e);
		}
	}

	mouseLeaveEdit = (e) => {
		if (!this.props.override) {
			this.setState({hoverEdit: false});
		}
		if (this.props.onMouseLeave) {
			this.props.onMouseLeave(e);
		}
	}

	componentWillReceiveProps = (nextProps) => {
		if (nextProps.override) {
			this.setState({hoverEdit: true});	
		}
		if (!nextProps.override) {
			this.setState({hoverEdit: false});	
		}
	}

	handleClick = (e) => {
		if (this.props.onClick) {
			this.props.onClick(e)
		}
	}

	render() {
		const {
			iconSize, 
			iconicType, 
			iconicHoverType, 
			iconColor, 
			iconHoverColor, 
			iconBackgroundColor,
			className
		} = this.props;

		let showIcon = !this.state.hoverEdit ? 'flex' : 'none';
		let showAltIcon = this.state.hoverEdit ? 'flex' : 'none';

		return (
			<div
			onClick={this.handleClick}
			onMouseOver={this.mouseEnterEdit}
			onMouseLeave={this.mouseLeaveEdit}
			className={className}>


				<div style={{display: showIcon}}>
					{iconicType && <IconPositioned 
						iconSize={iconSize} 
						iconColor={iconColor} 
						iconicType={iconicType}
						iconHoverColor={iconHoverColor} 
						iconBackgroundColor={iconBackgroundColor}
					/>}
				</div>
				<div style={{display: showAltIcon}}>
					{iconicHoverType && <IconPositioned 
						iconSize={iconSize} 
						iconColor={iconColor} 
						iconicType={iconicHoverType}
						iconHoverColor={iconHoverColor} 
						iconBackgroundColor={iconBackgroundColor}
					/>}
				</div>
					
			</div>
		);
	}
}

export default IconSwitch;
