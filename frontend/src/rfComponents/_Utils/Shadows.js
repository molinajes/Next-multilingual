import { _Palette } from "./Colours";

// Elevation hierachy in the Shadow Realm
const _ShadowSize0 = `0 0 1px ${_Palette.Shadow}`;
const _ShadowSize1 = `0 1px 1px ${_Palette.Shadow}`;
const _ShadowSize2 = `0 1px 1px ${_Palette.Shadow}, 0 2px 6px ${_Palette.Shadow}`;
const _ShadowSize3 = `0 2px 4px ${_Palette.Shadow}, 0 8px 16px ${_Palette.Shadow}`;
const _ShadowSize4 = `0 4px 8px ${_Palette.Shadow}, 0 18px 46px 6px ${_Palette.Shadow}`;

const _Shadow = {
	Size0: _ShadowSize0,
	Size1: _ShadowSize1,
	Size2: _ShadowSize2,
	Size3: _ShadowSize3,
	Size4: _ShadowSize4
};

const _ShadowLight = `rgba(35,35,35, 0.04)`; // this is here because I'm trialling it

// const _ShadowSoftSize0 = `0 0 0 1px ${_Palette._ShadowLight}`;
const _ShadowSoftSize0 = `0 0 2px -1px ${_Palette.ShadowSoft}`; // Borders // Do we need to remove the Y value
const _ShadowSoftSize1 = `0 0 1px 1px ${_ShadowLight}, 0 2px 4px -2px ${_Palette.ShadowSoft}`; // Base for small interaction
const _ShadowSoftSize2 = `0 0 1px 1px ${_ShadowLight}, 0 4px 12px -2px ${_Palette.ShadowSoft}`; // Base for medium interaction and hover for small
const _ShadowSoftSize3 = `0 2px 2px ${_Palette.ShadowSoft}, 0 8px 16px -2px ${_Palette.ShadowSoft}`; // Base for large interaction and hover for medium
const _ShadowSoftSize4 = `0 4px 8px ${_Palette.ShadowSoft}, 0 18px 46px 6px ${_Palette.ShadowSoft}`; // Not completed // Base for floating element hover for large interaction

const _ShadowSoft = {
	Size0: _ShadowSoftSize0,
	Size1: _ShadowSoftSize1,
	Size2: _ShadowSoftSize2,
	Size3: _ShadowSoftSize3,
	Size4: _ShadowSoftSize4
};

export { _Shadow, _ShadowSoft };