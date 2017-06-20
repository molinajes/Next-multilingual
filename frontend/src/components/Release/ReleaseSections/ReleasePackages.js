import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import PackageOutput from './Package/PackageOutput';

@inject('packageStore')
@observer
class ReleasePackages extends Component {
	static propTypes = {
		packageStore: PropTypes.object.isRequired,
		selectedId: PropTypes.string
	}

	render() {
		const {packageStore, selectedId} = this.props;

		const packages = packageStore.packageData.map(currentPackage => {
			return <PackageOutput data={currentPackage} selectedId={selectedId} key={currentPackage.id} />
		})

		return (
			<div className="releaseContent__container" id="packages">
				<h1 className="reqModel__title rf-h1">Use Case Analysis</h1>
				<label className="rf-label">Packages and Use Cases:</label>
				<p className="rf-p">Use Case analysis provides an unambiguous model of the activity in the system.</p>
				<p className="rf-p">Use Cases are titled with short description of the activity the actor undertakes. In each Use Case there can be a series of steps that the actor performs and these are organised in a main flow and any alternative flows that occur. Use Cases are grouped together by similar activity into packages.</p>
				{packages}
			</div>
		);
	}
}

export default ReleasePackages;