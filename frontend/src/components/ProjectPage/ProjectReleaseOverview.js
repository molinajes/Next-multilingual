import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';



@inject('projectStore')
@observer
class ProjectReleaseOverview extends Component {
	static propTypes = {
		projectStore: PropTypes.object.isRequired
	}

	render() {
		const {projectStore} = this.props;

		const releases = projectStore.releases.map(release => {
			return (
				<div className="overviewEditor__row projectReleaseOverview__row" key={release.id}>
					<div className="overviewEditor__cell">{release.number}</div>
					<div className="overviewEditor__cell">{release.create_date}</div>
				</div>
				)
		})

		return (
			<div className="overviewEditor__table projectReleaseOverview__table">
				<div className="overviewEditor__tableHead projectReleaseOverview__tableHead">
					<div className="overviewEditor__cell">Release</div>
					<div className="overviewEditor__cell">Date</div>
				</div>
					{releases}
			</div>
		);
	}
}

export default ProjectReleaseOverview;

