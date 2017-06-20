import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';
import {Link} from 'react-router';

import IconPositioned from '../../../Iconic/IconPositioned.js';
import IconSwitch from '../../../Iconic/IconSwitch';

import fetchLinkedComponents from '../../../../utils/fetchLinkedComponents';
import getItemFromArray from '../../../../utils/getItemFromArray';

const slug = '/app/output'

@inject('actorStore')
@observer
class StepOutput extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		actorStore: PropTypes.object.isRequired,
		flowName: PropTypes.string.isRequired
	}

	render() {
		const {data, actorStore} = this.props;

		const linkedComponents = fetchLinkedComponents(data.persistent_id, 'step');

		const rules = linkedComponents.rule.map(comp => {
			return (
				<div className="stepOutput__componentItem" key={`rule_${comp.persistent_id}`}>
					<IconSwitch 
						iconSize='24'
						iconicType='cogs-sm'
						iconicHoverType='tools-sm' />
					<div className="stepOutput__componentName" key={comp.id}>
						<div className="rf-p">
							<Link to={`${slug}#rule_${comp.persistent_id}`}>{comp.name}</Link>
						</div>
					</div>
				</div>
				);
		})
		const forms = linkedComponents.form.map(comp => {
			return (
				<div className="stepOutput__componentItem" key={`form_${comp.persistent_id}`}>
					<IconSwitch 
						iconSize='24'
						iconicType='list-rich-sm'
						iconicHoverType='tools-sm' />
					<div className="stepOutput__componentName" key={comp.id}>
						<div className="rf-p">
							<Link to={`${slug}#form_${comp.persistent_id}`}>{comp.name}</Link>
						</div>
					</div>
				</div>
				);
		})
		const objects = linkedComponents.object.map(comp => {
			return (
				<div className="stepOutput__componentItem" key={`object_${comp.persistent_id}`}>
					<IconSwitch 
						iconSize='24'
						iconicType='connections-sm'
						iconicHoverType='tools-sm' />
					<div className="stepOutput__componentName" key={comp.id}>
						<div className="rf-p">
							<Link to={`${slug}#object_${comp.persistent_id}`}>{comp.name}</Link>
						</div>
					</div>
				</div>
				);
		})
		const ifaces = linkedComponents.iface.map(comp => {
			return (
				<div className="stepOutput__componentItem" key={`iface_${comp.persistent_id}`}>
					<IconSwitch 
						iconSize='24'
						iconicType='laptop-sm'
						iconicHoverType='tools-sm' />
					<div className="stepOutput__componentName" key={comp.id}>
						<div className="rf-p">
							<Link to={`${slug}#iface_${comp.persistent_id}`}>{comp.name}</Link>
						</div>
					</div>
				</div>
				);
		})

		const actorData = getItemFromArray(actorStore.actorData, data.related1_id);
		const actorName = actorData ? actorData.name : '-';

		return (
			<div className="stepOutput__tableRow">
				<div className="stepOutput__step flowOutput__cell">
					<p className="rf-h1">{data.number}</p>
				</div>
				<div className="stepOutput__activity flowOutput__cell">
					
					<div className="stepOutput__action">
							<IconPositioned 
								iconSize="24" 
								iconicType={'person-genderless-sm'}/>
						<p className="rf-p rf-p--sb">{actorName} action:&nbsp;</p>
						<p className="rf-p"> {data.text}</p>
					</div>

					<div className="stepOutput__response">
						<IconPositioned 
							iconSize="24" 
							iconicType={'terminal-sm'}/>
						<p className="rf-p rf-p--sb">Response:&nbsp;</p>
						<p className="rf-p">{data.text2}</p>
					</div>
				</div>

				<div className="stepOutput__components flowOutput__cell">
					{linkedComponents.iface.length > 0 && <div>{ifaces}</div> }
					{linkedComponents.rule.length > 0 && <div>{rules}</div> }
					{linkedComponents.form.length > 0 && <div>{forms}</div> }
					{linkedComponents.object.length > 0 && <div>{objects}</div> }
				</div>
			</div>
		);
	}
}

export default StepOutput;
