interface Theme {
	backgroundColor: string;
	textColor: string;
	secondaryTextColor: string;
	inputColor: string;
	inputFocusColor: string;
	inputPlaceholderColor: string;
	inputPlaceholderFocusColor: string;
	inputBorderBottomColor: string;
	inputBorderBottomFocusColor: string;
	primaryColor: string;
	secondaryColor: string;
	fontFamilyTitle: string;
	fontFamilyText: string;
	backgroundCards: string;
	primaryColorText: string;
}

interface CollectaSurveysThemes {
	light: Theme;
	dark: Theme;
	gray: Theme;
}

const themes: CollectaSurveysThemes = {
	light: {
		backgroundColor: "#FEFEFE",
		textColor: "#353739",
		secondaryTextColor: "#B7B7B7",

		inputColor: "#ffffff",
		inputFocusColor: "#ffffff",
		inputPlaceholderColor: "#C7CCD699",
		inputPlaceholderFocusColor: "#C7CCD699",
		inputBorderBottomColor: "#CED3DD70",
		inputBorderBottomFocusColor: "#ffffff",

		primaryColor: "#4258ED",
		primaryColorText: "#FFFFFF",
		secondaryColor: "#2d3243",
		fontFamilyTitle: `"Rubik", sans-serif`,
		fontFamilyText: `"Karla", sans-serif`,
		backgroundCards: "#FFFFFF"
	},
	dark: {
		backgroundColor: "#121212",
		textColor: "#FFFFFF",
		secondaryTextColor: "#B7B7B7",

		inputColor: "#4f4f4f",
		inputFocusColor: "#6B8582",
		inputPlaceholderColor: "#858585",
		inputPlaceholderFocusColor: "#4A6360",
		inputBorderBottomColor: "#CED3DD",
		inputBorderBottomFocusColor: "#CED3DD",

		primaryColor: "#78F6D0",
		primaryColorText: "#FFFFFF",
		secondaryColor: "#E1E7F8",
		fontFamilyTitle: `"Rubik", sans-serif`,
		fontFamilyText: `"Karla", sans-serif`,
		backgroundCards: "#FFFFFF"
	},
	gray: {
		backgroundColor: "#121212",
		textColor: "#FFFFFF",
		secondaryTextColor: "#B7B7B7",

		inputColor: "#4f4f4f",
		inputFocusColor: "#6B8582",
		inputPlaceholderColor: "#858585",
		inputPlaceholderFocusColor: "#4A6360",
		inputBorderBottomColor: "#CED3DD",
		inputBorderBottomFocusColor: "#CED3DD",

		primaryColor: "#78F6D0",
		primaryColorText: "#FFFFFF",
		secondaryColor: "#E1E7F8",
		fontFamilyTitle: `"Rubik", sans-serif`,
		fontFamilyText: `"Karla", sans-serif`,
		backgroundCards: "#FFFFFF"
	}
};

export default themes;
