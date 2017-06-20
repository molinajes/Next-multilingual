import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import ActorsList from '../Actor/ActorsList';
import PackageList from '../Package/PackageList';

import getItemFromArray from '../../utils/getItemFromArray';
import Package from '../Package/Package';

@inject('uiStore', 'requirementStore', 'packageStore')
@observer
class Model extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired,
		requirementStore: PropTypes.object.isRequired,
		packageStore: PropTypes.object.isRequired
	}
	
	render() {
		const {packageStore, uiStore} = this.props;
		let activePackage = uiStore.activePackage;
		let output;
		if(activePackage) {
			const packageData = getItemFromArray(packageStore.packageData, activePackage);
			if (packageData) {
				output = <Package packageData={packageData} />
			}
		}		

		return (			
			<div className="model__container">
				<div className="model__packagesActorsContainer">
					{/*<Packages />*/}
					<PackageList />
					<ActorsList />
				</div>
				<div className="model__packageContainer">
				
					{output}
					<div className="packageView__helpText">
						{
							output
							?
							"Create your Use Cases above.  Add steps and link components"
							:
							"You have no package selected."
						}
					</div>
				</div>
			</div>			
		);
	}
}

export default Model;
