import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';
import axios from 'axios';
import Select from 'react-select';

import DeleteObject from '../Delete/DeleteObject';
import {AppToaster} from '../../components/Toaster/AppToaster';


@inject('projectStore')
@observer
class ReleaseSettings extends Component {
	static propTypes = {
		projectStore: PropTypes.object.isRequired
	}

	handleFinaliseRelease = () => {
		const {projectStore} = this.props;
		let id;

		const release = projectStore.releases.find(obj => obj.status === '1');
		if (release) {
			id = release.id;
			console.log({id})
		}
		
		axios.post(`/app/release/reactfinalise`, `release[release]=${id}`)
		.then(response => {
			
			projectStore.setReleases(response.data.content.projectdetails.releases)
			AppToaster.show({ message: `Finalised a new release.`});
		})
	}

	handleChange = (data) => {		
		const {projectStore} = this.props;
		
		window.open(`/app/project/extview/id/${projectStore.projectDetails.project_extlink}/release/${data.value}`, '_blank');

		/*axios.get(`/app/component/reactload/release/${data.value}`)
		.then(response => {
			console.log('res',response)
			mainStore.getInitialData(response.data.content);
			AppToaster.show({ message: `Now Viewing Release ${data.label}` });
		})*/
	}

	externalRelease = () => {
		const {projectStore} = this.props;
		window.open('/app/project/extview/id/' + projectStore.projectDetails.project_extlink, '_blank');
	}

	render() {
		const {projectStore} = this.props;
		const options = [];
		// const release = projectStore.releases.find(obj => obj.status === '1');

		/*options.push({
			value: '',
			label: `View External Release`
		})*/

		projectStore.releases.forEach(release => {
			if (release.status !== '1') {
				options.push({
					value: release.id,
					label: `Release ${release.number}`
				})
			}			
		})



		return (
			<div className="release__settings">
				{options.length > 0 && (
					<div className="pageNav__contentGroup">
						Select Release Version:
					</div>		
				)}
				{options.length > 0 && (
					<div className="pageNav__contentGroup">
						<div style={{width: '11rem', marginRight: '2rem'}}>
							<Select
								name="form-actor-select"
								value='draft'
								placeholder="View External Release"
								options={options}
								onChange={(e) => this.handleChange(e)}
								clearable={false}
							/>
						</div>
					</div>
				)}
				<div className="pageNav__contentGroup">
					Finalise a Release
					<DeleteObject
						icon={'pin-sm'}
						confirmationMessage="This will create a new release of your project. Continue?"
						onDelete={this.handleFinaliseRelease} />
				</div>
				{/*<div className="pageNav__contentGroup">
					View Latest External Release
					<IconPositioned 
						iconSize="40" 
						iconicType={'external-link-sm'}
						// iconicHoverType={'external-link-sm'}
						iconColor='orange' 
						onClick={this.externalRelease}/>
				</div>*/}

			</div>
		);
	}
}

export default ReleaseSettings;
