import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import InputField_Submit from '../Editable/InputField_Submit';
import IconPositioned from '../Iconic/IconPositioned';

@inject('actorStore')
@observer
class CreateActor extends Component {
	static propTypes = {
		actorStore: PropTypes.object.isRequired,
		onChangeActors: PropTypes.func.isRequired
	}

	handleSubmit = (value) => {
		const {actorStore, onChangeActors} = this.props;
		actorStore.createActor(value);
		onChangeActors();
	}

	render() {
		return (
			<div className="actorEditor__row actorEditor__row--hover">
				<div className="actorEditor__cell">
					<IconPositioned 
						iconSize={'40'} 
						iconColor={'primary'} 
						iconicType={'plus-thin-sm'}  />
				</div>
				<div className="actorEditor__addRowCell">
					<InputField_Submit 
						value={''}
						onSubmit={this.handleSubmit}
						placeholder={"Add a new actor"}
						inputClass={""}
						formClass={""}
						divClass={"actorEditorRow__inputDiv--add"} />
				</div>

			</div>
		);
	}
}

export default CreateActor;
