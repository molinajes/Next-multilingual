import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import InputField_Auto from '../Editable/InputField_Auto';
import getIconicName from '../../utils/getIconicName';
import IconPositioned from '../Iconic/IconPositioned';

@inject('userStore')
@observer
class UserSettings extends Component {
	static propTypes = {
		userStore: PropTypes.object.isRequired
	}

	handleSubmitFirstName = (value) => {
		const {userStore} = this.props;
		userStore.updateUserDetails('firstname', value);

	}

	handleSubmitLastName = (value) => {
		const {userStore} = this.props;
		userStore.updateUserDetails('lastname', value);
	}

	handleFeedback = () => {
		window.Intercom('show');
	}

	render() {
		const {userStore} = this.props;

		const formattedDate = new Date(userStore.userDetails.valid_until).toDateString();

		return (
			<div>
				<div className="userSettings__detail">
					<InputField_Auto 
						value={userStore.userDetails.firstname}
						divClass="userSettings__name"
						onSubmit={this.handleSubmitFirstName}
						label={"First Name"} />
					<InputField_Auto 
						value={userStore.userDetails.lastname}
						divClass="userSettings__name"
						onSubmit={this.handleSubmitLastName}
						label={"Last Name"} />
					<div className="userSettings__logout">
						<a href="/app/site/logout">
							<label className="userSettings__logoutLabel">
								Logout
							</label> 
							<IconPositioned 
								iconSize='40'
								iconHoverColor='yellow'
								iconicType={getIconicName('logout')} />
						</a>
					</div>
				</div>
				<div>
					Account Valid Until: {formattedDate}
				</div>
				<div className="userSettings__feedback">
					<div>We're in beta! We'd love to hear your feedback.</div>
					<div className="userSettings__feedbackButton" onClick={this.handleFeedback}>
						Send quick feedback 
						<IconPositioned 
							iconSize='24'
							iconicType="heart-sm" />
					</div>
				</div>
			</div>
		);
	}
}

export default UserSettings;
