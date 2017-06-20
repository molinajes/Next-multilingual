import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import pageTitles from '../../assets/pageTitles.json';
import getIconicName from '../../utils/getIconicName';
import IconPositioned from '../Iconic/IconPositioned';

import RequirementView from './RequirementView';
import SubNav from '../Nav/SubNav';
import SubNavTab from '../Nav/SubNavTab';

import InputField from '../Editable/InputField_Auto';


// import Filters from './Filters';
// import GatherSidebar from '../GatherSidebar/GatherSidebar';


@inject('uiStore', 'requirementStore')
@observer
class Gather extends Component {

	static propTypes = {
		requirementStore: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired
	}

	componentDidMount() {
		const {uiStore} = this.props;
		uiStore.setActivePage('gather');
		document.title = pageTitles.gather;

	}

	handleSearch = (e) => {
		const {uiStore} = this.props;
		uiStore.requirementSearchChange(e.target.value);
	}

	componentWillUnmount = () => {
		const {uiStore} = this.props;
		uiStore.requirementSearchChange('');
	}

	handleClickExpandModules = () => {
		const {requirementStore} = this.props;
		requirementStore.groupData.forEach(module => {
			module.setExpanded(true);
		});
	}

	handleClickCollapseModules = () => {
		const {requirementStore} = this.props;
		requirementStore.groupData.forEach(module => {
			module.setExpanded(false);
		});
	}

	render() {
		const {requirementStore} = this.props;		

		const moduleCount = requirementStore.groupData.length;
		const requirementCount = requirementStore.requirementData.length;

		return (
			<div className='main__content'>
				<SubNav>
					<SubNavTab title="Modules" identifier="modules">
						<div className="pageNav__contentGroup">
							<IconPositioned 
								iconSize='24'
								iconicType={getIconicName('module')} />
							<span className="pageNav__contentStat">- {moduleCount}</span>
						</div>
						<div className="pageNav__contentGroup">
							<IconPositioned 
								iconSize='24'
								iconicType={getIconicName('requirement')} />
							<span className="pageNav__contentStat">- {requirementCount}</span>
						</div>
						
					</SubNavTab>

					<SubNavTab title="Requirements" identifier="requirements">
						<div className="pageNav__contentGroup">
							<InputField 
								// value={this.state.search}
								placeholder="Search"
								onChange={this.handleSearch} 
								onSubmit={null}
								editingText={''}
								inputClass={"inputClass"}
								formClass={"formClass"}
								divClass={"pageNav__search--requirements"}
							/>
						</div>
						<div className="pageNav__collapseToggle">
							<IconPositioned 
								onClick={this.handleClickExpandModules}
								iconSize={'40'} 
								iconColor={'primary'} 
								iconicType={getIconicName('expand')}  />
							<IconPositioned 
								onClick={this.handleClickCollapseModules}
								iconSize={'40'} 
								iconColor={'primary'} 
								iconicType={getIconicName('collapse')}  />	
						</div>
					</SubNavTab>	

					<SubNavTab title="Linked Components" identifier="linkedComponents">

					</SubNavTab>						
				</SubNav>
				<RequirementView />
			</div>
		);
	}
}

export default Gather;
