import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import uuid from 'uuid';

import stick from '../../assets/stick.png';
import getItemFromArray from '../../utils/getItemFromArray';
import ss from '../../utils/stripslashes';

import cytoscape from 'cytoscape';

@inject('actorStore', 'packageStore')
@observer
class UseCaseDiagram extends Component {

	static propTypes = {
		actorStore: PropTypes.object.isRequired,
		packageStore: PropTypes.object.isRequired,
		data: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			image: ''
		}
	}

	componentDidMount() {
		const {data, actorStore} = this.props;

		const elements = data.children.map(useCase => {
			return {
				data: {id: 'useCase_' + useCase.persistent_id, name: useCase.name, type: 'usecase', parent: 'useCaseParent'}
			}
		});
		elements.push({
			data: {id: 'useCaseParent', type: 'useCaseParent'}
		})

		let actorIds = [];
		let edges = [];
		data.children.forEach(useCase => {
			useCase.children.forEach(flow => {
				flow.children.forEach(step => {
					// console.log('step id', step.related1_id, 'actorsIds', actorIds);
					if (!actorIds.some(actorId => {
						return actorId === step.related1_id;
					})) {
						actorIds.push(step.related1_id);
					}
					if (!edges.some(edge => {
						return edge.data.target === 'useCase_' + useCase.persistent_id  && edge.data.source === 'actor_' + step.related1_id;
					})) {
						edges.push({ // edge ab
							data: { id: uuid(), target: 'useCase_' + useCase.persistent_id, source: 'actor_' + step.related1_id }
						})
					}
					
				})
			})
		})

		let actors = actorIds.map(id => {
			const actor = getItemFromArray(actorStore.actorData, id);
			return { // node a
				data: { id: 'actor_' + actor.persistent_id, name: actor.name, type: 'actor', persistent_id: actor.persistent_id }
			}
		})

		/*let actors = actorIds.reduce((output, id) => {
			const actor = getItemFromArray(actorStore.actorData, id);
			if (actor) {
				return output.concat({ // node a
					data: { id: 'actor_' + actor.persistent_id, name: actor.name, type: 'actor', persistent_id: actor.persistent_id }
				});
			}
			else {
				return output;
			}
		}, [])*/


		this.cy = cytoscape({
			container: this.divRef,

			elements: elements,
			
			style: cytoscape.stylesheet()
				.selector('[type = "usecase"]')
				.css({
					'content': 'data(name)',
					'text-valign': 'center',
					'color': 'black',
					'border-color': 'black',
					'border-width': 1,
					'background-color': 'white',
					'width': 200,
					'height': 'label',
					'padding': 25,
					'text-max-width': 200,
					'text-wrap': 'wrap'
				})
				.selector('[type = "useCaseParent"]')
				.css({

					'text-valign': 'center',
					'color': 'black',

					'border-width': 0,
					'background-color': 'white',

				})
				.selector('[type = "actor"]')
				.css({
					'content': 'data(name)',
					'background-image': stick,
					'background-fit': 'cover',
					'width': 40,
					'height': 90,
					'shape': 'rectangle',
				})
				.selector('edge')
				.css({
					'curve-style': 'bezier',
					// 'control-point-distance': '20px',
					// 'control-point-weight': '0.7',
					// 'target-arrow-shape': 'triangle',
					'target-arrow-color': '#ccc',
					'source-endpoint': '500px 500px',
					'target-endpoint': '200px 200px',
					'line-color': '#000',
					'width': 1
				}),

			zoomingEnabled: false,
		});

		var options = {
			name: 'grid',

			fit: true, // whether to fit the viewport to the graph
			padding: 10, // padding used on fit
			boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
			avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
			avoidOverlapPadding: 5, // extra spacing around nodes when avoidOverlap: true
			condense: false, // uses all available space on false, uses minimal space on true
			rows: undefined, // force num of rows in the grid
			cols: 1, // force num of columns in the grid
			position: function(  ){}, // returns { row, col } for element
			sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
			animate: false, // whether to transition the node positions
			animationDuration: undefined, // duration of animation in ms if enabled
			animationEasing: undefined, // easing of animation if enabled
			ready: undefined, // callback on layoutready
			stop: undefined // callback on layoutstop
		};

		this.cy.panningEnabled(false);

		this.cy.$('[type = "usecase"]').ungrabify();
		

		

		this.cy.layout( options );

		if (!IS_EXTERNAL_RELEASE) {
			this.cy.on('free','node[type = "actor"]',() => {
				const {packageStore, data} = this.props;
				
				const positionData = []
				this.cy.$('[type = "actor"]').forEach(actor => {
					const position = actor.position();
					const actorData = {
						persistent_id: actor.data('persistent_id'),
						x: position.x,
						y: position.y
					}
					positionData.push(actorData);
				})
				packageStore.editPackage(data.persistent_id, 'text3', JSON.stringify(positionData));
			})
		}

		

		actors.forEach((actor, index, array) => {
			this.cy.add({
				data: actor.data,
				position: {x: this.cy.width()/8, y: ((index + 1) * (this.cy.height()))/(array.length+1)}
				// position: {x: 10, y: ((index + 1) * 10)}
			})
		})

		if (IS_EXTERNAL_RELEASE) {
			this.cy.$('[type = "actor"]').ungrabify();
		}

		this.cy.add(edges);

		window.cy = this.cy;

		try {
			const actorPositions = JSON.parse(ss(data.text3));

			actorPositions.forEach(actor => {
				if (actor.x < this.cy.width() && actor.y < this.cy.height()) {
					this.cy.elements(`node[persistent_id = "${actor.persistent_id}"]`).position({x: actor.x, y: actor.y})
				}
			})

		} catch (e) {
			return;
		}


	}


	render() {
		const {data} = this.props;
		if (this.state.image === '') {
			return (
				<div ref={ref => this.divRef = ref} style={{width:'100%', height: 80*(data.children.length+1) + 'px', minHeight: '320px', border: 'solid 1px #DAE4E4', backgroundColor: 'white'}}>

				</div>
			);
		}
		else {
			return <img src={this.state.image} style={{width:'100%', height:'500px', border: 'solid 1px #DAE4E4'}}/>
		}
	}
}

export default UseCaseDiagram;
