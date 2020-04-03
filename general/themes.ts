interface Theme {
	backgroundColor: string;
	textColor: string;
	secondaryTextColor: string;
	inputColor: string;
	inputFocusColor: string;
	inputPlaceholderColor: string;
	inputPlaceholderFocusColor: string;
	primaryColor: string;
	secondaryColor: string;
	fontFamilyTitle: string;
	fontFamilyText: string;
	backgroundCards: string;
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

		inputColor: "#e0f8f1",
		inputFocusColor: "#a3ebd5",
		inputPlaceholderColor: "#95a49f",
		inputPlaceholderFocusColor: "#86BAA9",

		primaryColor: "#4258ED",
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

		primaryColor: "#78F6D0",
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

		primaryColor: "#78F6D0",
		secondaryColor: "#E1E7F8",
		fontFamilyTitle: `"Rubik", sans-serif`,
		fontFamilyText: `"Karla", sans-serif`,
		backgroundCards: "#FFFFFF"
	}
};

export default themes;
