import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';
import IndexTile from './IndexTile';

@inject('mainStore')
@observer
class ProjectTile extends Component {

	static propTypes = {
		mainStore: PropTypes.object.isRequired,
		data: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			hovered: false
		}
	}

	handleClick = () => {
		const {mainStore, data} = this.props;
		mainStore.setProject(data.id);
	}

	render() {
		const {data, ...props} = this.props;
		return <IndexTile data={data} onClick={this.handleClick} {...props}/>
	}
}

export default ProjectTile;