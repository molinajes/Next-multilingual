import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import {observer, inject} from 'mobx-react';

import logo from '../../assets/img/logo-underlined.svg';

import getIconicName from '../../utils/getIconicName';


import ReleaseNavigationItem from './ReleaseNavigationItem';



// const prefix = "/app"; // TODO: JH: When people view external who are not logged in -> redirct to reqfire.com right? | AjH 

@inject('packageStore', 'uiStore', 'categoryStore', 'projectStore', 'componentStore')
@observer
class ReleaseNavigation extends Component {
	static propTypes = {
		packageStore: PropTypes.object.isRequired,
		categoryStore: PropTypes.object.isRequired,
		projectStore: PropTypes.object.isRequired,
		componentStore: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired
	}



	render() {
		const { packageStore, categoryStore, projectStore, componentStore } = this.props;

		const packageList = packageStore.packageData.map( (usecasePackage) => {
			return (
				<ReleaseNavigationItem 
					name={usecasePackage.name}
					slug="package"
					icon={getIconicName("package")}
					id={usecasePackage.persistent_id}
					key={usecasePackage.persistent_id}
					useCasePackageItem={true} />
			)
		});

		const introduction = categoryStore.categoryData.filter(category => {
			return category.flag === '0';
		}).map(category => {
			return (
				<ReleaseNavigationItem 
					name={category.name}
					slug={'category'}
					icon="list-sm"
					id={category.persistent_id}
					key={category.persistent_id} />
			)
		})
		const topCategories = categoryStore.categoryData.filter(category => {
			return category.flag === '1';
		}).map(category => {
			return (
				<ReleaseNavigationItem 
					name={category.name}
					slug={'category'}
					icon="document-sm"
					id={category.persistent_id}
					key={category.id} />
			)
		})
		const bottomCategories = categoryStore.categoryData.filter(category => {
			return category.flag === '2';
		}).map(category => {
			return (
				<ReleaseNavigationItem 
					name={category.name}
					slug={'category'}
					icon="document-sm"
					id={category.persistent_id}
					key={category.id} />
			)
		})

		return (
			<div className={!IS_EXTERNAL_RELEASE ? "releaseNavigation__container" : "releaseNavigation__container--external"} >

				<div className={!IS_EXTERNAL_RELEASE ? "releaseNavigation__sidebar" : "releaseNavigation__sidebar--external"} >
					{IS_EXTERNAL_RELEASE &&
						<div className="releaseNavigation__projectName">
							<label className="rf-label">Project Name</label>
							{projectStore.projectDetails.project_name}
						</div> 
					}
					{/*<ReleaseNavigationItem 
						name="Introduction"
						slug="section"
						icon="list-sm" />*/}
					{introduction}
					{topCategories}

					{(componentStore.componentData.object.length > 0) && (
						<ReleaseNavigationItem 
							name="Objects"
							slug="objects"
							icon={getIconicName('objects')} />
					)}

					<ReleaseNavigationItem 
						name="Actors"
						slug="actors"
						icon={getIconicName('actor')} />
					
					<ReleaseNavigationItem 
						name="Packages"
						slug="packages"
						icon={getIconicName('package')} >
						<div className="releaseNavigation__packageList"> {/* FIXME: These need their own component | AjH */}
							{packageList}
						</div>
					</ReleaseNavigationItem>

					
					{(componentStore.componentData.iface.length > 0) && (
						<ReleaseNavigationItem 
							name="Interfaces"
							slug="interfaces"
							icon={getIconicName('interfaces')} />
					)}

					{(componentStore.componentData.rule.length > 0) && (
						<ReleaseNavigationItem 
							name="Rules"
							slug="rules"
							icon={getIconicName('rules')} />
					)}

					{(componentStore.componentData.form.length > 0) && (
						<ReleaseNavigationItem 
							name="Forms"
							slug="forms"
							icon={getIconicName('form')} />
					)}

					

					{bottomCategories}

					{/*<ReleaseNavigationItem 
						name="Glossary"
						slug="glossary"
						icon="book-sm" />
					
					<ReleaseNavigationItem 
						name="Other Section"
						slug="other"
						icon="bug-sm" />*/}

					{IS_EXTERNAL_RELEASE &&
						<div className="releaseNavigation__logoContainer">
							<div className="releaseNavigation__logo">
									<Link to={"/"} >
										<img src={logo} alt="ReqFire"/>
									</Link>
								
							</div>
							<label className="rf-label">
								Model created with reqfire
							</label> 
							
							
						</div>
					}

				</div>

				

			</div>
			
		);
	}
}

export default ReleaseNavigation;
