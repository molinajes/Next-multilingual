import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';
import IconPositioned from '../Iconic/IconPositioned';

import InputField_Submit from '../Editable/InputField_Submit';
import getIconicName from '../../utils/getIconicName';

window.text = getIconicName;

@inject('requirementStore')
@observer
class CreateGroup extends Component {
	static propTypes = {
		requirementStore: PropTypes.object.isRequired
	}

	handleSubmit = (value) => {
		const {requirementStore} = this.props;
		requirementStore.createGroup(value);
	}

	render() {
		return (
			<div className="group__container" style={{opacity: 0.88}}>
				<div className="group__banner group__banner--create">
					<IconPositioned 
						iconSize={'40'} 
						iconicType={getIconicName('add')} />
					<InputField_Submit
						divClass="group__nameInput"
						placeholder="Create New Module"
						onSubmit={this.handleSubmit}/>
				</div>
				<div className="group__content">
					
				</div>
			</div>
		);
	}
}

export default CreateGroup;
