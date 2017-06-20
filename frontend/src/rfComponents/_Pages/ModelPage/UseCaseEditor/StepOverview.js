import React, { Component, PropTypes } from "react";
import { observer } from "mobx-react";

import SlideOutput from './SlideOutput';
import { Div } from "glamorous";

import StepActor from '../../../../components/Steps/StepActor';
import StepText from '../../../../components/Steps/StepText';
import StepResult from '../../../../components/Steps/StepResult';
import ComponentSelector from '../../../../components/Component/ComponentSelector';

import fetchLinkedComponents from '../../../../utils/fetchLinkedComponents';


@observer
class StepOverview extends Component {

	propTypes = {
		data: PropTypes.object.isRequired,
	}


	render() {
		const {data} = this.props;

		const linkedComponents = fetchLinkedComponents(data.persistent_id, 'step');

		return (
			<div>
				<SlideOutput data={data} linkedComponents={linkedComponents}/>
				<Div
					maxWidth="5rem"
				>
					<StepActor stepData={data} />
				</Div>
				<StepText stepData={data} disabled={data.loading} />
				<StepResult stepData={data} disabled={data.loading} />
				<Div
					maxWidth="15rem"
					display="flex"
					flexDirection="row"
				>
					Select Interface: 
					<ComponentSelector 
						componentType='iface' 
						parentType='step' 
						parentData={data} 
						parentLoading={data.loading} />
				</Div>
			</div>
		);
	}
}
export default StepOverview;
