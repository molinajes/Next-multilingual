import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import InputField from '../../Editable/InputField_Submit';

@inject('categoryStore')
@observer
class ReleaseCreateSection extends Component {
	static propTypes = {
		categoryStore: PropTypes.object.isRequired,
		flag: PropTypes.string.isRequired
	}

	handleSubmit = (value) => {
		const {categoryStore, flag} = this.props;
		categoryStore.createCategory(value, flag);
	}


	render() {
		return (
			<div className="releaseContent__container" style={{opacity: 0.54}}>
				<InputField 
					value={''}
					onSubmit={this.handleSubmit}
					label={"Add new section"}
					placeholder={"Name of new section"}
					inputClass={""}
					formClass={""}
					divClass={'releaseCreateSection__input'}
					iconicType={'plus-thin-sm'}
					iconSize="32"
				/>
			</div>
		);
	}
}

export default ReleaseCreateSection;
