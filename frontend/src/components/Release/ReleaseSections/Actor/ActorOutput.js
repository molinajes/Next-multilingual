import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import getItemFromArray from '../../../../utils/getItemFromArray';
import getIconicName from '../../../../utils/getIconicName';

import IconPositioned from '../../../Iconic/IconPositioned';

@inject('actorStore', 'uiStore')
@observer
class ActorOutput extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		actorStore: PropTypes.object.isRequired
	}

	

	render() {
		const {data, actorStore} = this.props;
		const parent = getItemFromArray(actorStore.actorData, data.parent_id)

		return (
			<div className="actorEditor__row actorOutput__row">
				
				<div className="actorEditor__cell actorEditor__cell--text">
					<IconPositioned 
						iconSize={'40'} 
						iconColor={'primary'} 
						iconicType={getIconicName('actor')}  />
				</div>
				<div className="actorEditor__cell">
					{data.name}
				</div>
				<div className="actorEditor__cell">
					{data.text3}
				</div>
				<div className="actorEditor__cell">
					{!parent ? '-' : parent.name}
				</div>
				<div className="actorEditor__cell">
					{data.text}
				</div>
				<div className="actorEditor__cell">
					{data.text2}
				</div>
			</div>
		);
	}
}

export default ActorOutput;
