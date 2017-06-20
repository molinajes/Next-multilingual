import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import IconPositioned from '../Iconic/IconPositioned';
import InputField_Submit from '../Editable/InputField_Submit';

import getIconicName from '../../utils/getIconicName';

@inject('requirementStore')
@observer
class CreateRequirement extends Component {
	static propTypes = {
		groupId: PropTypes.string.isRequired,
		requirementStore: PropTypes.object.isRequired,
		number: PropTypes.number.isRequired,
		disabled: PropTypes.bool
	}

	static defaultProps = {
		disabled: false
	}

	handleSubmit = (value) => {
		const {groupId, requirementStore, number} = this.props;
		requirementStore.createRequirement(value, groupId, number);
	}

	render() {
		const {disabled} = this.props;
		return (
			// TODO: sort out class name below
			<div className={"requirement__requirement requirement--create"}>				
				<div className={"requirement__row"}>
					<div className="requirement__typeColumn">
						<div className={"requirement__type" }>
							<IconPositioned 
								iconSize="40" 
								iconicType={getIconicName('add')} 
								iconHoverColor='orange' />
						</div>
						</div>
					<div className="requirement__title">
						<InputField_Submit
							divClass="requirement__nameInput"
							placeholder="Create Requirement"
							disabled={disabled}						
							onSubmit={this.handleSubmit}/>
					</div>
				</div>			
			</div>
		);
	}
}

export default CreateRequirement;
