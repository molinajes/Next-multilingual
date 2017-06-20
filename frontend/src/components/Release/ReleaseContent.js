import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

// import ReleaseIntroduction from './ReleaseSections/ReleaseIntroduction';
import ReleaseActors from './ReleaseSections/ReleaseActors';
import ReleaseObjects from './ReleaseSections/ReleaseObjects';
import ReleasePackages from './ReleaseSections/ReleasePackages';
import ReleaseInterfaces from './ReleaseSections/ReleaseInterfaces';
import ReleaseRules from './ReleaseSections/ReleaseRules';
import ReleaseForms from './ReleaseSections/ReleaseForms';
// import ReleaseGlossary from './ReleaseSections/ReleaseGlossary';
// import ReleaseOther from './ReleaseSections/ReleaseOther';

import ReleaseCreateSection from './ReleaseSections/ReleaseCreateSection';
import ReleaseSection from './ReleaseSections/ReleaseSection';

@inject('uiStore', 'categoryStore')
@observer
class ReleaseContent extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired,
		categoryStore: PropTypes.object.isRequired,
		tab: PropTypes.string,
		selectedId: PropTypes.string
	}

	constructor(props) {
		super(props);
		this.state = {
			loading: true
		}
	}	

	componentDidMount = () => {
		setTimeout(() => {
			this.setState({
				loading: false
			})
		}, 50);
	}

	render() {
		const {tab, selectedId, categoryStore} = this.props;

		const introduction = categoryStore.categoryData.filter(category => {
			return category.flag === '0';
		}).map(category => {
			return <ReleaseSection data={category} key={category.persistent_id} />
		})	

		const topCategories = categoryStore.categoryData.filter(category => {
			return category.flag === '1';
		}).map(category => {
			return <ReleaseSection data={category} key={category.persistent_id} />
		})
		const bottomCategories = categoryStore.categoryData.filter(category => {
			return category.flag === '2';
		}).map(category => {
			return <ReleaseSection data={category} key={category.persistent_id} />
		})

		if (!this.state.loading) {
			return (
				<div className={!IS_EXTERNAL_RELEASE ? "release__contentContainer" : "release__contentContainer release__contentContainer--external"}>
					
					{/*<ReleaseSection data={{name: "Architecture", text3: '{"entityMap":{},"blockMap":{"a4m51":{"key":"a4m51","type":"unstyled","text":"Something here","characterList":[{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null},{"style":[],"entity":null}],"depth":0,"data":{}},"f623g":{"key":"f623g","type":"unstyled","text":"something in bold","characterList":[{"style":["BOLD"],"entity":null},{"style":["BOLD"],"entity":null},{"style":["BOLD"],"entity":null},{"style":["BOLD"],"entity":null},{"style":["BOLD"],"entity":null},{"style":["BOLD"],"entity":null},{"style":["BOLD"],"entity":null},{"style":["BOLD"],"entity":null},{"style":["BOLD"],"entity":null},{"style":["BOLD"],"entity":null},{"style":["BOLD"],"entity":null},{"style":["BOLD"],"entity":null},{"style":["BOLD"],"entity":null},{"style":["BOLD"],"entity":null},{"style":["BOLD"],"entity":null},{"style":["BOLD"],"entity":null},{"style":["BOLD"],"entity":null}],"depth":0,"data":{}},"cgu2u":{"key":"cgu2u","type":"unstyled","text":"","characterList":[],"depth":0,"data":{}},"5ruk7":{"key":"5ruk7","type":"unstyled","text":"hello","characterList":[{"style":["BOLD"],"entity":null},{"style":["BOLD"],"entity":null},{"style":["BOLD"],"entity":null},{"style":["BOLD"],"entity":null},{"style":["BOLD"],"entity":null}],"depth":0,"data":{}}},"selectionBefore":{"anchorKey":"5ruk7","anchorOffset":0,"focusKey":"5ruk7","focusOffset":0,"isBackward":false,"hasFocus":true},"selectionAfter":{"anchorKey":"5ruk7","anchorOffset":5,"focusKey":"5ruk7","focusOffset":5,"isBackward":false,"hasFocus":true}}'}} />*/}
					{introduction}
					{topCategories}
					{!IS_EXTERNAL_RELEASE ? <ReleaseCreateSection flag='1'/> : ''}
					<ReleaseObjects selectedSection={tab} selectedId={selectedId}/>
					<ReleaseActors selectedSection={tab} selectedId={selectedId}/>
					<ReleasePackages selectedSection={tab} selectedId={selectedId}/>
					<ReleaseInterfaces selectedSection={tab} selectedId={selectedId}/>
					<ReleaseRules selectedSection={tab} selectedId={selectedId}/>
					<ReleaseForms selectedSection={tab} selectedId={selectedId}/>
					{/*<ReleaseGlossary selectedSection={tab} selectedId={selectedId}/>*/}
					{bottomCategories}
					{!IS_EXTERNAL_RELEASE ? <ReleaseCreateSection flag='2'/> : ''}
					{/*<ReleaseOther selectedSection={tab} selectedId={selectedId}/>*/}
				</div>
			)
		} else {
			return (
				<div className="release__contentContainer">
					Loading
				</div>
			);
		}
	}
}

export default ReleaseContent;
