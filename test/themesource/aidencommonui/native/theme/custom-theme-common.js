import { border, brand, background, navigation, spacing } from "../../../../theme/native/custom-variables";
import { Platform } from "react-native";

// Custom classes, algemeen
// Als een groep classes te groot wordt, splits dit dan af naar een apart bestand om het overzicht te houden.

export const loginContainerTablet = {
    container: {
        width: 250
    },
};

export const singleLineTextEllipsis = {
    text: {
        numberOfLines: 1
    }
};

export const flexGrowContainer = {
    container: {
        flexGrow: 1
    },
};

export const customHeaderContainer = {
    container: {
        backgroundColor: navigation.statusBar.backgroundColor,
        paddingTop: spacing.smaller,
        paddingBottom: spacing.smaller,
        ...Platform.select({
            android: {
                height: 50
            },
            ios: {
                height: 44
            }
        })
    },
};

export const containerBorderPrimaryInnerMedium = {
    container: {
        borderRadius: border.radiusLarge,
        padding: spacing.regular,
        borderWidth: 1,
        borderColor: background.primary
    },
};

export const containerBorderPrimaryInnerSmall = {
    container: {
        borderRadius: border.radiusLarge,
        padding: spacing.small,
        borderWidth: 1,
        borderColor: background.primary
    },
};

