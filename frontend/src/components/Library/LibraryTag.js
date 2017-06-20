import React, { Component, PropTypes } from 'react';
import IconPositioned from '../Iconic/IconPositioned';

// import getIconicName from '../../utils/getIconicName'

class LibraryTag extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired
	};

	render() {
		const {data } = this.props;

		let tagClassName; 

		if (data.name === 'Featured') {
			tagClassName = 'libraryTag--feature';
		}
		else if (data.name === 'Tutorial') {
			tagClassName = 'libraryTag--tutorial';
		}
		else if (data.name === 'Social') {
			tagClassName = 'libraryTag--article';
		}

		return (
			<div className={'libraryTag ' + tagClassName}>
				<div className="libraryTag__container">
					<IconPositioned 
						iconSize='32'
						iconicType={data.icon + '-sm'}
						iconColor='light' />
					<div className="libraryTag__name">{data.name}</div>
				</div>
			</div>
		);
	}
}

export default LibraryTag;
