import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

// import IconPositioned from '../Iconic/IconPositioned';

import ComponentTile from '../Component/ComponentTile';


@inject('mainStore', 'requirementStore')
@observer
class ProjectSize extends Component {
	static propTypes = {
		mainStore: PropTypes.object.isRequired,
		requirementStore: PropTypes.object.isRequired
	}

	render() {
		const {mainStore, requirementStore} = this.props;



		return (

			<div className="">
				<div className="">
					<h1>Requirements</h1>
					<ComponentTile
						componentName={'Modules'}
						componentData={requirementStore.groupData}
						iconType={'grid-four-up-sm'} />

					<ComponentTile
						componentName={'Requirements'}
						componentData={requirementStore.requirementData}
						iconType={'chat-sm'} />

					<ComponentTile
						componentName={'Details'}
						componentData={requirementStore.detailData}
						iconType={'screenshot-sm'} />

					<h1>Components</h1>

					<ComponentTile
						componentName={'Interfaces'}
						componentData={mainStore.appData.components.iface}
						iconType={'laptop-sm'} />

					<ComponentTile
						componentName={'Rules'}
						componentData={mainStore.appData.components.rule}
						iconType={'cogs-sm'} />

					<ComponentTile
						componentName={'Forms'}
						componentData={mainStore.appData.components.form}
						iconType={'list-rich-sm'} />

					<ComponentTile
						componentName={'Objects'}
						componentData={mainStore.appData.components.object}
						iconType={'connections-sm'} />

					
					<h1>Activity Model</h1>

					<ComponentTile
						componentName={'Packages'}
						componentData={mainStore.appData.components.package}
						iconType={'fire-sm'} />

					<ComponentTile
						componentName={'Use Cases'}
						componentData={mainStore.appData.components.usecase}
						iconType={'fire-sm'} />

					<ComponentTile
						componentName={'Steps'}
						componentData={mainStore.appData.components.step}
						iconType={'signpost-sm'} />

				</div>
			</div>
		);
	}
}

export default ProjectSize;

