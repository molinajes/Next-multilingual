import React, { Component, PropTypes } from 'react';
import {observer} from 'mobx-react';

import UseCaseDiagram from '../../Package/UseCaseDiagram';

// @inject('')
@observer
class PackageEditor extends Component {
	static propTypes = {
		componentData: PropTypes.object.isRequired
	}

	render() {
		const {componentData} = this.props;
		return (
			<div className="formEditor__container">
				<div className="componentEditorModal__sectionTitle--center">
					<p>Edit this package's Use Case Diagram below</p>
				</div>
				<div className="componentEditorModal__sectionContent">
					<UseCaseDiagram data={componentData} />
				</div>
			</div>
		);
	}
}

export default PackageEditor;
