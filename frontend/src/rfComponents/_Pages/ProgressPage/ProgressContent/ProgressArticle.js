import React, { Component, PropTypes } from 'react';
import {observer, inject} from 'mobx-react';

import glamorous, {Div} from "glamorous";
import { Heading4, Paragraph } from "../../../_Atoms/Headings";
import { _Palette } from "../../../_Utils/Colours.js"
import { SectionBlock } from "../../../_Molecules/Section";
import PageHeader from "../../../Navigation/PageHeader";

import ProgressPageContent from "../ProgressContent/ProgressPageContent";
import ProgressIcon from "../ProgressIcon/ProgressIcon";

const ArticleContainer = glamorous.div({
	marginLeft: "auto",
	marginRight: "auto",
	maxWidth: "560px",
	marginTop: 16,
	marginBottom: 16,
})

const HeaderContainer = glamorous.div({
	borderBottom: `1px solid ${_Palette.TextWeak}`,
	padding: 4,
})

@inject("uiStore")
@observer
class ProgressArticle extends Component {
	static propTypes = {
		uiStore: PropTypes.object.isRequired,
		step: PropTypes.string.isRequired,
	}

	render() {
		const {
			// data, 
			uiStore,
			step} = this.props;


		const data = ProgressPageContent[uiStore.progressStep];

		const goalSteps = data.steps.map((stepText, index) => {
			return (
				<li key={index}>{stepText}</li>
				)
		});


		return (
			<Div maxWidth="720px" marginLeft="auto" marginRight="auto">
				<HeaderContainer>
					<PageHeader pageName={step} />
				</HeaderContainer>

				<ArticleContainer>
					<SectionBlock>
						<Div display="flex" justifyContent="space-between" alignItems="center">
						<Div>
							<Heading4>Goal:</Heading4>
								<Paragraph>{data.goal}</Paragraph>
						</Div>
							<ProgressIcon iconName=" " />
						</Div>
					</SectionBlock>

					<SectionBlock>
						<Heading4>Bonus:</Heading4>
						<Paragraph>{data.bonus}</Paragraph>
					</SectionBlock>

					<SectionBlock>
						<Div display="flex" justifyContent="center">
							<Heading4>How to complete the goal</Heading4>
						</Div>
						<Div marginLeft="auto" marginRight="auto" width="400px" height="280px" backgroundColor="white" opacity="0.8" borderRadius="4px" border="1px grey solid"></Div>
					</SectionBlock>
					<SectionBlock>
						<Heading4>Steps:</Heading4>
						<Div>
							<ol>{goalSteps}</ol>
						</Div>
					</SectionBlock>
					<SectionBlock>
						<Heading4>Best Examples and Use Cases:</Heading4>
						<Paragraph>{data.bestExamples}</Paragraph>
					</SectionBlock>
				</ArticleContainer>

			</Div>
		);
	}
}

export default ProgressArticle;