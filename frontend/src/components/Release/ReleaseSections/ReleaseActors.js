import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import ActorOutput from './Actor/ActorOutput';
import Waypoint from 'react-waypoint';
import IconPositioned from '../../Iconic/IconPositioned';

import getIconicName from '../../../utils/getIconicName';

@inject('actorStore', 'uiStore')
@observer
class ReleaseActors extends Component {
	static propTypes = {
		actorStore: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired
	}

	handleWaypointEnter = () => {
		const {uiStore} = this.props;
		uiStore.setOutputScrollTo('actors','')
	}

	handleClickEdit = () => {
		const {uiStore} = this.props;
		uiStore.setBottomBarDetails('actor');
	}

	render() {
		const {actorStore} = this.props;

		const actors = actorStore.actorData.map(actor => {
			return <ActorOutput data={actor} key={actor.id}/>
		})

		return (
			<div className="releaseContent__container" id="actors">
				<h1 className="reqModel__title rf-h1">Actors</h1>
				<Waypoint
					onEnter={this.handleWaypointEnter}
					// onLeave={this.handleWaypointLeave}
				/>
					<label className="rf-label">Actors:</label>
					<p className="rf-p">Actors are people or software who 'act' on the 'system', or in other words, the users and bots who use the app directly.</p>
					{!IS_EXTERNAL_RELEASE && (
						<div className='releaseContent__editIcon' onClick={this.handleClickEdit}>
							<IconPositioned 
								iconSize="40" 
								iconicType={getIconicName('edit')} 
								iconHoverColor='orange'/>
						</div>
					)}
				<div className="releaseContent__componentGroup">
					{/*<div className="output__nestedComponent"></div>*/}
						<div className="actorEditor__table">
							<div className="actorEditor__tableHead">
								<div className="actorEditor__cell actorEditor__cell--text">#</div>
								<div className="actorEditor__cell">Actor Name</div>
								<div className="actorEditor__cell">Alias</div>
								<div className="actorEditor__cell">Inheritance</div>
								<div className="actorEditor__cell">Description</div>
								<div className="actorEditor__cell">Pre-test</div>
							</div>
						{actors}
						</div>
				</div>
			</div>
		);
	}
}

export default ReleaseActors;
