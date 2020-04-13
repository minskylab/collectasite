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
	darkSecondaryTextColor: string;
	secondaryColor: string;
	fontFamilyTitle: string;
	fontFamilyText: string;
	backgroundCards: string;
	primaryColorText: string;
	satisfactionBorderColor: string;
	satisfactionColors: string[];
	satisfactionTextColors: string[];
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
		darkSecondaryTextColor: "#5B5B5B",
		secondaryColor: "#EFF1F5",
		secondaryTextColor: "#B1B1B1",

		inputColor: "#ffffff",
		inputFocusColor: "#ffffff",
		inputPlaceholderColor: "#C7CCD699",
		inputPlaceholderFocusColor: "#C7CCD699",
		inputBorderBottomColor: "#CED3DD70",
		inputBorderBottomFocusColor: "#ffffff",

		//button
		primaryColor: "#4258ED",
		primaryColorText: "#ffffff",

		fontFamilyTitle: `"Rubik", sans-serif`,
		fontFamilyText: `"Karla", sans-serif`,
		backgroundCards: "#FFFFFF",

		satisfactionBorderColor: "#EFF1F5",
		satisfactionColors: [ "#FF7B86", "#FF9C88", "#FFD6A4", "#BAF6A5", "#8DEDB0" ],
		satisfactionTextColors: [ "#DD2E3C", "#F07A62", "#ECAF65", "#7AE256", "#1FB856" ]
	},
	dark: {
		backgroundColor: "#121212",
		textColor: "#FFFFFF",
		darkSecondaryTextColor: "#5B5B5B",
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
		backgroundCards: "#FFFFFF",

		satisfactionBorderColor: "#EFF1F5",
		satisfactionColors: [ "#FF7B86", "#FF9C88", "#FFD6A4", "#BAF6A5", "#8DEDB0" ],
		satisfactionTextColors: [ "#DD2E3C", "#F07A62", "#ECAF65", "#7AE256", "#1FB856" ]
	},
	gray: {
		backgroundColor: "#121212",
		textColor: "#FFFFFF",
		darkSecondaryTextColor: "#5B5B5B",
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
		backgroundCards: "#FFFFFF",

		satisfactionBorderColor: "#EFF1F5",
		satisfactionColors: [ "#FF7B86", "#FF9C88", "#FFD6A4", "#BAF6A5", "#8DEDB0" ],
		satisfactionTextColors: [ "#DD2E3C", "#F07A62", "#ECAF65", "#7AE256", "#1FB856" ]
	}
};

export default themes;
