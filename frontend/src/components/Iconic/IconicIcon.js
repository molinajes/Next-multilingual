import React, { Component, PropTypes } from 'react';

class IconicIcon extends Component {
	static propTypes = {
		dataSrc: PropTypes.string
	}

	componentDidMount = () => {
		window.iconic.inject(this.icon);
	}

	componentDidUpdate = (prevProps) => {
		
		const {dataSrc} = this.props;
		if (dataSrc !== prevProps.dataSrc) {
			window.iconic.inject(this.icon)
		}
	}

	render() {
		const {dataSrc} = this.props;

		let prefix = '/iconic/svg/';
		if (ENV_PRODUCTION || IS_EXTERNAL_RELEASE) {
			prefix = '/app/assets/icons/svg/';
		}

		return (
			<div className={'iconPositioned__div'} key={dataSrc}>
				<img data-src={`${prefix}${dataSrc}.svg`} ref={(icon) => {this.icon = icon}}/>
			</div>
		);
	}
}

export default IconicIcon;
