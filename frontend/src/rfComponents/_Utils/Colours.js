const _Strong = 0.88;
const _Active = 0.80;
const _Inactive = 0.64;
const _Weak = 0.32;
const _Faint = 0.16;
const _Tint = 0.04;

const _PaletteText = '35,35,35';

const _PaletteBackground = `rgba(244,244,244, ${_Strong})`;
const _PaletteBackgroundWindow = `rgba(244,244,244, ${_Weak})`;

// const _PaletteBackground = '#F3F2F2'
const _PaletteBorder = '#A0A0A0';
const _PaletteContainer = '#F3F2F2';
const _PaletteLight = '#FCFCFC';
const _PaletteLightBg = `rgba(252,252,252, ${_Weak})`;
const _PaletteShadow = `rgba(${_PaletteText}, ${_Weak})`;
const _PaletteShadowSoft = `rgba(${_PaletteText}, ${_Faint})`;

const _PaletteWhite = '#FFFFFF';
const _PaletteWhiteHover = `rgba(255,255,255, ${_Strong})`;

const _PaletteMango = '#FD5412';
const _PaletteOrange = '#FF790C';
const _PaletteYellow = '#FFBA0C';

const _PalettePrimary = '#424242';
const _PalettePrimaryActive = `rgba(66,66,66, ${_Active})`;
const _PalettePrimaryInactive = `rgba(66,66,66, ${_Inactive})`;
const _PalettePrimaryBg = `rgba(66,66,66, ${_Faint})`;

const _PaletteMangoStrong = `rgba(253, 84, 18, ${_Strong})`;
const _PaletteOrangeStrong = `rgba(255, 121, 12, ${_Strong})`;
const _PaletteYellowStrong = `rgba(255, 186, 12, ${_Strong})`;

const _PaletteMangoActive = `rgba(253, 84, 18, ${_Active})`;
const _PaletteOrangeActive = `rgba(255, 121, 12, ${_Active})`;
const _PaletteYellowActive = `rgba(255, 186, 12, ${_Active})`;

const _PaletteMangoInactive = `rgba(253, 84, 18, ${_Inactive})`;
const _PaletteOrangeInactive = `rgba(255, 121, 12, ${_Inactive})`;
const _PaletteYellowInactive = `rgba(255, 186, 12, ${_Inactive})`;

const _PaletteMangoBg = `rgba(253, 84, 18, ${_Faint})`;
const _PaletteOrangeBg = `rgba(255, 121, 12, ${_Faint})`;
const _PaletteYellowBg = `rgba(255, 186, 12, ${_Faint})`;

const _PaletteMangoTint = `rgba(253, 84, 18, ${_Tint})`;
const _PaletteOrangeTint = `rgba(255, 121, 12, ${_Tint})`;
const _PaletteYellowTint = `rgba(255, 186, 12, ${_Tint})`;

const _PaletteTextStrong = `rgba(${_PaletteText}, ${_Strong})`;
const _PaletteTextActive = `rgba(${_PaletteText}, ${_Active})`;
const _PaletteTextInactive = `rgba(${_PaletteText}, ${_Inactive})`;
const _PaletteTextWeak = `rgba(${_PaletteText}, ${_Weak})`;
const _PaletteTextFaint = `rgba(${_PaletteText}, ${_Faint})`;

const _Palette = {
	Strong: _Strong,
	Active: _Active,
	Inactive: _Inactive,
	Weak: _Weak,
	Faint: _Faint,
	Tint: _Tint,

	Background: _PaletteBackground,
	BackgroundWindow: _PaletteBackgroundWindow,
	Border: _PaletteBorder,
	Container: _PaletteContainer,
	Light: _PaletteLight,
	LightBg: _PaletteLightBg,
	Shadow: _PaletteShadow,
	ShadowSoft: _PaletteShadowSoft,
	
	White: _PaletteWhite,
	WhiteHover: _PaletteWhiteHover,

	Primary: _PalettePrimary,
	PrimaryActive: _PalettePrimaryActive,
	PrimaryInactive: _PalettePrimaryInactive,
	PrimaryBg: _PalettePrimaryBg,

	Mango: _PaletteMango,
	Orange: _PaletteOrange,
	Yellow: _PaletteYellow,
	MangoStrong: _PaletteMangoStrong,
	OrangeStrong: _PaletteOrangeStrong,
	YellowStrong: _PaletteYellowStrong,
	MangoActive: _PaletteMangoActive,
	OrangeActive: _PaletteOrangeActive,
	YellowActive: _PaletteYellowActive,
	MangoInactive: _PaletteMangoInactive,
	OrangeInactive: _PaletteOrangeInactive,
	YellowInactive: _PaletteYellowInactive,
	MangoBg: _PaletteMangoBg,
	OrangeBg: _PaletteOrangeBg,
	YellowBg: _PaletteYellowBg,
	MangoTint: _PaletteMangoTint,
	OrangeTint: _PaletteOrangeTint,
	YellowTint: _PaletteYellowTint,

	TextStrong: _PaletteTextStrong,
	TextActive: _PaletteTextActive,
	TextInactive: _PaletteTextInactive,
	TextWeak: _PaletteTextWeak,
	TextFaint: _PaletteTextFaint,
}

export {
	_Palette
}