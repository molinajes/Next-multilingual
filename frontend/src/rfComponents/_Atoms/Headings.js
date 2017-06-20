// import React, { Component } from 'react';
// import {observer} from 'mobx-react';
import glamorous from "glamorous";
import { _Transition } from "../_Utils/Activity";
import { _Palette } from "../_Utils/Colours";
import { _TextSize, _TextScale } from "../_Utils/Sizing";

// TODO: Should we have a default color? it's easy to override and covers 90% of cases | AjH
// TODO: We need to implement margins or fix the margins on h1,h2 etc.. | AjH
// TODO: I would prefer to create a heading margin component | AjH

// // Typography
const Heading1 = glamorous.h1({
	color: _Palette.TextStrong,
	fontSize: _TextScale.LARGE3,
	fontWeight: 600,
	lineHeight: 1.2,
	marginTop: 0,
	marginBottom: 0
});

const Heading2 = glamorous.div({
	color: _Palette.TextStrong,
	fontSize: _TextScale.LARGE2,
	fontWeight: 600,
	lineHeight: 1.2, // I think this should stay as a anumber and not a variable
});

const SubHeading2 = glamorous.div({
	fontSize: _TextScale.MEDIUM,
	fontWeight: 400,
	lineHeight: `${1.2*_TextScale.LARGE2}px`, // Give the same line-height as the heading
});

const Heading3 = glamorous.div({
	color: _Palette.TextStrong,
	fontSize: _TextScale.LARGE1,
	fontWeight: 600,
	lineHeight: 1.2,
});

const SubHeading3 = glamorous.div({
	fontSize: _TextScale.SMALL,
	fontWeight: 400,
	// lineHeight: 1.2,
	lineHeight: `${1.2*_TextScale.LARGE1}px`, // Give the same line-height as the heading
});

const Heading4 = glamorous.h4({
	color: _Palette.TextStrong,
	fontSize: _TextSize.MEDIUM,
	fontWeight: 600,
	lineHeight: 1.2,
});

const SectionHeading = glamorous.h1({
	color: _Palette.TextWeak,
	// fontSize: "2.75rem",
	fontSize: _TextScale.LARGE3,
	fontWeight: 300,
	lineHeight: '36px',
	marginBottom: 0,
	marginTop: 0
});

const Paragraph = glamorous.p({
	fontSize: _TextScale.MEDIUM,
	lineHeight: 1.6
});

const BodyText = glamorous.div({
	fontSize: _TextScale.SMALL,
	// letterSpacing: -0.3,
	lineHeight: 1.2,
	// fontWeight: 300,
});

const Label = glamorous.p({
	// color: _Palette.TextStrong,
	fontSize: _TextScale.TINY,
	fontWeight: 600,
});

const ActiveLink = glamorous.a(
	{
		transition: _Transition.Highlight,
		cursor: "pointer",
	},
);



export {
	ActiveLink,
	BodyText,
	Heading1,
	Heading2,
	Heading3,
	Heading4,
	Label,
	Paragraph,
	SectionHeading,
	SubHeading2,
	SubHeading3,
	_TextSize
};