import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import IconPositioned from '../../Iconic/IconPositioned';

@inject( 'requirementStore', 'traceStore', )
@observer
class LinkedRequirements extends Component {
	static propTypes = {
		requirementStore: PropTypes.object.isRequired,
		componentData: PropTypes.object.isRequired,
		traceStore: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			hovered: false
		}
	}

	mouseEnterEdit = () => {
		this.setState({hovered: true});
	}

	mouseLeaveEdit = () => {
		this.setState({hovered: false});
	}

	render() {

		const {traceStore, requirementStore, componentData} = this.props;

		let linkedRequirements = [];
		const traces = traceStore.traceData.filter(trace => {
			return trace.related1_id === componentData.persistent_id && trace.type === componentData.object;
		});
		requirementStore.requirementData.forEach(req => {
			if (traces.some(trace => {
				return trace.parent_id === req.persistent_id;
			})) {
				linkedRequirements.push(req);
			}
		})
		requirementStore.detailData.forEach(req => {
			if (traces.some(trace => {
				return trace.parent_id === req.persistent_id;
			})) {
				linkedRequirements.push(req);
			}
		})
		let linkedOutput = linkedRequirements.map(req => {
			return (
				<div className={"linkedUsage__item"} key={req.id}>						
					<IconPositioned iconSize="32" iconicType={'chat-sm'}  iconHoverColor='mango' />
					<div className="linkedUsage__itemName">
						{req.name}							
					</div>
				</div>
			)
		})

		return (
			<div className="linkedUsage__container">
				<div className="linkedUsage__title">
					<IconPositioned 
					iconSize='40' 
					iconicType='link-intact-sm'  />
					Linked Requirements
				</div>
				<div className="linkedUsage__content">
					{/*<div className={"linkedUsage__item"} onMouseOver={this.mouseEnterEdit} onMouseLeave={this.mouseLeaveEdit}>						
						<IconSwitch 
						iconSize='32' 
						override={this.state.hovered}
						iconicType='link-intact-sm'
						iconicHoverType='plus-thin-sm' />
						<div className="linkedUsage__itemName">
							Link to a requirement							
						</div>
					</div>*/}
					{linkedOutput.length ? linkedOutput : 'Not Linked to any Requirements'}
				</div>
			</div>
		);
	}
}

export default LinkedRequirements;
