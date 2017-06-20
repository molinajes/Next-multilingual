import React, { Component, PropTypes } from "react";
import { Router, Route, IndexRoute, browserHistory, Redirect } from "react-router";

import { Provider, observer } from "mobx-react";
import { extendObservable } from "mobx";

import Main from "../components/Main";

import IndexPage from "../rfComponents/_Pages/IndexPage/IndexPage";

import CreateProject from "../components/CreateProject/CreateProject";
import CreateIndex from "../components/CreateProject/CreateIndex";
import LibraryItemDetails from "../components/Library/LibraryItemDetails";
// import ProjectPage from '../components/ProjectPage/ProjectPage';
import Gather from "../components/Gather/Gather";
import AddComponentPage from "../components/AddComponents/AddComponentPage";
import Model from "../components/Model/Model";
import Release from "../components/Release/Release";

import ComponentStyleGuide from "../rfComponents/ComponentStyleGuide";
import ModelPage from "../rfComponents/_Pages/ModelPage/ModelPage";

import ProgressPage from "../rfComponents/_Pages/ProgressPage/ProgressPage";
import ProjectSettings from "../rfComponents/_Pages/ProjectSettings/ProjectSettings";
import RequirementsPage
	from "../rfComponents/_Pages/RequirementsPage/RequirementsPage";
import AnalysePage
	from "../rfComponents/_Pages/AnalysePage/AnalysePage";
import UseCaseEditorPage from "../rfComponents/_Pages/ModelPage/UseCaseEditor/UseCaseEditorPage";
import ActorsPage from "../rfComponents/_Pages/Actors/ActorsPage";
import EditOutputPage from "../rfComponents/_Pages/EditOutput/EditOutputPage";
import ReleasePage from "../rfComponents/_Pages/Release/ReleasePage";
import Interfaces from "../rfComponents/_Pages/AssetPages/Interfaces/Interfaces";
import BusinessRules from "../rfComponents/_Pages/AssetPages/BusinessRules/BusinessRules";
import FormPage from "../rfComponents/_Pages/AssetPages/Forms/FormPage";
import Objects from "../rfComponents/_Pages/AssetPages/Objects/Objects";

import AssetPage
	from "../rfComponents/_Pages/AssetPages/AssetPage";

import DevTasksPage from "../rfComponents/_Pages/DevTasks/DevTasksPage";

import mainStore from "../stores/mainStore";
import projectStore from "../stores/projectStore";
import requirementStore from "../stores/requirementStore";
import uiStore from "../stores/uiStore";
import packageStore from "../stores/packageStore";
import useCaseStore from "../stores/useCaseStore";
import stepStore from "../stores/stepStore";
import flowStore from "../stores/flowStore";
import traceStore from "../stores/traceStore";
import stepObjectStore from "../stores/stepObjectStore";
import componentStore from "../stores/componentStore";
import ruleStore from "../stores/ruleStore";
import formStore from "../stores/formStore";
import objectStore from "../stores/objectStore";
import ifaceStore from "../stores/ifaceStore";
import ifaceTypeStore from "../stores/ifaceTypeStore";
import actorStore from "../stores/actorStore";
import imageStore from "../stores/imageStore";
import formPropertyStore from "../stores/formPropertyStore";
import objectPropertyStore from "../stores/objectPropertyStore";
import categoryStore from "../stores/categoryStore";
import libraryStore from "../stores/libraryStore";
import userStore from "../stores/userStore";

const prefix = "/app";

@observer class Routes extends Component {
	static propTypes = {
		renderKey: PropTypes.number.isRequired
	};

	componentWillMount() {
		// uiStore.setIsLoadingData(true)

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

		window.extendObservable = extendObservable;
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
				<Router
					key={this.props.renderKey}
					history={browserHistory}
					onUpdate={hashLinkScroll}
				>
					<Redirect from="/" to={'/app/'} />
					<Route
						component={Main}
						path={prefix}
						isLoading={uiStore.isLoadingData}
					>
						{/*<IndexRoute component={IndexPage} />*/}
						<IndexRoute component={IndexPage} />
						<Route path="create" component={CreateIndex}>
							<IndexRoute component={CreateProject} />
							<Route path=":id" component={LibraryItemDetails} />
						</Route>
						{/*<Route path="overview" component={ProjectPage} />*/}
						<Route path="gather" component={Gather} />
						<Route path="components" component={AddComponentPage} />
						<Route path="model" component={Model} />
						<Route path="output" component={Release} />
						<Route
							path="componentguide"
							component={ComponentStyleGuide}
						/>
						<Route path="modelpage" component={ModelPage} />
						<Route
							path="progresspage"
							component={ProgressPage}
						/>
						<Route
							path="projectsettings"
							component={ProjectSettings}
						/>
						<Route
							path="requirementspage"
							component={RequirementsPage}
						/>
						<Route
							path="analysepage"
							component={AnalysePage}
						/>
						<Route
							path="usecaseeditor"
							component={UseCaseEditorPage}
						/>
						<Route
							path="actors"
							component={ActorsPage}
						/>
						<Route
							path="editoutput"
							component={EditOutputPage}
						/>
						<Route
							path="releasepage"
							component={ReleasePage}
						/>

						<Route
							path="interfaces"
							component={Interfaces}
						/>
						<Route
							path="businessrules"
							component={BusinessRules}
						/>
						<Route
							path="forms"
							component={FormPage}
						/>
						<Route
							path="objects"
							component={Objects}
						/>

						<Route
							path="assetpage"
							component={AssetPage}
						/>

						<Route
							path="devtasks"
							component={DevTasksPage}
						/>

					</Route>
				</Router>
			</Provider>
		);
	}
}

function hashLinkScroll() {
	const { hash } = window.location;
	if (hash !== "") {
		// Push onto callback queue so it runs after the DOM is updated,
		// this is required when navigating from a different page so that
		// the element is rendered on the page before trying to getElementById.
		setTimeout(() => {
			const id = hash.replace("#", "");
			const element = document.getElementById(id);
			if (element) element.scrollIntoView();
		}, 0);
	}
}

export default Routes;
