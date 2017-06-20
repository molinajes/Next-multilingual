import {observable, action} from 'mobx';

import Rule from '../models/ruleModel';

import getItemFromArray from '../utils/getItemFromArray';
import removeItemFromArray from '../utils/removeItemFromArray';

import {AppToaster} from '../components/Toaster/AppToaster';

class RuleStore {
	@observable ruleData = [];

	@action
	clearStore() {
		this.ruleData = [];
	}

	@action
	createRule(id, name) {
		const newRule = new Rule(id, name);

		const args = [
			{
				field: 'name',
				value: name
			}
		];

		this.ruleData.push(newRule);

		return newRule.create(args)
		.catch(() => {
			AppToaster.show({ message: 'Error In Creating Rule' });
			removeItemFromArray(this.ruleData, id);
		})
	}

	@action
	createAndLinkRule(id, parentId, name, componentTypeId, joinType) {
		const newRule = new Rule(id, name);

		this.ruleData.push(newRule);

		return newRule.createAndLink(parentId, name, componentTypeId, joinType)
		.catch((error) => {
			AppToaster.show({ message: 'Error In Creating And Linking Rule' });
			removeItemFromArray(this.ruleData, id);
			return new Promise.reject(error)
		})
	}

	@action 
	editRule(id, field, value) {
		const data = this.ruleData.find(obj => obj.persistent_id === id);
		const previousValue = data[field];
		data[field] = value;

		const args = [
			{
				field: field,
				value: value
			}
		]		

		data.update(args)
		.catch(() => {
			AppToaster.show({ message: 'Error In Updating Rule' });
			data[field] = previousValue;
		})
	}

	@action
	deleteRule(ruleId) {
		
		const rule = getItemFromArray(this.ruleData, ruleId);

		removeItemFromArray(this.ruleData, ruleId)

		rule.delete()
		.catch(() => {
			AppToaster.show({ message: 'Error In Deleting rule' });
			this.ruleData.push(rule);
		})

	}

}

const ruleStore = new RuleStore();

export default ruleStore;
