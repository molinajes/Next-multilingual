import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

@inject('uiStore', 'projectStore')
@observer
class ExternalReleaseNav extends Component {

	static propTypes = {
		projectStore: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired
	}
	
	render() {
		const {projectStore} = this.props;
		return (
			<div>
				<nav className="externalNav__wrapper">
					<div className="externalNav__container">
						<div className="externalNav__projectName">
							<h3>{projectStore.projectDetails.project_name}: </h3><span> R-1.022</span>
							<p className="externalNav__releaseDate">
								15th July 2017
							</p>
						</div>
						<h1 className="externalNav__title">
							Requirements Model
						</h1>

					</div>
				</nav>
			</div>
		);
	}
}

export default ExternalReleaseNav;
