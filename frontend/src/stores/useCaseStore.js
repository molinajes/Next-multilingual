import {observable, action} from 'mobx';
import uuid from 'uuid';
import axios from 'axios';


import removeItemFromArray from '../utils/removeItemFromArray';
import getItemFromArray from '../utils/getItemFromArray';
import updateModel from '../utils/updateModel';

import UseCase from '../models/useCaseModel'

import packageStore from './packageStore';
//import flowStore from './flowStore';
// import uiStore from './uiStore';
import {AppToaster} from '../components/Toaster/AppToaster';

class UseCaseStore {
	@observable useCaseData = [];

	@action
	clearStore() {
		this.useCaseData = [];
	}

	@action
	createUseCase(name, packageId, number, actorForStep) {
		const randId = uuid();

		let parentArray = getItemFromArray(packageStore.packageData, packageId);
		// Error checking for finding parent.
		if (parentArray === -1) {
			return Promise.reject('Failed to get parent array when creating a package.')
		}
		// Get the use cases in the parent package
		parentArray = parentArray.children;
		
		const newUseCase = new UseCase(randId, name, packageId, number);

		this.useCaseData.push(newUseCase);

		//flowStore.createFlow("Main",randId,"0","0");

		parentArray.push(newUseCase);

		const args = [
			{
				field: 'name',
				value: name
			},
			{
				field: 'parent_id',
				value: packageId
			},
			{
				field: 'number',
				value: number
			},
			{
				field: 'related1_id',
				value: actorForStep
			}
		]

		return newUseCase.createUseCase(args)
		.catch((error) => {
			AppToaster.show({ message: 'Error In Creating Use Case' });
			removeItemFromArray(parentArray, randId);
			removeItemFromArray(this.useCaseData, randId);
			// Have to pass this up to the handler of creating use cases
			return Promise.reject(error)
		})

		// uiStore.setModelPageFocus('showUseCaseEditor')
		// uiStore.setActiveUseCase(randId)
	}

	@action
	deleteUseCase(useCase) {
		
		let parentArray = getItemFromArray(packageStore.packageData, useCase.parent_id);
		// Error checking for finding parent.
		if (parentArray === -1) {
			AppToaster.show({ message: 'Error In Deleting Flow' });
			return;
		}
		// Get the use cases in the parent UC
		parentArray = parentArray.children;

		removeItemFromArray(this.useCaseData, useCase.persistent_id);
		removeItemFromArray(parentArray, useCase.persistent_id);

		useCase.delete()
		.catch(() => {
			AppToaster.show({ message: 'Error In Deleting useCase' });
			this.useCaseData.push(useCase);
			parentArray.push(useCase);
		})

	}

	@action
	editUseCase(useCaseId, field, value) {
		const data = this.useCaseData.find(uc => uc.persistent_id === useCaseId)
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
			AppToaster.show({ message: 'Error In Updating Use Case' });
			data[field] = previousValue;
		})
	}

	@action
	reorderUseCases(updatedUseCases) {

		console.log('updatedUCs',updatedUseCases)


		const toSend = updatedUseCases.map((usecase, index)=> {
			return `Component[${index}][persistent_id]=${usecase.persistent_id}&` +
			`Component[${index}][number]=${usecase.newNumber}&` + 
			`Component[${index}][parent_id]=${usecase.newParentId}&` + 
			`Component[${index}][object]=10`
		}).join('&');
		console.log('tosend',toSend);

		updatedUseCases.forEach(usecase => {
			let usecaseToUpdate;
			usecaseToUpdate = getItemFromArray(this.useCaseData, usecase.persistent_id);
			usecaseToUpdate.number = usecase.newNumber;
			usecaseToUpdate.parent_id = usecase.newParentId;
		})


		if (toSend && ENV_PRODUCTION) {
			
			return axios.post('/app/component/reactupdate', toSend)
			.then(response => {
				console.log("Data", response)
				window.response = response;
				// const parsedData = JSON.parse(response);
				const status = response.data.status

				if ( status !== 1) {
					console.error(response.data.message)
					return;
				}

				return response.data.content;
			}).then(content => {
				console.log('content',content)
				content.forEach(usecase => {
					let usecaseToUpdate;
					usecaseToUpdate = getItemFromArray(this.useCaseData, usecase.content.persistent_id);
					updateModel(usecaseToUpdate, usecase.content);
				})
			})
		}	

	}

}

const useCaseStore = new UseCaseStore();

export default useCaseStore;
