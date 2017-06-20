import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import CreatePackage from './CreatePackage';
import PackageListItem from './PackageListItem';

@inject('packageStore')
@observer
class PackageList extends Component {
	static propTypes = {
		packageStore: PropTypes.object.isRequired
	}

	render() {
		const {packageStore} = this.props;
		let packageTitles;
		packageTitles = packageStore.packageData.map((currentPackage) => {
			return <PackageListItem packageData={currentPackage} key={currentPackage.id}/>
		})
		return (
			<div className="packageList__container">
				{packageTitles}
				<CreatePackage />
				<div className="packageList__helpText">
					Use Cases are grouped together by similar activity into packages.
				</div>
			</div>
		);
	}
}

export default PackageList;
