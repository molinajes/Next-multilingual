import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';
import IconicIcon from '../Iconic/IconicIcon';

@inject('useCaseStore', 'uiStore')
@observer
class UseCaseDelete extends Component {
	static propTypes = {
		useCaseStore: PropTypes.object.isRequired,
		useCaseData: PropTypes.object.isRequired,
		uiStore: PropTypes.object.isRequired
	}

	handleDelete = () => {
		const {useCaseStore, useCaseData, uiStore} = this.props;
		uiStore.setActiveUseCase('')
		useCaseStore.deleteUseCase(useCaseData);
	}

	render() {
		return (
			<div className="componentView__itemEdit" onClick={this.handleDelete}>
				<IconicIcon dataSrc={"trash-sm"} iconClass={"componentView__itemIcons--object"} />
			</div>
		);
	}
}

export default UseCaseDelete;
