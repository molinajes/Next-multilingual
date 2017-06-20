import React, { Component, PropTypes } from 'react';
import IconicIcon from './IconicIcon';

import classnames from 'classnames';

class IconPositioned extends Component {
	static propTypes = {
		children: PropTypes.object,
		additionalStyles: PropTypes.object,
		className: PropTypes.string,
		onClick: PropTypes.func,
		onMouseEnter: PropTypes.func,
		onMouseLeave: PropTypes.func,
		iconSize: PropTypes.string.isRequired,
		iconicType: PropTypes.string.isRequired,
		iconColor: PropTypes.string,
		iconBackgroundColor: PropTypes.string,
		iconHoverColor: PropTypes.string
	};

	static defaultProps = { 
		iconSize: '40',
		iconColor: 'primary',
		iconicType: 'tools-sm',
		iconBackgroundColor: ' ',
		iconHoverColor: ' ',
		additionalStyles: {},
		className: ''
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

	render() {
		const {iconSize, 
			iconicType, 
			iconColor, 
			iconHoverColor, 
			iconBackgroundColor, 
			additionalStyles,
			className
		} = this.props;

		let iconSizeClass;
		switch (iconSize) {
			case '16':
				iconSizeClass = "iconPosition--16"
				break;
			case '24':
				iconSizeClass = "iconPosition--24"
				break;
			case '32':
				iconSizeClass = "iconPosition--32"
				break;
			case '40':
				iconSizeClass = "iconPosition--40"
				break;
			case '56':
				iconSizeClass = "iconPosition--56"
				break;
			default:
				iconSizeClass = null
				break;
		}

		let iconHoverColorClass;
		switch (iconHoverColor) {
			case 'mango':
				iconHoverColorClass = "iconHoverBackground--mango"
				break;
			case 'orange':
				iconHoverColorClass = "iconHoverBackground--orange"
				break;
			case 'yellow':
				iconHoverColorClass = "iconHoverBackground--yellow"
				break;
			case 'primary':
				iconHoverColorClass = "iconHoverBackground--primary"
				break;
			default:
				iconHoverColorClass = null
				break;
		}
		
		let iconColorClass;
		switch (iconColor) {
			case 'mango':
				iconColorClass = "iconColor--mango"
				break;
			case 'orange':
				iconColorClass = "iconColor--orange"
				break;
			case 'yellow':
				iconColorClass = "iconColor--yellow"
				break;
			case 'primary':
				iconColorClass = "iconColor--primary"
				break;
			case 'light':
				iconColorClass = "iconColor--light"
				break;
			default:
				iconColorClass = null;
				break;
		}

		let iconBackgroundClass;
		switch (iconBackgroundColor) {
			case 'mango':
				iconBackgroundClass = "iconBackgroundColor--mango"
				break;
			case 'orange':
				iconBackgroundClass = "iconBackgroundColor--orange"
				break;
			case 'yellow':
				iconBackgroundClass = "iconBackgroundColor--yellow"
				break;
			case 'primary':
				iconBackgroundClass = "iconBackgroundColor--primary"
				break;
			default:
				iconBackgroundClass = null;
				break;
		}

		return (
			<div className={
					classnames(
						className,
						iconSizeClass,
						iconColorClass,
						iconHoverColorClass,
						iconBackgroundClass
					)
				} 
				onClick={this.props.onClick}
				onMouseEnter={this.handleMouseEnter}
				onMouseLeave={this.handleMouseLeave}
				style={{additionalStyles}}
			>
				<IconicIcon dataSrc={iconicType} iconClass={'iconPositioned__div'} />
				{this.props.children}
			</div>
		);
	}
}

export default IconPositioned;
