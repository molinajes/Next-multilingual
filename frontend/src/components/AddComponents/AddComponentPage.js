import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';
import IconPositioned from '../Iconic/IconPositioned';
import getIconicName from '../../utils/getIconicName'

import InputField from '../Editable/InputField_Auto';

import pageTitles from '../../assets/pageTitles.json';

import ComponentView from '../AddComponents/ComponentView';
import SubNav from '../Nav/SubNav';
import SubNavTab from '../Nav/SubNavTab';

@inject('uiStore', 'componentStore')
@observer
class AddComponentPage extends Component {
	static propTypes = {
		componentStore: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired
	}

	componentDidMount = () => {
		const {uiStore} = this.props;
		uiStore.setActivePage('components');
		document.title = pageTitles.addcomponents;
	}

	handleSearch = (e, component) => {
		const {uiStore} = this.props;
		uiStore.updateComponentSearch(e.target.value, component);
	}

	componentWillUnmount = () => {
		const {uiStore} = this.props;
		uiStore.clearComponentSearch();
	}

	render() {
		const {componentStore} = this.props;

		return (
			<div className='main__content'>
				<SubNav>
					<SubNavTab title="Interfaces" identifier="interfaces">
						<div className="pageNav__contentGroup">
							<IconPositioned 
								iconSize='24'
								iconicType={(getIconicName('interfaces'))} />
							<span className="pageNav__contentStat">-&nbsp;{componentStore.componentData.iface.length} </span>
						</div>
						{/*<span className="pageNav__contentStat">Search</span>*/}
							<InputField 
								// value={this.state.search}
								onChange={(e) => this.handleSearch(e, 'iface')} 
								placeholder={"Search"}
								onSubmit={null}
								editingText={''}
								inputClass={"inputClass"}
								formClass={"formClass"}
								divClass={"pageNav__search--interfaces"}
							/>
					</SubNavTab>	
					<SubNavTab title="Business Rules" identifier="rules">
						<div className="pageNav__contentGroup">
								<IconPositioned 
									iconSize='24'
									iconicType={(getIconicName('rules'))} />
							<span className="pageNav__contentStat">-&nbsp;{componentStore.componentData.rule.length} </span>
						</div>
						{/*<span className="pageNav__contentStat">Search</span>*/}
							<InputField 
								// value={this.state.search}
								onChange={(e) => this.handleSearch(e, 'rule')} 
								placeholder={"Search"}
								onSubmit={null}
								editingText={''}
								inputClass={"inputClass"}
								formClass={"formClass"}
								divClass={"pageNav__search--rules"}
							/>
					</SubNavTab>	
					<SubNavTab title="Forms" identifier="forms">
						<div className="pageNav__contentGroup">
								<IconPositioned 
									iconSize='24'
									iconicType={(getIconicName('forms'))} />
							<span className="pageNav__contentStat"> -&nbsp;{componentStore.componentData.form.length}</span>
						</div>
						{/*<span className="pageNav__contentStat">Search</span>*/}
							<InputField 
								// value={this.state.search}
								onChange={(e) => this.handleSearch(e, 'form')} 
								placeholder={"Search"}
								onSubmit={null}
								editingText={''}
								inputClass={"inputClass"}
								formClass={"formClass"}
								divClass={"pageNav__search--forms"}
							/>
					</SubNavTab>
					<SubNavTab title="Objects" identifier="objects">
						<div className="pageNav__contentGroup">
							<IconPositioned 
								iconSize='24'
								iconicType={(getIconicName('objects'))} />
							<span className="pageNav__contentStat">-&nbsp;{componentStore.componentData.object.length}</span>
						</div>
						{/*<span className="pageNav__contentStat">Search</span>*/}
							<InputField 
								// value={this.state.search}
								onChange={(e) => this.handleSearch(e, 'object')} 
								placeholder={"Search"}
								onSubmit={null}
								editingText={''}
								inputClass={"inputClass"}
								formClass={"formClass"}
								divClass={"pageNav__search--objects"}
							/>
					</SubNavTab>						
				</SubNav>
				<ComponentView />
			</div>
		);
	}
}

export default AddComponentPage;
