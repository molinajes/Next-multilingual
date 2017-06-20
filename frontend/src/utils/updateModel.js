import {extendObservable} from 'mobx';
import ss from './stripslashes';

export default function (toUpdate, newData, args) {
	if (args) {
		// If returning from an update with arguments only 
		// update these fields
		args.forEach(arg => {
			if(toUpdate[arg] !== newData[arg]) {
				let value = newData[arg];
				if (value === undefined || value === null) {
					value = '';
				}
				extendObservable(toUpdate, {[arg]: ss(value)});
			}
		})
	}
	else {
		// Otherwise update everything
		Object.keys(newData).forEach(key => {
			if (toUpdate[key] !== newData[key]) {

				let value = newData[key];
				if (value === undefined || value === null) {
					value = '';
				}
				extendObservable(toUpdate, {[key]: ss(value)});
			}
		})
	}	
}