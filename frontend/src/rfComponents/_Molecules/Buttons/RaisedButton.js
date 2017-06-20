import React, { Component } from 'react';

import BaseButton from './BaseButton';

class RaisedButton extends Component {

	render() {
		const {...other} = this.props;
		return (
			<BaseButton 
				isRaised
				{...other}
			/>
		);
	}
}

export default RaisedButton;

// Example is is BaseButton :)