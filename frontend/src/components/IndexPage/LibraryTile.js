import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';
import {withRouter} from 'react-router'
import IndexTile from './IndexTile';

@inject('mainStore')
@withRouter
@observer
class LibraryTile extends Component {

	static propTypes = {
		mainStore: PropTypes.object.isRequired,
		router: PropTypes.object.isRequired,
		data: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			hovered: false
		}
	}

	handleClickCreate = () => {
		const {router} = this.props;
		router.push('/app/create')
	}

	render() {
		const {data, ...props} = this.props;
		return <IndexTile data={data} onClick={this.handleClick} {...props}/>
	}
}

export default LibraryTile;