import React, { Component, PropTypes } from 'react';
import {observer} from 'mobx-react';
import IconPositioned from '../Iconic/IconPositioned';
import ss from '../../utils/stripslashes';

@observer
class IndexTile extends Component {
	static propTypes = {
		onClick: PropTypes.func,
		data: PropTypes.object,
		title: PropTypes.string,
		icon: PropTypes.string.isRequired,
		tileType: PropTypes.string,
		color: PropTypes.string
	};

	render() {
		const { title, icon, data } = this.props;


		return (
			<div className="indexTile" onClick={this.props.onClick}>
				<div 
					className="indexTile__container" 
				>
					<div className="indexTile__icon">
						<IconPositioned 
							iconSize='56'
							iconicType={icon ? `${icon}-md` : 'fire-md'}
							iconColor='primary' />
					</div>
				</div>

				<div className="indexTile__title">
					{title}
					{data && ss(data.name)}
				</div>
			</div>
		);
	}
}

export default IndexTile;