import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import FlowOutput from '../Flow/FlowOutput';
import IconPositioned from '../../../Iconic/IconPositioned';

import getItemFromArray from '../../../../utils/getItemFromArray';
import getIconicName from '../../../../utils/getIconicName';

@inject('uiStore', 'actorStore')
@observer
class UseCaseOutput extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired,
		actorStore: PropTypes.object.isRequired,
		packageNumber: PropTypes.string.isRequired
	}

	handleClickEdit = () => {
		const { data, uiStore } = this.props;		
		uiStore.setBottomBarDetails('useCase', data.persistent_id);
	}

	render() {
		const {data, packageNumber, actorStore} = this.props;

		const flows = data.children.map(flow => {
			return <FlowOutput data={flow} key={flow.persistent_id} />
		})

		let actorIds = [];

		// We need to get a list of the actors that are used in this use case.
		// We begin by pushing all the actor Ids on the steps into an array
		// and ensure each is only added once.
		data.children.forEach(flow => {
			flow.children.forEach(step => {
				if (!actorIds.some(actorId => {
					return actorId === step.related1_id;
				})) {
					actorIds.push(step.related1_id);
				}				
			})
		})

		// Once we have the unique actor ids we then fetch the corresponding
		// actor object from the actorStore and return their name.
		let actors = actorIds.reduce((output, id) => {
			const actor = getItemFromArray(actorStore.actorData, id);
			if (actor) {
				return output.concat(actor);
			}
			else {
				return output;
			}
		}, []).map(actor => {
			return <p className="rf-p" key={actor.persistent_id}>{actor.name}</p>
		})

		return (
			<div className="output__child">
				<div className="output__componentTitle">
					<IconPositioned 
						iconSize="40" 
						iconicType={getIconicName('useCase')}
						iconColor='orange'/>
					<h3 className="rf-h3"><span className="rf-highlight">{packageNumber}.{data.number} </span>- {data.name}</h3>
					{!IS_EXTERNAL_RELEASE && (
						<div className='releaseContent__editIcon' onClick={this.handleClickEdit}>
							<IconPositioned 
								iconSize="40" 
								iconicType={getIconicName('edit')} 
								iconHoverColor='orange'/>
						</div>
					)}
				</div>

				<div className="output__detailContainer">
					<div className="output__detailColumn">
						<h4 className="rf-h4">Description</h4>
						{data.text ? <p className="rf-p">{data.text}</p> : <p className="rf-p" style={{opacity: 0.5}}>(Empty Description)</p>}
						<h4 className="rf-h4">Preconditions</h4>
						{data.text2 ? <p className="rf-p">{data.text2}</p> : <p className="rf-p" style={{opacity: 0.5}}>(Empty Pre Condition)</p>}
						<h4 className="rf-h4">Actors</h4>
						{actors.length > 0 ? actors : <p className="rf-p" style={{opacity: 0.5}}>(No actors used)</p>}
					</div>

					{/*<div className="output__actorColumn">
						<label className="rf-label">Actors</label>
						<div className="output__inlineIcon">
							<IconPositioned 
								iconSize="40" 
								iconicType={'person-genderless-sm'}/>
						</div>
						<p className="rf-p">{data.related1_id}</p>
					</div>*/}
				</div>
				
				{flows.length > 0 ? flows : <p className="rf-p" style={{opacity: 0.5}}>(No Flows/Steps)</p>}	
						
			</div>
		);
	}
}

export default UseCaseOutput;
