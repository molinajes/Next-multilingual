import React, { Component, PropTypes } from 'react';
import IconicIcon from '../Iconic/IconicIcon';

import {observer} from 'mobx-react';

// @inject('uiStore')
@observer
class DetailCollapsor extends Component {
	static propTypes = {
		requirementId: PropTypes.string.isRequired
	}

	handleClick = () => {
		// const {requirementId, uiStore} = this.props;		
	}

	render() {
		return (
			<div className="requirement__collapsor" onClick={this.handleClick}>
				<IconicIcon dataSrc={'collapse-down-sm'} iconClass={''} />
			</div>
		);
	}
}

export default DetailCollapsor;
