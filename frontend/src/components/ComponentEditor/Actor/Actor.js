import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import Select from 'react-select';

import IconPositioned from '../../Iconic/IconPositioned';
import InputField_Auto from '../../Editable/InputField_Auto';
import TextAreaField from '../../Editable/TextAreaField';

import MergeActorConfirmation from './MergeActorConfirmation';

@inject('actorStore')
@observer
class Actor extends Component {
	static propTypes = {
		componentData: PropTypes.object.isRequired,
		actorStore: PropTypes.object.isRequired,
		onChangeActors: PropTypes.func.isRequired
	}

	handleSubmitName = (value) => {
		const {actorStore, componentData, onChangeActors} = this.props;
		actorStore.editActor(componentData.persistent_id, 'name', value);
		onChangeActors();
	}

	handleSubmitAlias = (value) => {
		const {actorStore, componentData} = this.props;
		actorStore.editActor(componentData.persistent_id, 'text3', value);
	}

	handleSubmitDescription = (value) => {
		const {actorStore, componentData} = this.props;
		actorStore.editActor(componentData.persistent_id, 'text', value);
	}

	handleSubmitPreTest = (value) => {
		const {actorStore, componentData} = this.props;
		actorStore.editActor(componentData.persistent_id, 'text2', value);
	}

	handleChangeParent = (data) => {
		const {actorStore, componentData, onChangeActors} = this.props;
		actorStore.editActor(componentData.persistent_id, 'parent_id', data.value);
		// actorStore.setUpdateActorDiagram(true);
		onChangeActors();
	}

	handleClickMerge = (id) => {
		const {actorStore, componentData, onChangeActors} = this.props;
		actorStore.mergeActor(componentData.persistent_id, id);
		onChangeActors();
	}

	render() {
		const {actorStore, componentData} = this.props;

		const options = actorStore.actorData.map(actor => {
			return {
				value: actor.persistent_id,
				label: actor.name
			}
		})

		options.push({
			value: '-1',
			label: 'None'
		})

		return (
			<div className="actorEditor__row">
				<div className="actorEditor__cell actorEditor__cell--text">
					<IconPositioned 
						iconSize={'40'} 
						iconColor={'primary'} 
						iconicType={'person-genderless-sm'}  />
				</div>
				<div className="actorEditor__cell">
					<InputField_Auto 
						value={componentData.name}
						onSubmit={this.handleSubmitName}
						placeholder={"Input Actor Name"}
						inputClass={"inputClass"}
						formClass={"formClass"}
						divClass={"actorEditorRow__inputDiv"} />
				</div>
				<div className="actorEditor__cell">
					<InputField_Auto 
						value={componentData.text3}
						onSubmit={this.handleSubmitAlias}
						placeholder={"Actor Alias"}
						inputClass={"inputClass"}
						formClass={"formClass"}
						divClass={"actorEditorRow__inputDiv"} />
				</div>
				<div className="actorEditor__cell">
					<Select
						name="actor-select"
						value={componentData.parent_id}
						options={options}
						onChange={this.handleChangeParent}
						placeholder={"Inherits..."}
						clearable={false} />
				</div>
				<div className="actorEditor__cell">
					<TextAreaField 
						value={componentData.text}
						onSubmit={this.handleSubmitDescription}
						placeholder={"Actor Description"}
						inputClass={"inputClass"}
						formClass={"textAreaField__form"}
						divClass={"actorEditorRow__inputDiv"} />
				</div>
				<div className="actorEditor__cell">
					<TextAreaField 
						value={componentData.text2}
						onSubmit={this.handleSubmitPreTest}
						placeholder={"Pre Condition for Test"}
						inputClass={"inputClass"}
						formClass={"textAreaField__form"}
						divClass={"actorEditorRow__inputDiv"} />
				</div>
				<div className="actorEditor__cell actorEditor__cell--text" >
					
					
					<MergeActorConfirmation
						toMergeId={componentData.persistent_id}
						onMerge={this.handleClickMerge}
					/>

				</div>
			</div>
		);
	}
}

export default Actor;
