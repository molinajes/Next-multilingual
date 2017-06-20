import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import InputField_Auto from '../Editable/InputField_Auto';


@inject('requirementStore')
@observer
class DetailTitle extends Component {
	static propTypes = {
		detailData: PropTypes.object.isRequired,
		requirementStore: PropTypes.object.isRequired
	}

	componentDidUpdate = () => {
		if(this.textInput) this.textInput.focus();
	}

	handleSubmit = (value) => {
		const {requirementStore, detailData} = this.props;
		requirementStore.updateBasic(detailData.persistent_id, 'detail', value, 'name');
	}

	render() {
		const {detailData} = this.props;

		return (
			<div className="requirementTitle__container" >
				<InputField_Auto
					divClass="requirement__nameInput"
					placeholder="Detail Title"
					value={detailData.name}
					onSubmit={this.handleSubmit}/>
			</div>
		)

	}
}

export default DetailTitle;
