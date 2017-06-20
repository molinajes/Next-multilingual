import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';


import IconPositioned from '../../../Iconic/IconPositioned';
import getIconicName from '../../../../utils/getIconicName';

@inject('uiStore')
@observer
class RuleOutput extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired,
		selected: PropTypes.bool
	}

	componentDidUpdate = () => {
		const {selected} = this.props;
		if (selected && this.wrapper) {
			console.log('wrapper', this.wrapper)
			window.wrapper = this.wrapper;
			window.scrollTo(0, this.wrapper.getBoundingClientRect().top-100);
		}
	}

	handleClickEdit = () => {
		const { data, uiStore } = this.props;
		// console.log('did click edit on rule')
		uiStore.setBottomBarDetails('rule', data.persistent_id);
	}

	render() {
		const {data} = this.props;

		return (
			<div className="ruleOutput__row" ref={ref => this.wrapper = ref} id={"rule_"+data.persistent_id}>
				<div className="ruleOutput__cell ruleOutput__cell--text">BR-{data.number}</div>
				<div className="ruleOutput__cell">
					{data.name}
				</div>
				<div className="ruleOutput__cell">
					{data.text ? data.text : <span style={{opacity: 0.5}}>(Empty Definition)</span>}
					{!IS_EXTERNAL_RELEASE && (	
						<div className='releaseContent__editIcon' onClick={this.handleClickEdit}>
							<IconPositioned 
								iconSize="40" 
								iconicType={getIconicName('edit')} 
								iconHoverColor='orange'/>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default RuleOutput;
