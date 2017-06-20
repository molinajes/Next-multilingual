// Spacing
const _Base = 16;

const _Size = {
	TINY: 0.25 * _Base,
	SMALL: 0.5 * _Base,
	MEDIUM: 1 * _Base,
	LARGE1: 1.5 * _Base,
	LARGE2: 2 * _Base,
	LARGE3: 4 * _Base,
	SECTION: 8 * _Base,
	BASE: _Base
};

const _TextBase = 16

// I'm having second thoughts about including these variables...
const _TextSize = {
	TINY: -6 + _TextBase,
	SMALL: -4 + _TextBase,
	MEDIUM: -2 + _TextBase,
	LARGE1: 0 + _TextBase,
	LARGE2: 4 + _TextBase,
	LARGE3: 8 + _TextBase,
	SECTION: 16 + _TextBase,
	BASE: _TextBase
};

// Here is the text size scales http://www.modularscale.com/?16&px&1.25 
const _TextScale = {
	TINY: 11,
	SMALL: 14,
	MEDIUM: 16,
	LARGE1: 20,
	LARGE2: 25,
	LARGE3: 32,
	SECTION: 40,
	// BASE: _TextBase
};

export { _TextScale, _TextSize, _Size };