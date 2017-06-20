import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

// import IndexNotification from '../IndexPage/IndexNotification';
import IndexFeature from '../IndexPage/IndexFeature';
import IndexProjects from '../IndexPage/IndexProjects';
import IndexTile from '../IndexPage/IndexTile';

// import IconicIcon from '../Iconic/IconicIcon';
// import IconPositioned from '../Iconic/IconPositioned';

import pageTitles from '../../assets/pageTitles.json';


@inject('uiStore', 'mainStore', 'userStore', 'libraryStore')
@observer
class IndexPage extends Component {
	static propTypes = {
		router: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired,
		userStore: PropTypes.object.isRequired,
		libraryStore: PropTypes.object.isRequired,
		mainStore: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			numRecents: 4,
		}
	}



	componentDidMount() {
		const {uiStore, mainStore, userStore} = this.props;
		uiStore.setActivePage('');
		document.title = pageTitles.index;

		mainStore.getMetaData();		

		if (!ENV_PRODUCTION) {
			userStore.projectsList = [{
				name: 'Test Project',
				description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, nisi.",
				id: '1'
			}]
		}
	}

	handleClick = (id) => {
		const {mainStore, router} = this.props;
		mainStore.setProject(id, router);
		

	}

	handleClickFeature = (id = '') => {
		const {router} = this.props;		
		router.push(`/app/create/${id}`)
	}

	handleSeeMoreRecent = () => {
		this.setState({
			numRecents: -1
		})
	}

	/*handleAcceptInvite = (id) => {
		const {userStore} = this.props;
		userStore.acceptInvite(id)
	}*/

	render() {
		const {userStore, libraryStore} = this.props;

		
		/*const invitesArray = userStore.invitesList.map(invite => {
			return <p>You have been invited to project: {invite.name}.  Will add an accept button to this soon.</p>
		})*/

		const projectFollowsList = (userStore.followsList.length > 0) && (
			<IndexProjects 
				title="Projects you are following"
				subtitle=""
				color='yellow'
				data={userStore.followsList}
				linkText='See all your project follows' />
		)

		const featuredContent = libraryStore.libraryData.map(item => {
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

		/*const inviteList = (userStore.inviteList.length > 0) && (
			<div className="indexPage__inviteList">
				{userStore.inviteList.map(invite => {
					return <p onClick={() => this.handleAcceptInvite(invite.id)} key={invite.id}>You have a new invite, click this to add this to your followed projects</p>
				})}
			</div>
		)*/

		const newProjectData = {
			name: "Create a New Project",
			description: "Learn to use reqfire with your first project",
			tags: "featured,tutorial",
		}



		return (
			<div>
				<div className="temp_background"></div>
				<div className="indexPage__container">
					{/*<IndexNotification />*/}
					<IndexFeature 
						data={newProjectData}
						color='primary'
						icon='plus-thin-lg'
						buttonText='Create a new project'
						onClick={() => this.handleClickFeature()}
					>
						<div className="projectDetail__create" >Get Started!</div>
					</IndexFeature>

					<IndexProjects 
						title="Existing Projects"
						subtitle=""
						color='yellow'
						data={userStore.projectsList}
						linkText='See all your existing projects' />
						
					{projectFollowsList}
					<IndexProjects 
						title="Get started with a template"
						subtitle=""
						color='yellow'
						// data={userStore.projectsList}
						linkText='' />
					{featuredContent}

				</div> 
			</div>
		);
	}
}

export default IndexPage;
