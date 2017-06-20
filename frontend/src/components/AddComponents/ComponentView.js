import React, { Component, PropTypes } from 'react';
import ComponentGroup from './ComponentGroup';
import {observer, inject} from 'mobx-react';

@inject('ruleStore', 'formStore', 'objectStore', 'ifaceStore')
@observer
class ComponentView extends Component {
	static propTypes = {
		ruleStore: PropTypes.object.isRequired,
		formStore: PropTypes.object.isRequired,
		objectStore: PropTypes.object.isRequired,
		ifaceStore: PropTypes.object.isRequired
	}


	render() {
		const {
			ruleStore,
			formStore,
			objectStore,
			ifaceStore
		} = this.props;
		// const {requirementStore} = this.props;
		// let groups = null;
		// groups = requirementStore.requirementData.components.map((componentType) => {
		// 	return <ComponentGroup data={{name: "Interfaces"}} key={`interfaces`}/>
		// });

		return (
			<div className="componentView__container" onClick={this.handleClick}>

				<ComponentGroup storeData={ifaceStore.ifaceData}  componentType={`iface`} >
					<div className="componentView__helpText">
						Interfaces can be wireframes or full mockups of desktop, mobile or any interface
					</div>
				</ComponentGroup>
				<ComponentGroup storeData={ruleStore.ruleData} componentType={`rule`}>
					<div className="componentView__helpText">
						Business Rules detail the logic and specifications of activity and definitions in the app
					</div>
				</ComponentGroup>
				<ComponentGroup storeData={formStore.formData} componentType={`form`}>
					<div className="componentView__helpText">
						Forms define fields and areas for actor inputted information
					</div>
				</ComponentGroup>
				<ComponentGroup storeData={objectStore.objectData} componentType={`object`}>
					<div className="componentView__helpText">
						Objects things that are used by the application, like customers, or bookings
					</div>
				</ComponentGroup>
			</div>
		);
	}
}

export default ComponentView;
