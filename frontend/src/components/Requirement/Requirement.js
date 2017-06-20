import React, { Component, PropTypes  } from 'react';
import {observer, inject} from 'mobx-react';
import { DragSource, DropTarget } from 'react-dnd';

import ComponentSelector from '../Component/ComponentSelector';
import RequirementTitle from './RequirementTitle';
import RequirementDetail from './RequirementDetail';
import IconPositioned from '../Iconic/IconPositioned';
import IconSwitch from '../Iconic/IconSwitch';
import Tooltip  from 'rc-tooltip';

import getIconicName from '../../utils/getIconicName';
import tooltipMessages from '../../assets/tooltipMessages';

import {requirementTarget, requirementSource} from './requirementDragLogic';


@inject('uiStore','requirementStore')
@DropTarget('requirement', requirementTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))
@DragSource('requirement', requirementSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging(),
}))
@observer
class Requirement extends Component {

	static propTypes = {
		uiStore: PropTypes.object.isRequired,
		firstChild: PropTypes.bool.isRequired,
		requirementStore: PropTypes.object.isRequired,
		connectDragSource: PropTypes.func.isRequired,
		connectDragPreview: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		isOver: PropTypes.bool.isRequired,
		requirementData: PropTypes.object.isRequired
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
		const {uiStore, requirementData} = this.props;
		uiStore.setBottomBarDetails('requirement', requirementData.persistent_id);
	}

	render() {
		const {uiStore,
				requirementData,
				firstChild,
				connectDragSource,
				connectDragPreview,
				connectDropTarget,
				isDragging} = this.props;

		let opacity = isDragging ? 0 : 1;
		opacity = requirementData.loading ? 0.5 : opacity;

		
		let details = requirementData.children.filter((detail) => {
			return detail.name.toLowerCase().indexOf(uiStore.requirementSearchInput.toLowerCase()) !== -1;
		}).map((detail) => {
			return <RequirementDetail key={detail.persistent_id} detailData={detail} />
		})
		
		return (
			connectDragPreview(
				<div className="requirement__container" style={{opacity}} >
					<div className={"requirement__requirement"} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
						<div className={"requirement__row"}>
							<div className="requirement__typeColumn">
								<Tooltip 
									placement="left" 
									overlay={tooltipMessages.requirements.drag} 
									visible={firstChild && uiStore.navTooltips.requirements}
									destroyTooltipOnHide={true} >	
									{connectDragSource(connectDropTarget(
										<div className={"requirement__type" }>
											<IconPositioned iconSize="40" iconicType={'chat-sm'} iconHoverColor='orange' />
										</div>
									))}
								</Tooltip>							
							</div>
							<div className="requirement__title">
								<Tooltip 
									placement="bottom" 
									overlay={tooltipMessages.requirements.title} 
									visible={firstChild && uiStore.navTooltips.requirements}
									destroyTooltipOnHide={true} >
									<RequirementTitle requirementData={requirementData} />
								</Tooltip>
								<IconSwitch 
									iconSize='40' 
									override={this.state.hovered}
									iconicType={''}
									onClick={this.handleClickEdit}
									iconicHoverType={getIconicName('edit')} />
							</div>

							<div className="requirement__buttonContainer">
								<Tooltip 
									placement="top" 
									// trigger={['hover']} 
									overlay={tooltipMessages.linkedComponents.link} 
									visible={firstChild && uiStore.navTooltips.linkedComponents}
									mouseEnterDelay={0.5}
									destroyTooltipOnHide={true} >
									<div className="requirement__componentGroup">
										<Tooltip 
											placement="topLeft" 
											trigger={['hover']} 
											overlay={'Link an Interface'} 
											mouseEnterDelay={0.5}
											destroyTooltipOnHide={true} >
											<ComponentSelector 
												componentType='iface' 
												parentType='requirement' 
												parentData={requirementData}
												parentLoading={requirementData.loading} />
										</Tooltip>
										<Tooltip 
											placement="topLeft" 
											trigger={['hover']} 
											// overlayClassName="test"
											// visible={uiStore.tooltip.requirements}
											overlay={'Link a Business Rule'} 
											mouseEnterDelay={0.5}
											destroyTooltipOnHide={true} >
											<ComponentSelector 
												componentType='rule' 
												parentType='requirement' 
												parentData={requirementData}
												parentLoading={requirementData.loading} />
										</Tooltip>
										<Tooltip 
											placement="topLeft" 
											trigger={['hover']} 
											overlay={'Link a Form'} 
											mouseEnterDelay={0.5}
											destroyTooltipOnHide={true} >
											<ComponentSelector 
												componentType='form' 
												parentType='requirement' 
												parentData={requirementData}
												parentLoading={requirementData.loading} />
										</Tooltip>
										<Tooltip 
											placement="topLeft" 
											trigger={['hover']} 
											overlay={'Link an Object'} 
											mouseEnterDelay={0.5}
											destroyTooltipOnHide={true} >
											<ComponentSelector 
												componentType='object' 
												parentType='requirement' 
												parentData={requirementData}
												parentLoading={requirementData.loading} />
										</Tooltip>
									</div>
								</Tooltip>						
							</div>
						</div>
					</div>					
					{details}					
				</div>
			)
		);
	}
}

export default Requirement;
