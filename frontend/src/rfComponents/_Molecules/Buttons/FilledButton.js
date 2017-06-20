import React, { Component, PropTypes } from 'react';

import BaseButton from './BaseButton';

class FilledButton extends Component {

	render() {
		const {bgColor, textColor, ...other} = this.props;
		return (
			<BaseButton 
				
				{...other}
			/>
		);
	}
}

export default FilledButton;
