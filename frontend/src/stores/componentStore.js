import {observable, action} from 'mobx';
import uuid from 'uuid';

import componentNameToId from '../utils/componentNameToId';

import ruleStore from './ruleStore';
import formStore from './formStore';
import objectStore from './objectStore';
import ifaceStore from './ifaceStore';

class ComponentStore {

	@observable componentData = {
		rule: [],
		form: [],
		object: [],
		iface: []
	}

	@action
	clearStore() {
		this.componentData.rule = [];
		this.componentData.form = [];
		this.componentData.object = [];
		this.componentData.iface = [];
	}

	@action createComponent(componentType, name) {
		const randId = uuid();
		switch (componentType) {
			case 'rule':
				return ruleStore.createRule(randId, name);
			case 'form':
				return formStore.createForm(randId, name);
			case 'object':
				return objectStore.createObject(randId, name);
			case 'iface':
				return ifaceStore.createIface(randId, name);
			default:
				return null;
		}
	}

	@action createAndLinkComponent(componentType, name, parentId, joinType) {
		// Note: joinType is where it is a trace or link
		const randId = uuid();

		const componentTypeId = componentNameToId(componentType);

		switch (componentType) {
			case 'rule':
				return ruleStore.createAndLinkRule(randId, parentId, name, componentTypeId, joinType)
				.catch(error => Promise.reject(error));
			case 'form':
				return formStore.createAndLinkForm(randId, parentId, name, componentTypeId, joinType)
				.catch(error => Promise.reject(error));
			case 'object':
				return objectStore.createAndLinkObject(randId, parentId, name, componentTypeId, joinType)
				.catch(error => Promise.reject(error));
			case 'iface':
				return ifaceStore.createAndLinkIface(randId, parentId, name, componentTypeId, joinType)
				.catch(error => Promise.reject(error));
			default:
				return null;
		}
	}

	@action editComponent(componentType, componentId, field, value) {
		switch (componentType) {
			case 'rule':
				ruleStore.editRule(componentId, field, value);
				break;
			case 'form':
				formStore.editForm(componentId, field, value);
				break;
			case 'object':
				objectStore.editObject(componentId, field, value);
				break;
			case 'iface':
				ifaceStore.editIface(componentId, field, value);
				break;
			default:
				break;
		}
	}

	@action deleteComponent(componentType, componentId) {
		switch (componentType) {
			case 'rule':
				ruleStore.deleteRule(componentId);
				break;
			case 'form':
				formStore.deleteForm(componentId);
				break;
			case 'object':
				objectStore.deleteObject(componentId);
				break;
			case 'iface':
				ifaceStore.deleteIface(componentId);
				break;
			default:
				break;
		}
	}

}

const componentStore = new ComponentStore();

export default componentStore;
