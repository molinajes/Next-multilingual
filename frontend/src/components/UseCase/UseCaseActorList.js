import React, { Component, PropTypes } from 'react';
import {observer} from 'mobx-react';

import UseCaseActor from './UseCaseActor';


// @inject('actorStore')
@observer
class UseCaseActorList extends Component {
	static propTypes = {
		actorList: PropTypes.array.isRequired
		// actorStore: PropTypes.object.isRequired
	}

	render() {
		const {actorList} = this.props;

		let actors = actorList.map(actor => {
			return <UseCaseActor actorData={actor} key={actor.id} />
		})

		return (
			<div className="useCase__actors">
				{actors}
			</div>
		);
	}
}

export default UseCaseActorList;
