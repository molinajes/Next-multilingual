import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';
import IconPositioned from '../Iconic/IconPositioned';
import getIconicName from '../../utils/getIconicName';

import { DropTarget } from 'react-dnd';

const useCaseTarget = {

	hover(props, monitor) {
		
		const draggedObject = monitor.getItem().draggedObject;
		const overPackageId = props.packageData.persistent_id;
		if (!draggedObject) return;
		if (draggedObject.parent_id !== overPackageId) {
			//Add the dragged usecase to this packages list
			const previousPackageArray = props.packageStore.packageData.find(obj => obj.persistent_id === draggedObject.parent_id).children;
			// Set where the new monitored item is temp stored
			monitor.getItem().draggedObject.parent_id = overPackageId;
			previousPackageArray.splice(previousPackageArray.findIndex(obj => obj.persistent_id === draggedObject.persistent_id),1);
			const newPackageArray = props.packageData.children;
			draggedObject.parent_id = overPackageId;
			newPackageArray.push(draggedObject);
		}
	}
}

@inject('packageStore', 'uiStore')
@DropTarget(['useCase'], useCaseTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))
@observer
class PackageListItem extends Component {
	static propTypes = {
		packageStore: PropTypes.object.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		isOver: PropTypes.bool.isRequired,
		uiStore: PropTypes.object.isRequired,
		packageData: PropTypes.object.isRequired
	}

	onClickTile = () => {
		const {uiStore, packageData} = this.props;
		uiStore.setActivePackage(packageData.persistent_id);
	}

	render() {
		const {packageData, uiStore, connectDropTarget, isOver} = this.props;
		
		

		return connectDropTarget(
			<div className={`packageListItem__tile${(uiStore.activePackage === packageData.persistent_id || isOver) ? '--active' : ''}`} 
				onClick={this.onClickTile}>
					<IconPositioned iconSize="40" iconicType={getIconicName('package')}  />
					<div className="packageList__name">
						{packageData.name}
					</div> 
				
			</div>
		);
		
	}
}

export default PackageListItem;
