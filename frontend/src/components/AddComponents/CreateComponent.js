import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';
import IconPositioned from '../Iconic/IconPositioned';

import InputField from '../Editable/InputField_Submit';

@inject('componentStore')
@observer
class CreateComponent extends Component {
	static propTypes = {
		componentStore: PropTypes.object.isRequired,
		componentType: PropTypes.string.isRequired
	}

	handleSubmitName = (value) => {
		const {
			componentType, 
			componentStore
		} = this.props;

		componentStore.createComponent(componentType, value);

	}

	render() {
		const {componentType} = this.props;

		const tileModifier = "addComponentsItem__tile--"+`${componentType}`;

		return (
			<div className={"addComponentsItem__tile "+tileModifier} style={{opacity: 0.72}}>
				<IconPositioned 
				iconSize='40' 
				iconicType='plus-thin-sm'  />
					<div className="addComponentsItem__name">
						<InputField
							value={''}
							placeholder="Add Component"
							onSubmit={this.handleSubmitName}
							inputClass={"inputClass"}
							formClass={"formClass"}
							divClass={"inputField__div"}
							/>
					</div>
			</div>
		);
	}
}

export default CreateComponent;
