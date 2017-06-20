import React, { Component, PropTypes } from "react";
import { observer } from "mobx-react";

import glamorous, { Div, Img } from "glamorous";
import { CardTile } from "../../../_Molecules/Cards";
import { _Palette } from "../../../_Utils/Colours";

const SlideWindow = glamorous(CardTile)({
	// backgroundImage: `linear-gradient(-90deg, rgba($yellow-200, 0.18) 0%, rgba($yellow-200, 0.18) 24%, rgba($orange-200, 0.18) 38%, rgba($orange-200, 0.18) 62%, rgba($mango-200, 0.18) 76%)`,
	border: '2px solid',
	borderImage: `linear-gradient(150deg, ${_Palette.Mango} 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0) 60%, ${_Palette.Orange} 100%)`,
	borderImageSlice: '1',
	borderRadius: "4px 2px / 3px 1px",
	width: "480px",
})

@observer class SlideOutput extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		linkedComponents: PropTypes.object.isRequired
	};

	render() {
		const { data, linkedComponents } = this.props;

		const ifaces = linkedComponents.iface;

		let file = "";
		if (ifaces.length) {
			file = ifaces[0].children[0].file;
		}

		return (
			<Div
				// display="flex"
				// flexDirection="column"
				// padding="2rem"
				// border="solid 1px black"
			>
			<SlideWindow>
				<Div padding="0.5rem">
					Action: {data.text}
				</Div>
					<Div
					backgroundColor={_Palette.Background}
					// flex="1 1 0"
					minHeight="300px"
					height="auto"
				>
					{file !== "" && <Img maxHeight="200px" src={`/${file}`} />}
				</Div>
				<Div padding="0.5rem">
					Response: {data.text2}
				</Div>
			</SlideWindow>
			</Div>
		);
	}
}
export default SlideOutput;
