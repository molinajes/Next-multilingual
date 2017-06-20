import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import ComponentFilter from '../Component/ComponentFilter';
import ApprovalFilter from './ApprovalFilter';
import PriorityFilter from './PriorityFilter';

// import IconicIcon from '../Iconic/IconicIcon';

@inject('uiStore')
@observer
class Filters extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired
	}

	onChange = (e) => {
		this.props.uiStore.requirementSearchChange(e.target.value);
	}

	render() {
		const {uiStore} = this.props;
		return (
			<div className="gather__filters">
				<div className="filter__requirements">
					Filter by requirement:
					<input type="text" onChange={this.onChange} value={uiStore.requirementSearchInput} className='gather__search'/>
				</div>
				<div className="filter__components">
					Filter:
					<ApprovalFilter />
					<PriorityFilter />
					<div className="requirement__icon"></div>
					<ComponentFilter type={'iface'}/>
					<ComponentFilter type={'rule'}/>
					<ComponentFilter type={'form'}/>
					<ComponentFilter type={'object'}/>
				</div>
			</div>
		);
	}
}

export default Filters;
