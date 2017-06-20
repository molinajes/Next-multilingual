import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import ComponentViewItem from './ComponentViewItem';
import CreateComponent from './CreateComponent';

@inject('uiStore')
@observer
class ComponentGroup extends Component {

	static propTypes = {
		uiStore: PropTypes.object.isRequired,
		storeData: PropTypes.object.isRequired,
		children: PropTypes.node.isRequired,
		componentType: PropTypes.string.isRequired
	}

	render() {

		const {storeData, componentType, uiStore} = this.props;

		let icon = '';

		switch(componentType) {
			case 'iface':
				icon = 'laptop-sm';
			break;
			case 'rule':
				icon = 'cogs-sm';
			break;
			case 'form':
				icon = 'task-sm';
			break;
			case 'object':
				icon = 'connections-sm';
			break;
			default:
			break;
		}

		const components = storeData.filter(component => {
			if (uiStore.componentSearch[componentType] === '') return true;
			else {
				return component.name.toLowerCase().indexOf(uiStore.componentSearch[componentType].toLowerCase()) !== -1;
			}
		})
		.map((component) => {
			return <ComponentViewItem 
				componentData={component}
				key={component.persistent_id}
				componentType={componentType}
				componentIcon={icon}
				/>
		})

		return (
			<div className="componentView__group">
				<div className="componentView__components">					
					<CreateComponent componentType={componentType} />
					{components}
					{this.props.children}
				</div>
			</div>
		);
	}
}

export default ComponentGroup;
