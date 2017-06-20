import React, { Component, PropTypes } from 'react';
import {observer} from 'mobx-react';

// import IconicIcon from '../../../Iconic/IconicIcon';

// @inject('uiStore')
@observer
class FormPropertyOutput extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired
	}

	render() {
		const {data} = this.props;

		return (
			<div className="formEditor__row formOutput__row">
				<div className="formEditor__cell formEditor__cell--text">#</div>
				<div className="formEditor__cell">
					{data.name ? data.name : <span style={{opacity: 0.5}}>(Empty)</span>}
				</div>
				<div className="formEditor__cell">
					{data.text3 ? data.text3 : <span style={{opacity: 0.5}}>(Empty)</span>}
				</div>
				<div className="formEditor__cell">
					{data.text2 ? data.text2 : <span style={{opacity: 0.5}}>(Empty)</span>}
				</div>				
				<div className="formEditor__cell formEditor__cell--text">
					{data.flag === '1' ? 'Yes' : 'No'}
				</div>
				<div className="formEditor__cell">
					{data.text ? data.text : <span style={{opacity: 0.5}}>(Empty)</span>}
				</div>
			</div>
		);
	}
}

export default FormPropertyOutput;
