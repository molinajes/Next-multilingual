import React, { Component, PropTypes } from 'react';
import IconPositioned from '../../../Iconic/IconPositioned.js';

import getIconicName from '../../../../utils/getIconicName';

import {observer} from 'mobx-react';

import StepOutput from '../Step/StepOutput';


@observer
class FlowOutput extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired
	}

	render() {
		const {data} = this.props;

		const steps = data.children.map((step, index )=> {
			return <StepOutput data={step} flowName={index === 0 ? data.name : ' '} step={step.id} key={step.persistent_id}/>
		})

		return (
			<div className="flowOutput__container output__nestedComponent">
				
				<div className="output__componentTitle" style={{paddingLeft: '1.125rem'}}>
						<IconPositioned 
							iconSize="32" 
							iconicType={getIconicName('step')}
							iconColor='orange'/>
					<h4 className="rf-h4"><span className="rf-highlight">{data.name} </span>- Activity Flow</h4>
				</div>

				<div className="flowOutput__table">
					<div className="flowOutput__tableHead">
						<div className="stepOutput__step flowOutput__cell">Step</div>
						<div className="stepOutput__activity flowOutput__cell">Activity</div>
						<div className="stepOutput__components flowOutput__cell">Components Used</div>
					</div>
					{steps.length > 0 ? steps : <p className="rf-p" style={{opacity: 0.5}}>(No Steps)</p>}
				</div>
			</div>
		);
	}
}

export default FlowOutput;
