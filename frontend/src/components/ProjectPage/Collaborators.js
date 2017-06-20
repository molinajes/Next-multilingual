import React, { PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import IconPositioned from '../Iconic/IconPositioned';

@inject('projectStore')
@observer
class Collaborators extends React.Component {

	static propTypes = {
		projectStore: PropTypes.object.isRequired,
		collaboratorData: PropTypes.object.isRequired
	}

	handleDelete = () => {
		const {projectStore, collaboratorData} = this.props;
		projectStore.deleteCollaborator(collaboratorData.follower_id)

	}

	render() {
		const { collaboratorData, projectStore } = this.props;

		return (
			<div className="overviewEditor__row collaborators__row">
				<div className="overviewEditor__cell">
					<IconPositioned
						iconSize='32'
						iconicType='person-genderless-sm'
						iconColor='primary' />
				</div>
				<div className="overviewEditor__cell">{`${collaboratorData.firstname} ${collaboratorData.lastname}`}</div>
				<div className="overviewEditor__cell">{collaboratorData.confirmed === '0' ? 'Pending' : 'Confirmed'}</div>
				{/*<div className="overviewEditor__cell">Coming Soon</div>*/}
				<div className="overviewEditor__cell">{collaboratorData.email}</div>
				{projectStore.projectDetails.role === 0 && (
					<div className="overviewEditor__cell">					
							<IconPositioned 
								onClick={this.handleDelete}
								iconSize='40' 
								iconicType='trash-sm'
								iconHoverColor='yellow'  />
					</div>
				)}
				</div>
				
			);
	}

}

export default Collaborators;
