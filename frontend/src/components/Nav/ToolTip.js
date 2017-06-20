import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

@inject('uiStore')
@observer
class ToolTip extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired
	}

	render() {
		const {uiStore} = this.props;
		return (
			<span className="pageNav__tooltip">
				{uiStore.activeTooltipMessage} || ?
			</span>
		);
	}
}

export default ToolTip;
