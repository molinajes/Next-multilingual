import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import IconPositioned from '../Iconic/IconPositioned';
import getIconicName from '../../utils/getIconicName';

@inject('uiStore')
@observer
class UseCaseActor extends Component {
	static propTypes = {
		actorData: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			hovered: false
		}
	}

	render() {
		const {actorData} = this.props;

		

		return (

			<div 
				className="actorEditor__row"
						onMouseOver={this.mouseEnterEdit}
						onMouseLeave={this.mouseLeaveEdit} > 	
				<div className="actorEditor__cell actorEditor__cell--text">
					<IconPositioned iconSize="40" iconicType={getIconicName('actor')} />				
				</div>
				<div className="actorEditor__cell actorEditor__cell--text">{actorData.name}</div>
			</div>	
		);
	}
}

export default UseCaseActor;
