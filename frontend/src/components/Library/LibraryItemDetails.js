import React, { Component, PropTypes } from 'react';
import {withRouter} from 'react-router';
import {observer, inject} from 'mobx-react';
import LibraryTag from './LibraryTag';

import importedData from '../../assets/staticBigData.json';
import tagReference from '../../assets/tagReference.json';

import IconPositioned from '../Iconic/IconPositioned';
import {AppToaster} from '../Toaster/AppToaster';

import axios from 'axios';

@inject('libraryStore','mainStore', 'uiStore', 'projectStore')
@withRouter
@observer
class LibraryItemDetails extends Component {

	static propTypes = {
		uiStore: PropTypes.object.isRequired,
		projectStore: PropTypes.object.isRequired,
		libraryStore: PropTypes.object.isRequired,
		mainStore: PropTypes.object.isRequired,
		router: PropTypes.object.isRequired,
		params: PropTypes.object,
		children: PropTypes.object
	}

	constructor(props) {
		super(props);
		this.state = {
			libraryDetails: {},
			libraryContents: {}
		}
	}

	componentWillMount = () => {
		const {libraryStore, params} = this.props;
		const libraryDetails = libraryStore.getItem(params.id);
		this.setState({
			libraryDetails
		});
	
	}

	componentDidMount = () => {
		const {mainStore} = this.props;
		if (ENV_PRODUCTION) {
			axios.get('/app/project/extjson/id/' + this.state.libraryDetails.extlink)
			.then(response => {
				if (LOGGING_ENABLED) {
					console.log('Got Data', response);
					window.response = response;
				}
				const libraryContents = this.countLibraryData(response.data.content.components);
				this.setState({
					libraryContents: libraryContents
				})
			})
			.catch(error => {
				console.log(error);
			});
		}
		else {
			mainStore.getInitialData(importedData);
		}
	}

	handleCreate = () => {
		const {libraryDetails} = this.state;
		const {uiStore} = this.props;

		this.setState({
			loading: true
		})

		let postData = `project[name]=${libraryDetails.name}&Library[0]=${libraryDetails.id}`;
		
		uiStore.setIsLoadingData(true);
		axios.post('/app/project/reactcreatewithlibrary', postData)
		.then(response => {
			const {mainStore, projectStore, uiStore} = this.props;
			console.log(response)
			
			if (response.data.status !== 1) {
				// alert('Error in setting project (temp warning)') // TODO: Temp warning | JH
				AppToaster.show({ message: 'Error creating a new project.  We have logged this error.' });
				this.props.router.push('/app/');
				throw new Error('Error in setting project');
			}
			
			mainStore.clearStores();
			mainStore.organiseData(response.data.content);
			projectStore.setProjectIsSet(true);
			uiStore.setIsLoadingData(false);
			this.props.router.push('/app/gather');
		})
	}

	countLibraryData = (components) => {

		const output = {
			modules: 0,
			ifaces: 0,
			rules: 0,
			forms: 0,
			objects: 0,
			useCases: 0
		}

		output.ifaces = components.filter(comp => comp.object === '12').length;
		output.rules = components.filter(comp => comp.object === '1').length;
		output.forms = components.filter(comp => comp.object === '2').length;
		output.objects = components.filter(comp => comp.object === '6').length;

		output.useCases = components.filter(comp => comp.object === '10').length;

		output.modules = components.filter(comp => {
			return (comp.object === '21') && (comp.parent_id === '-1');
		}).length;

		return output;
	}

	render() {
		const {libraryDetails, libraryContents} = this.state;

		let tags;
		if (libraryDetails.tags) {
			tags = libraryDetails.tags.split(',');
		}

		let tagsList = [];
		if (tags) {
			tagsList = tags.reduce((output, tag) => {
				if (tagReference[tag]) {
					return output.concat(<LibraryTag key={tag} data={tagReference[tag]} />);
				}
			}, [])
		}
		
		const numComponents = libraryContents.ifaces + libraryContents.rules + libraryContents.forms + libraryContents.objects;

		return (
			<div className="projectDetail__wrapper">
				<div style={{display: 'inline-block', margin: '2rem 0', cursor: 'pointer'}}>
					{/*<IconPositioned
						iconSize='24'
						iconicType='arrow-thick-left-fill-large-acute-sm'
						onClick={() => this.props.router.push('/app/')}/>*/}
					<span onClick={() => this.props.router.push('/app/')}>Home > </span>
					<span onClick={() => this.props.router.push('/app/create/')}> Create Project > </span>
					<span > {libraryDetails.name} </span>
					
				</div>
				{/*<div className="projectDetail__bannerImage" style={{backgroundImage: `url(${libraryDetails.imageURL})`}}>
				</div>*/}
				<div className="projectDetail__header">
					<div className="projectDetail__titles">
						<h1 className="projectDetail__projectTitle">{libraryDetails.name}</h1>
						<h3 className="projectDetail__description">{libraryDetails.description}</h3>
					</div>
					<div className="projectDetail__create" onClick={this.handleCreate}>Get Started!</div>
				</div>

				<div className="indexProjects__divider"></div>
				<div className="projectDetail__tags">
					{tagsList}
				</div>
					
				<div className="projectDetail__overview">
					<div className="projectDetail__categories">
						<h3 className="projectDetail__description">What's Inside?</h3>
						{libraryContents.modules > 0 && (
							<div className="projectDetail__projectCategory">
								<div className="projectDetails__categoryTitle">Requirement Modules</div>
								<div className={"addComponentsItem__tile"}>
									<IconPositioned 
										iconSize='40' 
										iconicType='grid-four-up-sm'
										iconHoverColor='mango'  />	
									<div className="addComponentsItem__name">
										<span>{libraryContents.modules} Modules</span>
									</div>
								</div>
							</div>
						)}
						{numComponents > 0 && (
							<div className="projectDetail__projectCategory">
								<div className="projectDetails__categoryTitle">Components</div>
								{libraryContents.ifaces > 0 && (
									<div className={"addComponentsItem__tile"}>
										<IconPositioned 
											iconSize='40' 
											iconicType='laptop-sm'
											iconHoverColor='mango'  />	
										<div className="addComponentsItem__name">
											<span>{libraryContents.ifaces} Interfaces</span>
										</div>
									</div>
								)}
								{libraryContents.rules > 0 && (
									<div className={"addComponentsItem__tile"}>
										<IconPositioned 
											iconSize='40' 
											iconicType='cogs-sm'
											iconHoverColor='mango'  />	
										<div className="addComponentsItem__name">
											<span>{libraryContents.rules} Rules</span>
										</div>
									</div>
								)}
								{libraryContents.forms > 0 && (
									<div className={"addComponentsItem__tile"}>
										<IconPositioned 
											iconSize='40' 
											iconicType='list-rich-sm'
											iconHoverColor='mango'  />	
										<div className="addComponentsItem__name">
											<span>{libraryContents.forms} Forms</span>
										</div>
									</div>
								)}
								{libraryContents.objects > 0 && (
									<div className={"addComponentsItem__tile"}>
										<IconPositioned 
											iconSize='40' 
											iconicType='database-sm'
											iconHoverColor='mango'  />	
										<div className="addComponentsItem__name">
											<span>{libraryContents.objects} Objects</span>
										</div>
									</div>
								)}
							</div>
						)}
						{libraryContents.useCases > 0 && (
							<div className="projectDetail__projectCategory">
								<div className="projectDetails__categoryTitle">Activity</div>
								<div className={"addComponentsItem__tile"}>
									<IconPositioned 
										iconSize='40' 
										iconicType='fire-sm'
										iconHoverColor='mango'  />	
									<div className="addComponentsItem__name">
										<span>{libraryContents.useCases} Use Cases</span>
									</div>
								</div>
							</div>
						)}
					</div>
					<div className="projectDetail__helpText">
						{/*The Social template is a great headstart for apps that require many users, authentication, social integration, web + mobile interfaces, and interactivity between users.*/}
					</div>
				</div>
			</div>
		);
	}
}

export default LibraryItemDetails;
