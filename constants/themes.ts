import { warmUpAsync } from "expo-web-browser";
import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export const COLORS = {
    primary: "#27AE60",
    secondary: "#D1F3CC",
    white: "#FFFFFF",
    secondaryWhite: "#F5F8F2",
    tertiaryWhite: "#FAFDFA",
    black: "#000000",
    gray: "#2C3E50",
    gray2: "#95A5A6",
    secondaryGray: "#DBE0E1",
    danger: "#c83a48",
    error: "#c83a48",
    warning: "#F39C12",
    info: "#3498DB",
};

export const SIZES = {
    //Global SIZES
    base: 8,
    font: 14,
    radius: 30,
    padding: 8,
    padding2: 12,
    padding3: 16,

    //FONTS SIZES
    largeTitle: 50,
    h1: 36,
    h2: 22,
    h3: 16,
    h4: 14,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,

    //App Dimensions
    width,
    height,
};

export const FONTS = {
    largeTitle: {fontFamily: 'black', fontSize: SIZES.largeTitle, lineHeigth: 50},
    h1: {fontFamily: 'black', fontSize: SIZES.h1, lineHeigth: 36},
    h2: {fontFamily: 'black', fontSize: SIZES.h2, lineHeigth: 30},
    h3: {fontFamily: 'black', fontSize: SIZES.h3, lineHeigth: 22},
    h4: {fontFamily: 'black', fontSize: SIZES.h4, lineHeigth: 20},
    body1: {fontFamily: 'black', fontSize: SIZES.body1, lineHeigth: 36},
    body2: {fontFamily: 'black', fontSize: SIZES.body2, lineHeigth: 30},
    body3: {fontFamily: 'black', fontSize: SIZES.body3, lineHeigth: 22},
    body4: {fontFamily: 'black', fontSize: SIZES.body4, lineHeigth: 20},
};

const appTheme = { COLORS, SIZES, FONTS};

export default appTheme;