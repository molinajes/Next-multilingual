import React, {Component, PropTypes} from 'react';
import {observer, inject} from 'mobx-react';
import axios from 'axios';

import Chart from 'chart.js';

@inject('projectStore')
@observer
class ProjectActivity extends Component {

	static propTypes = {
		projectStore: PropTypes.object.isRequired
	}

	componentDidMount = () => {
		const {projectStore} = this.props;
		if (ENV_PRODUCTION) {
			axios.get('/app/project/reactprojectactivity')
			.then(response => {
				projectStore.setActivityData(response.data.content);
				this.drawChart();
			})
		}
		else {
			if (projectStore.activityData) {
				this.drawChart();
			}
		}
		
	}
		
	drawChart = () => {
		const {projectStore} = this.props;

		let total = 0;
		if (projectStore.activityData) {
			const activityData = projectStore.activityData.map(data => {
				total += parseInt(data.changes);
				return {
					x: data.date,
					y: parseFloat(total)
				}
			})

			var ctx = this.refs.ourcanvas;

			var grd = ctx.getContext('2d').createLinearGradient(66.000, 300.000, 234.000, 0.000);
			// Add colors
			grd.addColorStop(0.158, 'rgba(252,208,24, 0.16)');
			// grd.addColorStop(0.158, 'rgba(255, 220, 133, 1.000)');
			grd.addColorStop(1.000, 'rgba(252,208,24, 1.000)');
			// grd.addColorStop(1.000, 'rgba(255, 255, 255, 1.000)');


			Chart.defaults.global.elements.line.backgroundColor = '#FEDFD0';
			Chart.defaults.global.elements.line.borderColor = '#FC5E18';

			new Chart(ctx, {
				type: 'line',
				data: {
					datasets: [
						{
							label: 'Activity Data',
							data: activityData
						}
					],
					xLabels: ['Day'],
					yLabels: ['Changes'],
				},
				options: {
					scales: {
						xAxes: [{
							type: 'time',
							time: {
								displayFormats: {
									day: 'D',
									month: 'Mo',
									year: ''
								},
								unit: 'day'
							},
							position: 'bottom'
						}]
					},
					backgroundColor: /*[
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)'
					]*/
					grd,
					borderColor: [
					'rgba(255,99,132,1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)'
					]
				}
			});
		}
		

	}


	render() {
		const {projectStore} = this.props;

		let changes, lastChanges, totalChanges, activityOverview; 

		if (projectStore.activityData) {
			changes = projectStore.activityData.sort((a,b) => {
				return parseFloat(a.day) > parseFloat(b.day) ? 1 : -1;
			})

			lastChanges = changes[changes.length - 1].changes;
			totalChanges = changes.reduce((total, day) => {
				return total + parseFloat(day.changes);
			}, 0);

			activityOverview = (
				<span className="text__subheading">
					{totalChanges} changes in total, {lastChanges} last session.
				</span>
			)
		}
		

		
		
		return (
			<div className="overviewEditor__activity">
					{activityOverview}
				{/*<div className="nav--logo11"><img src={tempGraph} alt=""/></div>*/}
				<div className="nav--logo11">
					<canvas ref='ourcanvas' ></canvas>
				</div>
			</div>
			);
	}

}

export default ProjectActivity;
