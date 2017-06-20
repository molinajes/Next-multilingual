import React, { Component, PropTypes } from "react";
import glamorous, { Div } from "glamorous";

import Icon from "../../../_Molecules/Icons";
import { CardThumbnail } from "../../../_Molecules/Cards";

class UseCaseTile extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		onClickUseCase: PropTypes.func.isRequired,
		isActive: PropTypes.func
	};
	handleClickUseCaseTile = () => {
		const { data, onClickUseCase } = this.props;
		console.log("handle click use case tile");
		onClickUseCase(data.persistent_id);
	};

	render() {
		const { data, isActive } = this.props;

		const Tile = glamorous(CardThumbnail)(
			{
				// margin: "0px"
			},
			props => ({
				border: props.isActive ? "solid 1px orange" : ""
			})
		);

		return (
			<Div onClick={this.handleClickUseCaseTile}>
				<Tile marginType="list" size="small" isActive={isActive}>
					{/*data.text*/}
					<Icon
						// isHover={this.state.hovered}
						// isActive={this.state.active}
						// iconOpacity={iconOpacity}
						Size="Large3"
						iconName={"np_interface_grid"}
					/>
				</Tile>
				{data.name}
			</Div>
		);
	}
}

export default UseCaseTile;