// TODO: Create a component the same as GroupTag | AjH
import React, { Component } from 'react';

import BaseButton from './BaseButton';

class TransparentButton extends Component {

	render() {
		const {...other} = this.props;
		return (
			<BaseButton 				
				bgColor={'transparent'}
				{...other}
			/>
		);
	}
}

export default TransparentButton;