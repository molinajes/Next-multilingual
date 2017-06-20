import React, { Component } from 'react';
import {observer} from 'mobx-react';
import glamorous from 'glamorous';


//  // Spacing
const _Base = 16;

const _Size = {
	tiny: 0.25*_Base,
	small: 0.5*_Base,
	medium: 1*_Base,
	large1: 1.5*_Base,
	large2: 2*_Base,
	large3: 4*_Base,
	section: 8*_Base,
}

//  // Colors

const _PaletteMango = '#FD5412';
const _PaletteOrange = '#FF790C';
const _PaletteYellow = '#FFBA0C';

const _PaletteMangoBg = 'rgba(253, 84, 18, 0.32)';
const _PaletteOrangeBg = 'rgba(255, 121, 12, 0.16)';
const _PaletteYellowBg = 'rgba(255, 186, 12, 0.16)';

const _PaletteTextActive = 'rgba(35, 35, 35, 0.80)';
const _PaletteTextStrong = 'rgba(35, 35, 35, 0.88)';
const _PaletteTextWhite = 'rgba(255, 255, 255, 0.96)';


// // Typography 

const Heading3 = glamorous.div(
	{
		// color: _PaletteTextActive,
		fontSize: '0.875rem',
	}
)

// Navigation

const NavHeading = glamorous(Heading3)(
	{
		paddingLeft: _Size.tiny,	
	}
)

const NavigationButton = glamorous.div(
	{
		alignItems: 'center',		
		borderRadius: _Size.tiny,
		display: 'flex',
		flexGrow: 1,
	},
	(props) => ({
		fontWeight: props.isSection ? 600 : null, 
		lineHeight: props.isSection ? `${_Size.medium}px` : `${_Size.large1}px`, 
		':hover': {
			color: _PaletteTextStrong,
			backgroundColor: props.isSection ? null : _PaletteMangoBg
		},
		':active': {
			color: _PaletteTextWhite,
			backgroundColor: props.isSection ? 'blue': _PaletteMango
		},
	})
)

const dynamicWeight = props => ({fontWeight: props.isSection ? 600 : 300,}) 
const dynamicBgColor = props => ({backgroundColor: props.isSection ? 'black' : 'aqua',}) 

const HeadingSection = glamorous(NavHeading)(dynamicWeight)

const NavigationButton1 = glamorous.div({borderRadius: _Size.tiny}, dynamicBgColor)



export {
	NavHeading,
	HeadingSection,
	NavigationButton
};
