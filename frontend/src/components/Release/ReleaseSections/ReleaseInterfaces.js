import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import InterfaceOutput from './Interface/InterfaceOutput';

@inject('componentStore')
@observer
class ReleaseInterfaces extends Component {
	static propTypes = {
		componentStore: PropTypes.object.isRequired
	}

	render() {
		const {componentStore} = this.props;

		const interfaces = componentStore.componentData.iface.map(iface => {
			return <InterfaceOutput data={iface} key={iface.id}/>
		})

		if (interfaces.length === 0) {
			// Don't output if there are no interfaces
			return null;
		}

		return (
			<div className="releaseContent__container" id="interfaces">
				<h1 className="reqModel__title rf-h1">Interfaces</h1>
				{interfaces}
			</div>
		);
	}
}

export default ReleaseInterfaces;
