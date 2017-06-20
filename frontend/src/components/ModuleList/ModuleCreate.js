import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';
import IconPositioned from '../Iconic/IconPositioned';

import InputField from '../Editable/InputField_Submit';

@inject('requirementStore')
@observer
class ModuleCreate extends Component {
	static propTypes = {
		requirementStore: PropTypes.object.isRequired
	}

	onSubmit = (value) => {
		const {requirementStore} = this.props;
		requirementStore.createGroup(value);
	}


	render() {
		return (
			<div className="moduleTitle__tile" style={{opacity: 0.54}}> {/* FIXME: Jack we need to work out a better way to opacity in these situations | AjH */}
					<IconPositioned 
						iconSize='40'
						iconicType='plus-thin-sm' />
				<div className="moduleTitle__name">
				<InputField 
						onSubmit={this.onSubmit}
						placeholder={"Create a new module"}
						inputClass={"inputClass"}
						formClass={"formClass"}
						divClass={"moduleTitle__createInput"} />
				</div>
			</div>
		);
	}
}

export default ModuleCreate;
