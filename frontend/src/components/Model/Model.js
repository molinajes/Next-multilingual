import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';
// import IconPositioned from '../Iconic/IconPositioned';

// import getIconicName from '../../utils/getIconicName';
// import getItemFromArray from '../../utils/getItemFromArray';
// import ActorsList from '../Actor/ActorsList';
// import PackageList from '../Package/PackageList';

import SubNav from '../Nav/SubNav';
import SubNavTab from '../Nav/SubNavTab';

import ModelContent from './ModelContent';
// import Modal from 'react-modal';
// import UseCaseEditor from '../UseCaseEditor/UseCaseEditor';
import pageTitles from '../../assets/pageTitles.json';

@inject('uiStore', 'requirementStore', 'packageStore')
@observer
class Model extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired,
		requirementStore: PropTypes.object.isRequired,
		packageStore: PropTypes.object.isRequired
	}

	componentDidMount = () => {
		const {packageStore, uiStore} = this.props;
		if(uiStore.activePackage === '' && packageStore.packageData.length) {
			uiStore.setActivePackage(packageStore.packageData[0].persistent_id)
		}
		uiStore.setActivePage('model');
		document.title = pageTitles.model;
	}
	
	render() {
		// const {uiStore, packageStore} = this.props;

		// let randomPlaceholder = Math.round(Math.random() * 10);

		/*let activePackage = getItemFromArray(packageStore.packageData, uiStore.activePackage);
		let packageTitle = '';
		if (activePackage) packageTitle = `${activePackage.number} - ${activePackage.name}`;
*/
		return (
			<div className='main__content'>
				<SubNav>
					<SubNavTab title="Packages" identifier="packages">
						{/*<div className="pageNav__contentGroup">
							<span className="pageNav__contentStat">{randomPlaceholder} -</span>
							Packages
							<span className="pageNav__contentStat">-&nbsp;{randomPlaceholder}</span>
						</div>
						<div className="pageNav__contentGroup">
							<IconPositioned 
								iconSize='24'
								iconicType='fire-sm' />
							<span className="pageNav__contentStat">-&nbsp;{randomPlaceholder} </span>
						</div>
						<div className="pageNav__contentGroup">
							<IconPositioned 
								iconSize='24'
								iconicType={getIconicName('step')} />
						</div>
						</div>*/}
					</SubNavTab>	
					<SubNavTab title="Add Use Cases" identifier="usecases">
						{/*<div className="pageNav__contentGroup">
						</div>
						<div className="pageNav__contentGroup">
							<span className="pageNav__contentStat">{packageTitle}</span>
						</div>
						<div className="pageNav__contentGroup">
							Click for Use Case Diagram
							<IconPositioned
								iconSize='24'
								iconColor='orange'
								iconHoverColor='orange'
								iconicType={getIconicName('useCase')} />
								Click for Use Case Diagram
						</div>
						<div className="pageNav__contentGroup" style={{marginLeft: '15rem'}}>
								Linked to requirements 
							<IconPositioned 
								iconSize='24'
								iconicType={getIconicName('linked')} />
							<span className="pageNav__contentStat">{randomPlaceholder*2}/{randomPlaceholder*3} </span>
						</div>
						</div>*/}
					</SubNavTab>	
					<SubNavTab title="Add Steps" identifier="steps">
						{/*<div className="pageNav__contentGroup">
							<span className="pageNav__contentStat">{randomPlaceholder*6}</span>
							<IconPositioned 
								iconSize='24'
								iconicType={getIconicName('step')} />
								Steps 
						</div>*/}
					</SubNavTab>						
				</SubNav>

				<ModelContent />
				{/*<ModelRequirements />*/}
				{/*<UseCaseEditor />*/}
				
				{/*<Modal
					isOpen={uiStore.activeUseCase !== ''}
					// onAfterOpen={afterOpenFn}
					onRequestClose={this.handleClose}
					// closeTimeoutMS={n}
					// style={customStyle}
					contentLabel="Modal"
					overlayClassName="componentEditor__overlay"
					className="componentEditor__content"
				>
					<div className="componentEditorModal__background">
						<div className="componentEditorModal__border--iface">
							<div className="componentEditorModal__content">						
								<UseCaseEditor />
							</div>
						</div>
					</div>
				</Modal>*/}
			</div>
		);
	}
}

export default Model;
