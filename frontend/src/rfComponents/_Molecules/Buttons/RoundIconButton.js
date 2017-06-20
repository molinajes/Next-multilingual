import React, { Component } from 'react';

import BaseButton from './BaseButton';

class RoundIconButton extends Component {

	render() {
		const {...other} = this.props;
		return (
			<BaseButton 
				isRaised
				css={{borderRadius: '50%', padding: '0.25rem'}}
				{...other}
			/>
		);
	}
}

export default RoundIconButton;
