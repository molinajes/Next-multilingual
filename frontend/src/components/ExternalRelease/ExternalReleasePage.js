import React, { Component } from 'react';

import {Provider, observer} from 'mobx-react';

import Loading from '../Loading/Loading';
import Release from '../Release/Release';
import ExternalReleaseNav from '../Nav/ExternalReleaseNav';

import mainStore from '../../stores/mainStore';
import projectStore from '../../stores/projectStore';
import requirementStore from '../../stores/requirementStore';
import uiStore from '../../stores/uiStore';
import packageStore from '../../stores/packageStore';
import useCaseStore from '../../stores/useCaseStore';
import stepStore from '../../stores/stepStore';
import flowStore from '../../stores/flowStore';
import traceStore from '../../stores/traceStore';
import stepObjectStore from '../../stores/stepObjectStore';
import componentStore from '../../stores/componentStore';
import ruleStore from '../../stores/ruleStore';
import formStore from '../../stores/formStore';
import objectStore from '../../stores/objectStore';
import ifaceStore from '../../stores/ifaceStore';
import ifaceTypeStore from '../../stores/ifaceTypeStore';
import actorStore from '../../stores/actorStore';
import imageStore from '../../stores/imageStore';
import formPropertyStore from '../../stores/formPropertyStore';
import objectPropertyStore from '../../stores/objectPropertyStore';
import categoryStore from '../../stores/categoryStore';
import libraryStore from '../../stores/libraryStore';
import userStore from '../../stores/userStore';

import '../../styles/main.scss';

@observer
class ExternalReleasePage extends Component {

	componentWillMount() {
		
		
		window.mainStore = mainStore;
		window.requirementStore = requirementStore;
		window.uiStore = uiStore;
		window.packageStore = packageStore;
		window.useCaseStore = useCaseStore;
		window.stepStore = stepStore;
		window.flowStore = flowStore;
		window.stepObjectStore = stepObjectStore;
		window.componentStore = componentStore;
		window.actorStore = actorStore;
		window.formPropertyStore = formPropertyStore;
		window.objectPropertyStore = objectPropertyStore;
		window.traceStore = traceStore;
		window.ruleStore = ruleStore;
		window.formStore = formStore;
		window.objectStore = objectStore;
		window.ifaceStore = ifaceStore;
		window.ifaceTypeStore = ifaceTypeStore;
		window.imageStore = imageStore;
		window.categoryStore = categoryStore;
		window.libraryStore = libraryStore;
		window.userStore = userStore;		
		window.projectStore = projectStore;	


		if (IS_EXTERNAL_RELEASE) {
			mainStore.getExternalReleaseData();
		}

		// window.axios = axios;
	}

	render() {
		return (
			<Provider 
				mainStore={mainStore}
				projectStore={projectStore}
				uiStore={uiStore} 
				requirementStore={requirementStore} 
				packageStore={packageStore} 
				useCaseStore={useCaseStore} 
				stepStore={stepStore}
				flowStore={flowStore}
				stepObjectStore={stepObjectStore}
				componentStore={componentStore}
				actorStore={actorStore}
				formPropertyStore={formPropertyStore}
				traceStore={traceStore}
				ruleStore={ruleStore}
				formStore={formStore}
				objectStore={objectStore}
				ifaceStore={ifaceStore}
				ifaceTypeStore={ifaceTypeStore}
				objectPropertyStore={objectPropertyStore}
				imageStore={imageStore}
				categoryStore={categoryStore}
				libraryStore={libraryStore}
				userStore={userStore}
			>
				<div>		
					{/*<ExternalReleaseNav /> */}
					<div className="pageContainer--external">
						{uiStore.isLoadingData ? <Loading /> : <Release isExternalRelease params={{}} />}
					</div>						
				</div>
			</Provider>
		);
	}
}

export default ExternalReleasePage;
