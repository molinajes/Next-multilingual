import React, { PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import InputField_Auto from '../Editable/InputField_Auto';

import IconPositioned from '../Iconic/IconPositioned';

@inject('projectStore')
@observer
class CreateCollaborator extends React.Component {

	static propTypes = {
		projectStore: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			email: ''
		}
	}

	handleChangeFirst = (e) => {
		this.setState({
			firstName: e.target.value
		})
	}

	handleChangeLast = (e) => {
		this.setState({
			lastName: e.target.value
		})
	}

	handleChangeEmail = (e) => {
		this.setState({
			email: e.target.value
		})
	}

	handleSend = () => {
		const {projectStore} = this.props;
		const {firstName, lastName, email} = this.state;
		projectStore.addCollaborator(firstName, lastName, email);
		this.setState({
			firstName: '',
			lastName: '',
			email: ''
		})
	}

	render() {
		
		return (
			<div className="overviewEditor__row createCollaborators__row">

				<div className="overviewEditor__cell">
					<IconPositioned
						iconSize='32'
						iconicType='plus-thin-sm'
						iconColor='primary' />
					<InputField_Auto
						value={this.state.firstName}
						placeholder="First Name"
						onChange={this.handleChangeFirst}
						inputClass={"inputClass"}
						formClass={"formClass"}
						divClass={"formEditorRow__inputDiv"}
						/>
					<InputField_Auto
						value={this.state.lastName}
						placeholder="Last Name"
						onChange={this.handleChangeLast}
						inputClass={"inputClass"}
						formClass={"formClass"}
						divClass={"formEditorRow__inputDiv"}
						/>
					<InputField_Auto
						value={this.state.email}
						placeholder="Email"
						onChange={this.handleChangeEmail}
						inputClass={"inputClass"}
						formClass={"formClass"}
						divClass={"formEditorRow__inputDiv"}
						/>
					<IconPositioned
						iconSize='32'
						iconicType='envelope-closed-sm'
						iconColor='primary' 
						onClick={this.handleSend}
					/>

				</div>

			</div>
			);
	}

}

export default CreateCollaborator;
