import React, { Component, PropTypes } from 'react';
import {withRouter} from 'react-router';
import {observer, inject} from 'mobx-react';
import axios from 'axios';

// import LibraryItem from '../Library/LibraryItem';
// import LibraryCategory from '../Library/LibraryCategory';
import IndexFeature from '../IndexPage/IndexFeature';
import IndexTile from '../IndexPage/IndexTile';
import IndexProjects from '../IndexPage/IndexProjects';

// import axios from 'axios';


@inject('libraryStore', 'mainStore', 'projectStore', 'uiStore')
@withRouter
@observer

class CreateProject extends Component {

	static propTypes = {
		libraryStore: PropTypes.object.isRequired,
		mainStore: PropTypes.object.isRequired,
		projectStore: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired,
		router: PropTypes.object.isRequired
	}


	handleClickEmpty = () => {
		const {mainStore, projectStore, uiStore} = this.props;
		let postData = `project[name]=New Project`;
		
		uiStore.setIsLoadingData(true);
		axios.post('/app/project/reactcreate', postData)
		.then(response => {
			console.log(response)

			if (response.data.status !== 1) {
				// alert('Error in setting project (temp warning)') // TODO: Temp warning | JH
			}
			
			mainStore.clearStores();
			mainStore.organiseData(response.data.content);
			projectStore.setProjectIsSet(true);
			uiStore.setIsLoadingData(false);
			this.props.router.push('/app/gather');
		})
		.catch(() => {
			// TODO: Handle error of create empty failure | JH
			uiStore.setIsLoadingData(false);
			this.props.router.push('/app/')
		})
	}

	handleClickFeature = (id = '') => {
		const {router} = this.props;		
		router.push(`/app/create/${id}`)
	}

	render() {
		const {libraryStore} = this.props;

		// Temporary way to filter out the learn to use reqfire library item
		const learnToUseItem = libraryStore.libraryData.filter(item => {
			return item.name.includes("Learn");
		}).map(item => {
			return (
				<IndexFeature 
					data={item}
					color='orange'
					onClick={() => this.handleClickFeature(item.id)}
					key={item.id}
				>
					<IndexTile 
						title={item.name}
						icon={item.icon ? item.icon : 'fire'}
						includeTags={false}/>
				</IndexFeature>
			)
		})

		const featuredTemplates = libraryStore.libraryData.filter(item => {
			return !item.name.includes("Learn");
		}).map(item => {
			return (
				<IndexFeature 
					data={item}
					color='orange'
					onClick={() => this.handleClickFeature(item.id)}
					key={item.id}
				>
					<IndexTile 
						title={item.name}
						icon={item.icon ? item.icon : 'fire'}
						includeTags={false}/>
				</IndexFeature>
			)
		})

		const createNew = (
			<IndexFeature 
				data={{
					name: "Create a blank project",
					description: "Already comfortable analysing requirements and defining use cases? Start a project from scratch.",
					tags: "featured"
				}}
				color='orange'
				onClick={this.handleClickEmpty}
			>
				<IndexTile 
					title={"New Project"}
					icon={"plus-thin"}
					includeTags={false}/>
			</IndexFeature>
		)
// <div className="indexPage__sectionTile indexPage__sectionTile--mango" onClick={this.handleClickEmpty}>
		return (
			<div className="indexPage__container">
				<div style={{display: 'inline-block', marginTop: '2rem', cursor: 'pointer'}}>
					<span onClick={() => this.props.router.push('/app/')}>Home ></span>
					<span>Create Project</span>
				</div>		
				{(learnToUseItem.length > 0 && <IndexProjects 
					title="Learn"
					subtitle=""
					color='yellow'
					// data={userStore.projectsList}
					linkText='' />)}
				{learnToUseItem}
				<IndexProjects 
					title="Use a template"
					subtitle=""
					color='yellow'
					// data={userStore.projectsList}
					linkText='' />				
				{featuredTemplates}

				<IndexProjects 
					title="Start from scratch"
					subtitle=""
					color='yellow'
					// data={userStore.projectsList}
					linkText='' />
				{createNew}
			</div>
		);
	}
}

export default CreateProject;
