import {observable, action, computed} from 'mobx';


import tooltipMessages from '../assets/tooltipMessages';
import tutorialContent from '../assets/tutorialContent';

const TOTAL_TUTORIALS = tutorialContent.length;

import poll from '../utils/poll';

class UiStore {
	router = {};



	@observable isLoadingData = true;
	@observable activePage = '';
	@observable componentDropdownActive = '';
	@observable dropdownInput = '';
	@observable bottomBarDetails = {
		type: '',
		id: ''
	};

	@observable requirementSearchInput = '';
	@observable componentSearch = {
		iface: '',
		rule: '',
		form: '',
		object: ''
	}

	@observable activePackage = '';
	@observable activeTooltipType = '';
	@observable createBasic= {parentId: '', name: ''};
	@observable editBasicName = {id: '', value: ''};
	
	@observable releaseTab = 'All';
	@observable outputScrollTo = {
		type: '',
		'id': ''
	}

	@observable helpContentTarget = '';
	@observable helpModalOpen = false;

	@observable tutorialActive = false;
	@observable activeTutorial = 'module';

	@observable navTooltips = {
		modules: false,
		requirements: false,
		linkedComponents: false,
		interfaces: false,
		rules: false,
		forms: false,
		objects: false,
		packages: false,
		usecases: false,
		steps: false,
		release: false,
		releaseSettings: false,
		edit: false

	}


	// Glam additions
	@observable activeStep = -1;

	@action setActiveStep(step) {
		this.activeStep = step;
	}


	@observable indexNavigationTab = 'latest';

	@action setIndexNavigationTab(tab) {
		this.indexNavigationTab = tab;
	}

	// @observable page = '';
	@observable page = 'analysepage'; // temp default
	@action setPage(tab) {
		this.page = tab;
		this.router.push(`/app/${tab}`);
	}

	@observable progressStep = 'projectsettings';
	@action setProgressStep(step) {
		this.progressStep = step;
	}
	//////




	@action updateComponentDropdownActive(component) {
		if (LOGGING_ENABLED) {
			console.log("Updated comp drop active", component)			
		}
		this.componentDropdownActive = component;
	}

	@action updateDropdownInput(value) {
		this.dropdownInput = value;
	}

	@action setBottomBarDetails(type, id = '') {
		this.bottomBarDetails.type = type;
		this.bottomBarDetails.id = id;
	}

	@action requirementSearchChange(value) {
		this.requirementSearchInput = value;
	}

	@action updateComponentSearch(value, type) {
		this.componentSearch[type] = value;
	}

	@action clearComponentSearch() {
		this.componentSearch.iface = '';
		this.componentSearch.rule = '';
		this.componentSearch.form = '';
		this.componentSearch.object = '';
	}

	@action setIsLoadingData(isLoading) {
		this.isLoadingData = isLoading;
	}

	@action setActiveTooltip(value) {
		this.activeTooltipType = value;
	}

	@computed get activeTooltipMessage() {
		return tooltipMessages[this.activeTooltipType];
	}

	@action updateCreateBasic(name, parentId) {
		this.createBasic.parentId = parentId;
		this.createBasic.name = name;
	}

	@action updateEditBasicName(id,value) {
		this.editBasicName.id = id;
		this.editBasicName.value = value;
	}

	@action setReleaseTab(tab) {
		this.releaseTab = tab;
	}

	@action setOutputScrollTo(type, id) {
		this.outputScrollTo.type = type;
		this.outputScrollTo.id = id;
	}

	@action setActivePackage(id) {
		this.activePackage = id;
	}

	@action setActivePage(value) {
		this.activePage = value;
	}

	@action setHelpContentTarget(obj) {
		this.helpContentTarget = obj;
	}

	@observable tutorialNumber = 0;

	@action startTutorial(number) {

		const tutorial = tutorialContent[number];

		if (this.router.location.pathname !== tutorial.location) {
			this.router.push(tutorial.location)
		}


		poll(() => {
			console.count('polling')
			return document.getElementsByClassName(tutorial.className)[tutorial.elementNumber];
		}, 2000, 150)
		.then((tutorialItem) => {
			// Polling done, now do something else!
			tutorialItem.className += ' tutorialItem--active';
			const itemPosition = tutorialItem.getBoundingClientRect();
			$('body').append('<div id="tutorialBlockElement"></div>');
			$('#tutorialBlockElement').css({
				position: 'fixed',
				top: itemPosition.top,
				height: itemPosition.height,
				left: itemPosition.left,
				width: itemPosition.width,
				opacity: 0.0000001,
				zIndex: 999999999
			})
			this.setHelpContentTarget(tutorialItem);			
		})
		.catch((error) => {
			// Polling timed out, handle the error!
			console.log('error', error)
		});
		
		
		

	}

	@action nextTutorial(next) {
		if (next) {
			console.log('here')
			$('.tutorialItem--active').removeClass('tutorialItem--active');
			this.tutorialNumber = (this.tutorialNumber + 1) % TOTAL_TUTORIALS;
			if (this.tutorialNumber === 0) {				
				this.quitTutorial();
				return false;
			} else {
				$('#tutorialBlockElement').remove();
				this.startTutorial(this.tutorialNumber);
				return true;
			}
		}
		else {
			$('.tutorialItem--active').removeClass('tutorialItem--active');
			if (this.tutorialNumber === 0) {
				this.quitTutorial();
				return false;
			}
			else {
				this.tutorialNumber = (this.tutorialNumber + (TOTAL_TUTORIALS - 1)) % TOTAL_TUTORIALS;
				$('#tutorialBlockElement').remove();
				this.startTutorial(this.tutorialNumber);	
				return true;			
			}
		}
	}

	@action quitTutorial() {
		this.tutorialNumber = 0;
		$('#tutorialBlockElement').remove();
		this.setHelpContentTarget('');
		$('.tutorialItem--active').removeClass('tutorialItem--active');
	}

	@action toggleNavTooltip(identifier) {
		this.navTooltips[identifier] = !this.navTooltips[identifier];
	}

}
const uiStore = new UiStore();

export default uiStore;
