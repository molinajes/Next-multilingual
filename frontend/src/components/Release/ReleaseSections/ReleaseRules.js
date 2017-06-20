import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';
import IconPositioned from '../../Iconic/IconPositioned';

import RuleOutput from './Rule/RuleOutput';

@inject('componentStore')
@observer
class ReleaseRules extends Component {
	static propTypes = {
		componentStore: PropTypes.object.isRequired,
		selectedSection: PropTypes.string,
		selectedId: PropTypes.string
	}

	render() {
		const {componentStore, selectedSection, selectedId} = this.props;

		const rules = componentStore.componentData.rule.map(rule => {
			let selected = (selectedSection === 'rule' && selectedId === rule.persistent_id);
			return <RuleOutput data={rule} selected={selected} key={rule.id}/>
		})

		if (rules.length === 0) {
			// Don't output if there are no rules
			return null;
		}

		return (
			<div className="releaseContent__container" id="rules">
				<h1 className="reqModel__title rf-h1">Business Rule Register</h1>
					<label className="rf-label">Business Rules:</label>
					<p className="rf-p">Business Rules detail the logic and specifications of activity and definitions in the app.</p>
				<div className="releaseContent__componentGroup">
					
					{/*<div className="output__nestedComponent"></div>*/}
						<div className="ruleOutput__sectionContent">
							<div className="ruleOutput__table">
								<div className="ruleOutput__tableHead">
									<div className="ruleOutput__cell">
										<IconPositioned 
											iconSize="32"
											iconicType={'cogs-sm'}/>
									</div>
									<div className="ruleOutput__cell">Name</div>
									<div className="ruleOutput__cell">Definition</div>
								</div>
							</div>
							{rules}
						</div>
					
				</div>
			</div>
		);
	}
}

export default ReleaseRules;
