import React, { Component, PropTypes } from 'react';

class Iconic extends Component {
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
				<img key={dataSrc} data-src={`${prefix}${dataSrc}.svg`} ref={(icon) => {this.icon = icon}}/>
		);
	}
}

export default Iconic;
