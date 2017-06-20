import React, { Component, PropTypes } from 'react';
import {observer} from 'mobx-react';

// import IconicIcon from '../../../Iconic/IconicIcon';

// @inject('uiStore')
@observer
class ObjectPropertyOutput extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		parentNumber: PropTypes.string.isRequired
	}

	render() {
		const {data, parentNumber} = this.props;

		return (
			<div className="objectEditor__row objectOutput__row">
				<div className="objectEditor__cell">#</div>
				<div className="objectEditor__cell">
					{data.name}
				</div>
				<div className="objectEditor__cell">
					{data.text}
				</div>
				<div className="objectEditor__cell">
					OP-{parentNumber}.{data.number}
				</div>
			</div>
		);
	}
}

export default ObjectPropertyOutput;
