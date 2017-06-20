import React, { Component, PropTypes } from 'react';
import {observer} from 'mobx-react';

// @inject('')
@observer
class SubNav extends Component {
	static propTypes = {
		children: PropTypes.array.isRequired
	}

	render() {
		return (
			<div className="pageNav__wrapper">
				<div className="pageNav__nav">
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default SubNav;
