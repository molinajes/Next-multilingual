import React, { Component, PropTypes } from 'react';

import IconPositioned from '../Iconic/IconPositioned';
import getIconicName from '../../utils/getIconicName';
import InputFieldSubmit from '../Editable/InputField_Submit';

import {observer, inject} from 'mobx-react';

@inject('packageStore')
@observer
class CreatePackage extends Component {
	static propTypes = {
		packageStore: PropTypes.object.isRequired
	}

	onSubmit = (value) => {
		const {packageStore} = this.props;
		packageStore.createPackage(value);
	}

	render() {
		// const {} = this.props;
		return (
			
			<div className={`packageListItem__tile`} 
				style={{opacity: 0.7}}
				onClick={this.onClickTile}>
					<IconPositioned iconSize="40" iconicType={getIconicName('package')}  iconHoverColor='mango' />
					<InputFieldSubmit
						value={''}
						placeholder="Add a New Package"
						onSubmit={this.onSubmit}
						inputClass={"inputClass"}
						formClass={"formClass"}
						divClass={"packageListItem__create"}
						/>
				
			</div>
		);
	}
}

export default CreatePackage;
// <div className="package__package" style={{opacity: 0.3}}>
// 				<div className="package__header">
// 					<IconicIcon dataSrc={'fire-sm'} iconClass={'package__header__icon'} />
// 					<form onSubmit={this.onSubmit}>
// 						<input type="text"
// 							name="packageName"
// 							placeholder={'Create a New Package'}
// 							onChange={this.onChange}
// 							value={uiStore.createPackage}/>
// 					</form>
// 				</div>
// 			</div>