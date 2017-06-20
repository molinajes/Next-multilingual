import React, { Component, PropTypes } from 'react';
import UseCaseActor from '../UseCase/UseCaseActor';
import IconPositioned from '../Iconic/IconPositioned';
import getIconicName from '../../utils/getIconicName';


import {observer, inject} from 'mobx-react';


@inject('actorStore','uiStore')
@observer
class ActorsList extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired,
		actorStore: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			hovered: false
		};
	}

	handleClick = () => {
		const {uiStore} = this.props;
		uiStore.setBottomBarDetails('actor', '');
	}

	mouseEnterEdit = () => {
		this.setState({hovered: true});
	}

	mouseLeaveEdit = () => {
		this.setState({hovered: false});
	}

	render() {

		const {actorStore } = this.props;

		const actors = actorStore.actorData.map((actor) => {
			return <UseCaseActor actorData={actor} key={actor.persistent_id} />
		})

				return (
					<div className="actorList__container">
					<div className="package__header">
						<IconPositioned 
							iconSize="40" 
							iconicType={getIconicName('actor')} />{/* TODO: Replace with Diagram thumbnail | AjH */}
						Actors
						
					
					</div>
						<div 
							className="actorEditor__table actorList__table" 
							onClick={this.handleClick}
							onMouseOver={this.mouseEnterEdit}
							onMouseLeave={this.mouseLeaveEdit}>
							
							{actors}

							<div className='actorList__edit' style={this.state.hovered ? {opacity: '1'} : {opacity: '0'}}>
								Edit
								<IconPositioned 
									iconSize='40'
									iconicType={getIconicName('edit')} />
							</div>
						</div>
						<div className="actorList__helpText">
							Actors are people or software who 'act' on your app.
						</div>
					</div>
				);
		}
}

export default ActorsList;

