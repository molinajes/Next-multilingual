import React, { Component } from "react";
import { observer } from "mobx-react";

import IndexPage from "./_Pages/IndexPage/IndexPage";

@observer
class ComponentStyleGuide extends Component {
	/*static propTypes = {
		: PropTypes.object.isRequired
	}*/

	render() {
		return <IndexPage />
	}
}

export default ComponentStyleGuide;
