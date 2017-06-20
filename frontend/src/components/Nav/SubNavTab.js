import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';
import Tooltip  from 'rc-tooltip';
import IconPositioned from '../Iconic/IconPositioned';

import tooltipMessages from '../../assets/tooltipMessages';

@inject('uiStore')
@observer
class SubNavTab extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired,
		title: PropTypes.string.isRequired,
		identifier: PropTypes.string.isRequired,
		children: PropTypes.node
	}

	handleClick = () => {
		const {identifier, uiStore} = this.props;
		uiStore.toggleNavTooltip(identifier);
	}

	render() {
		const {title, identifier, uiStore} = this.props;
		return (
			<div className={`pageNav__${identifier}`}>
				<div className="pageNav__tab">
					<div className="pageNav__title">
						<div className="pageNav__titleText">{title}</div>
					</div>
					<div className="pageNav__content">
						{this.props.children}
					</div>
						<Tooltip 
							placement="left" 
							trigger={['hover']} 
							visible={uiStore.navTooltips[identifier]}
							overlay={tooltipMessages[identifier].main} 
							mouseEnterDelay={0.5}
							destroyTooltipOnHide={true} >
							<div 
								className={uiStore.navTooltips[identifier] ? "pageNav__helpIcon--active" : "pageNav__helpIcon" }
								style={{marginLeft: 'auto'}}
							>
								<IconPositioned 
									iconSize='16'
									// iconColor='light'
									iconicType='question-mark-sm' 
									onClick={this.handleClick}
								/>
							</div>
						</Tooltip>
				</div>
			</div>
		);
	}
}

export default SubNavTab;
