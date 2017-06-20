import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import UseCase from '../UseCase/UseCase';
import CreateUseCase from '../UseCase/CreateUseCase';

import IconPositioned from '../Iconic/IconPositioned';
import getIconicName from '../../utils/getIconicName';
import DeleteObject from '../Delete/DeleteObject';


@inject('actorStore', 'packageStore', 'uiStore')
@observer
class Package extends Component {
	static propTypes = {
		packageData: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired,
		actorStore: PropTypes.object.isRequired,
		packageStore: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);
		const useCasesExpanded = props.packageData.children.map(uc => {
			return {
				id: uc.persistent_id,
				expanded: true
			}
		});
		this.state = {
			useCasesExpanded: useCasesExpanded
		}
	}

	handleClickEdit = () => {
		const {uiStore, packageData} = this.props;
		uiStore.setBottomBarDetails('package', packageData.persistent_id);
	}

	handleClickExpand = () => {
		const {packageData} = this.props;
		packageData.children.forEach(uc => {
			uc.setExpanded(true);
		})
	}

	handleClickCollapse = () => {
		const {packageData} = this.props;
		packageData.children.forEach(uc => {
			uc.setExpanded(false);
		})
	}

	handleDelete = () => {
		const {packageData, packageStore} = this.props;
		packageStore.deletePackage(packageData);
	}

	render() {
		// const {actorStore, packageData} = this.props;
		const {packageData} = this.props;

		// const actors = actorStore.actorData.map(actor => {
		// 	return <Actor actorData={actor} key={actor.id}/>
		// });

		const useCases = packageData.children.map((useCase) => {
			return (
				<UseCase 
					useCaseData={useCase} 
					packageNumber={packageData.number}
					key={useCase.persistent_id}/>
			)
		})

		return (
			<div className="package__package">
				<div className="package__header">
					<IconPositioned 
						iconSize="40" 
						iconicType={getIconicName('package')} 	 />
					
					{packageData.name}

					
					<div 
						className="addComponentsItem__itemEdit" 
						onClick={this.handleClickEdit}
						style={{paddingLeft: '2em'}} >
						
						<IconPositioned 
							iconSize={'40'} 
							iconColor={'primary'}
							iconHoverColor={'orange'} 
							iconicType={getIconicName('edit')}  />						
					</div>
					<div 
						className="addComponentsItem__itemEdit" 
						onClick={this.handleClickExpand} >
						
						<IconPositioned 
							iconSize={'40'} 
							iconColor={'primary'} 
							iconHoverColor={'orange'} 
							iconicType={getIconicName('expand')}  />						
					</div>
					<div 
						className="addComponentsItem__itemEdit" 
						onClick={this.handleClickCollapse} >
						
						<IconPositioned 
							iconSize={'40'} 
							iconColor={'primary'} 
							iconHoverColor={'orange'} 
							iconicType={getIconicName('collapse')}  />						
					</div>
					<DeleteObject onDelete={this.handleDelete} data={packageData}/>
				</div>

				<div className="package__useCaseList">
					{useCases}
					<CreateUseCase packageId={packageData.persistent_id} useCaseNumber={useCases.length + 1}/>
				</div>
			</div>
		);
	}
}

export default Package;


