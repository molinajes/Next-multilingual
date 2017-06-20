import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';
import IconicIcon from '../Iconic/IconicIcon';

import Package from './Package';
import CreatePackage from './CreatePackage';



@inject('packageStore')
@observer
class PackageSidebar extends Component {
	static propTypes = {
		packageStore: PropTypes.object.isRequired
	}

	render() {
		const {packageStore} = this.props;
		let packages;
		// console.log(requirementStore.requirementData.packages);
		packages = packageStore.packageData.map((currentPackage) => {
			return <Package packageData={currentPackage} key={currentPackage.id}/>
		})
		return (
			<div className="packages__container">
				<div className="packages__banner">
					<IconicIcon dataSrc={'fire-sm'} iconClass={'componentView__bannerIcons'} />
					Groups of Use Cases
				</div>
				{packages}
				<CreatePackage />
			</div>
		);
	}
}

export default PackageSidebar;
