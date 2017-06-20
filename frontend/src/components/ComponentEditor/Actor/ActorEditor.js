import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import Actor from './Actor';
import ActorInheritanceDiagram from '../../Actor/ActorInheritanceDiagram';
import CreateActor from '../../Actor/CreateActor';

import IconPositioned from '../../Iconic/IconPositioned';
import getIconicName from '../../../utils/getIconicName';


@inject('actorStore')
@observer
class ActorEditor extends Component {
	static propTypes = {
		// componentData: PropTypes.object.isRequired,
		actorStore: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			mounted: false,
			diagramKey: Math.random()
		}
	}

	componentDidMount = () => {
		this.setState({
			mounted: true
		})
	}

	handleUpdateActors = () => {
		this.setState({
			diagramKey: Math.random()
		})
	}

	render() {
		const {actorStore} = this.props;

		const actors = actorStore.actorData.map(actor => {
			return <Actor componentData={actor} onChangeActors={this.handleUpdateActors} key={actor.persistent_id}/>
		})

		return (
			<div className="formEditor__container">
				<div className="componentEditorModal__sectionTitle--center">
					<IconPositioned 
					iconSize='40' 
					iconicType={getIconicName('actor')}  />
					Edit the project actors below
				</div>
				<div className="formEditor__sectionContent">
					<div className="actorEditor__table">
						<div className="actorEditor__tableHead">
							<div className="actorEditor__cell actorEditor__cell--text">#</div>
							<div className="actorEditor__cell">Actor Name</div>
							<div className="actorEditor__cell">Alias</div>
							<div className="actorEditor__cell">Inheritance</div>
							<div className="actorEditor__cell">Description</div>
							<div className="actorEditor__cell">Pre-test</div>
							<div className="actorEditor__cell">Merge</div>
						</div>
					{actors}
					<CreateActor onChangeActors={this.handleUpdateActors}/>
					</div>
					<div className="componentEditorModal__sectionTitle--center">
						<IconPositioned 
						iconSize='40' 
						iconicType={getIconicName('actor')}  />
						Actor Inheritance Diagram
					</div>
					{this.state.mounted ? <ActorInheritanceDiagram key={this.state.diagramKey}/> : 'Loading Actor Diagram'}
				</div>
			</div>
		);
	}
}

export default ActorEditor;
