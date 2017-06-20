import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';
import IconPositioned from '../Iconic/IconPositioned';

@inject('stepStore', 'actorStore')
@observer
class CreateStep extends Component {
	static propTypes = {
		number: PropTypes.number.isRequired,
		stepStore: PropTypes.object.isRequired,
		actorStore: PropTypes.object.isRequired,
		flowData: PropTypes.object.isRequired
	}

	handleAdd = () => {
		const {stepStore, flowData, number, actorStore} = this.props;
		stepStore.createStep(actorStore.actorData[0].persistent_id, flowData.persistent_id, '', '', number);
	}

	render() {
		return (
			
			<div className="step" style={{opacity:'0.4'}} onClick={this.handleAdd}>
				<div className="step__detailContainer">
					<div className="step__number">
						<IconPositioned iconSize="40" iconicType={'plus-thin-sm'}  />
					</div>
					
					{/*<div className="step__actor">
						<StepActor stepData={stepData} />
					</div>*/}
					<div className="step__components">
						{/*<ComponentSelector componentType='iface' parentType='step' parentData={stepData} />
						<ComponentSelector componentType='rule' parentType='step' parentData={stepData} />
						<ComponentSelector componentType='form' parentType='step' parentData={stepData} />
						<ComponentSelector componentType='object' parentType='step' parentData={stepData} />*/}
					</div>
				</div>
					<div className="step__activity">
						{/*<IconPositioned 
						iconSize="40" 
						iconicType={'fork-sm'} 
						iconHoverColor='yellow' 
						onClick={this.handleFork} />*/}

						
						<div className="stepText__inputField" style={{paddingLeft: '3rem'}}>
							Click to add
						</div>
					</div>

					<div className="step__activity">
						{/*<DeleteObject data={stepData} onDelete={this.handleDelete}/>*/}

						<div className="stepText__inputField" style={{paddingLeft: '3rem'}}>
							a new step
						</div>
					</div>

				{/*
				<ComponentSelector componentType='iface' parentType='steps' parentData={stepData} traceData={traceData.iface}/>
				<ComponentSelector componentType='rule' parentType='steps' parentData={stepData} traceData={traceData.rule}/>
				<ComponentSelector componentType='form' parentType='steps' parentData={stepData} traceData={traceData.form}/>
				*/}

			</div>
		);
	}
}

export default CreateStep;
