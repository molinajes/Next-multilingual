import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import FormOutput from './Form/FormOutput';

@inject('componentStore')
@observer
class ReleaseForms extends Component {
	static propTypes = {
		componentStore: PropTypes.object.isRequired
	}

	

	render() {
		const {componentStore} = this.props;

		const forms = componentStore.componentData.form.map(form => {
			return <FormOutput data={form} key={form.persistent_id}/>
		})

		if (forms.length === 0) {
			// Don't output if there are no forms
			return null;
		}

		return (
			<div className="releaseContent__container" id="forms">
				<h1 className="reqModel__title rf-h1">Forms</h1>
				<label className="rf-label">Forms:</label>
				<p className="rf-p">Forms define fields and areas for actor inputted information.</p>
				{forms}
				
			</div>
		);
	}
}

export default ReleaseForms;
