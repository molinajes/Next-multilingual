import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import ReleaseNavigation from './ReleaseNavigation';
import ReleaseContent from './ReleaseContent';
import ReleaseSettings from './ReleaseSettings';
// import IconPositioned from '../Iconic/IconPositioned';

import SubNav from '../Nav/SubNav';
import SubNavTab from '../Nav/SubNavTab';

import pageTitles from '../../assets/pageTitles.json';

@inject('uiStore', 'projectStore')
@observer
class Release extends Component {
	static propTypes = {
		projectStore: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired,
		params: PropTypes.object.isRequired,
		isExternalRelease: PropTypes.bool
	}

	componentDidMount = () => {
		const {uiStore} = this.props;
		uiStore.setActivePage('output');
		document.title = pageTitles.release;
	}

	render() {
		const {params, projectStore} = this.props;

		return (
			<div className="main__content">
				{
					!IS_EXTERNAL_RELEASE 
					? 
				<SubNav>
					<SubNavTab title="Full Requirements Model" identifier="release">

					</SubNavTab>	
					<SubNavTab title={projectStore.projectDetails.project_name} identifier="releaseSettings">
						<ReleaseSettings />
					</SubNavTab>	
										
				</SubNav>
				: null
				}

				<div className={!IS_EXTERNAL_RELEASE ? "release__container" : "release__container--external"}>
					<ReleaseNavigation />
					<div className={!IS_EXTERNAL_RELEASE ? "release__modelContainer" : "release__modelContainer--external"}>
						<ReleaseContent tab={params.tab} selectedId={params.id}/>
					</div>
					
				</div>
			</div>
		);
	}
}

export default Release;
