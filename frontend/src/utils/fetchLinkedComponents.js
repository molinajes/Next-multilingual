import stepObjectStore from '../stores/stepObjectStore';
import componentStore from '../stores/componentStore';

import getItemFromArray from './getItemFromArray';

export default function (id, type) {
	
	let output = {
		rule: [],
		form: [],
		object: [],
		iface: []
	}

	if ( type === 'step') {
		const links = stepObjectStore.stepObjectData.filter(link => {
			return link.parent_id === id;
		})
		// console.log('links',links);
		links.forEach(link => {
			let component;
			switch (link.type) {
				case '1':
					component = getItemFromArray(componentStore.componentData.rule, link.related1_id);
					if (component) {
						output.rule.push(component);
					}
					break;
				case '2':
					component = getItemFromArray(componentStore.componentData.form, link.related1_id);
					if (component) {
						output.form.push(component);
					}
					break;
				case '6':
					component = getItemFromArray(componentStore.componentData.object, link.related1_id);
					if (component) {
						output.object.push(component);
					}
					break;
				case '12':
					component = getItemFromArray(componentStore.componentData.iface, link.related1_id);
					if (component) {
						output.iface.push(component);
					}
					break;
				default:
					break;
			}
		})
	}

	return output;
	
}