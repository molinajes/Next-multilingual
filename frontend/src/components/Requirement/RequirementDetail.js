import React, { Component, PropTypes  } from 'react';
import {observer, inject} from 'mobx-react';
import { DragSource, DropTarget } from 'react-dnd';

import ComponentSelector from '../Component/ComponentSelector';
import DetailTitle from './DetailTitle';
import IconPositioned from '../Iconic/IconPositioned';
import IconSwitch from '../Iconic/IconSwitch';
import Tooltip  from 'rc-tooltip';

import getIconicName from '../../utils/getIconicName';

import {requirementTarget, requirementSource} from './detailDragLogic';

@inject('requirementStore', 'uiStore')
@DropTarget('requirement', requirementTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))
@DragSource('requirement', requirementSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))
@observer
class RequirementDetail extends Component {

	static propTypes = {
		requirementStore: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired,
		connectDragSource: PropTypes.func.isRequired,
		connectDragPreview: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		detailData: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			hovered: false
		};
	}

	handleMouseEnter = () => {
		this.setState({hovered: true});
	}

	handleMouseLeave = () => {
		this.setState({hovered: false});
	}

	handleClickEdit = () => {
		const {uiStore, detailData} = this.props;
		uiStore.setBottomBarDetails('detail', detailData.persistent_id);
	}

	render() {
		const {
			detailData,
			connectDragSource,
			connectDragPreview,
			connectDropTarget,
			isDragging
		} = this.props;

		const opacity = isDragging ? 0.2 : 1;

		return connectDragPreview(connectDropTarget(
			<div className="requirement__requirement requirement__detailPosition" style={{opacity}} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
				<div className={"requirement__row"}>		
					{connectDragSource(
						<div className={"requirement__type" }>
							<IconPositioned iconSize="40" iconicType={'screenshot-sm'} iconHoverColor='orange' />
						</div>
					)}
					<div className="requirement__title">
						<DetailTitle detailData={detailData} />
						<IconSwitch 
							iconSize='40' 
							override={this.state.hovered}
							iconicType={''}
							onClick={this.handleClickEdit}
							iconicHoverType={getIconicName('edit')} />
					</div>
					<div className="requirement__componentGroup">				
						<Tooltip 
							placement="topLeft" 
							trigger={['hover']} 
							overlay={'Link an Interface'} 
							mouseEnterDelay={0.5}
							destroyTooltipOnHide={true} >
							<ComponentSelector componentType='iface' parentType='detail' parentData={detailData} />
						</Tooltip>	
						<Tooltip 
							placement="topLeft" 
							trigger={['hover']} 
							overlay={'Link a Business Rule'} 
							mouseEnterDelay={0.5}
							destroyTooltipOnHide={true} >	
							<ComponentSelector componentType='rule' parentType='detail' parentData={detailData} />
						</Tooltip>	
						<Tooltip 
							placement="topLeft" 
							trigger={['hover']} 
							overlay={'Link a Form'} 
							mouseEnterDelay={0.5}
							destroyTooltipOnHide={true} >	
							<ComponentSelector componentType='form' parentType='detail' parentData={detailData} />
						</Tooltip>	
						<Tooltip 
							placement="topLeft" 
							trigger={['hover']} 
							overlay={'Link an Object'} 
							mouseEnterDelay={0.5}
							destroyTooltipOnHide={true} >	
							<ComponentSelector componentType='object' parentType='detail' parentData={detailData} />
						</Tooltip>	
					</div>
				</div>
			</div>
		));
	}
}

export default RequirementDetail;

