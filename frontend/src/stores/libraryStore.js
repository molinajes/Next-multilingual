import {observable, action} from 'mobx';

import getItemFromArray from '../utils/getItemFromArray';

// import {AppToaster} from '../components/Toaster/AppToaster';

class LibraryStore {
	@observable libraryData = [];

	@action
	clearStore() {
		this.libraryData = [];
	}

	@action
	getItem(id) {
		return getItemFromArray(this.libraryData, id, 'id');
	}
		

}

const actorStore = new LibraryStore();

export default actorStore;
