import React, { Component, PropTypes } from 'react';
import {observer} from 'mobx-react';

import IconPositioned from '../Iconic/IconPositioned';

// @inject('')
@observer
class ComponentTile extends Component {
	static propTypes = {
		componentName: PropTypes.string.isRequired,
		componentData: PropTypes.object.isRequired,
		iconType: PropTypes.string.isRequired,

	}

	render() {
		const {componentData, componentName, iconType} = this.props;
		return (
			<div className={"addComponentsItem__tile"}>
				<IconPositioned 
					iconSize='40' 
					iconicType={iconType}
					iconHoverColor='mango'  />	
				<div className="addComponentsItem__name">
					<span>{componentData.length} {componentName}</span>
				</div>
			</div>
		);
	}
}

export default ComponentTile;
