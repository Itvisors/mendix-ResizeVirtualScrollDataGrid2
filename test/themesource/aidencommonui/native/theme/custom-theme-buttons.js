import { brand, button, contrast, font, spacing } from "../../../../theme/native/custom-variables";
import adjustFont from "../../../atlas_core/native/core/helpers/_functions/adjustfont";


// Custom classes for buttons

// Transparent, no border. Border color is set to transparent so button has the same size as other buttons.
export const btnTransparentNoBorder = {
    container: {
        borderColor: "transparent",
        backgroundColor: "transparent",
    },
};

// Less vertical padding to make button fit in the header, while keeping horizontal padding for easily tapping it.
export const btnInHeader = {
    container: {
        paddingVertical: spacing.small,
        minHeight: 0,
    },
    caption: {
        lineHeight: 0
    }
};

export const btnIconColorSuccess = {
    icon: {
        color: brand.success
    }
};

export const btnIconColorWarning = {
    icon: {
        color: brand.warning
    }
};

export const btnIconColorDanger = {
    icon: {
        color: brand.danger
    }
};

export const btnIconColorSecondary = {
    icon: {
        color: button.secondary.color
    }
};

export const btnIconColorWhite = {
    icon: {
        color: "#FFF"
    }
};

export const btnIconColorDisabled = {
    icon: {
        color: contrast.low
    }
};

export const btnCaptionColorSuccess = {
    caption: {
        color: brand.success
    }
};

export const btnCaptionColorWarning = {
    caption: {
        color: brand.warning
    }
};

export const btnCaptionColorDanger = {
    caption: {
        color: brand.danger
    }
};

export const btnCaptionColorWhite = {
    caption: {
        color: "#FFF"
    }
};

export const btnCaptionColorDisabled = {
    caption: {
        color: contrast.low
    }
};

export const btnCaptionColorSecondary = {
    caption: {
        color: button.secondary.color
    }
};

// Grabbed the default button definitons from core and adjusted them to look dimmed.
export const btnPrimaryDisabled = {
    container: {
        borderColor: brand.primaryLight,
        backgroundColor: brand.primaryLight,
    },
    icon: {
        color: contrast.low,
    },
    caption: {
        color: contrast.low,
    },
};
export const btnSecondaryDisabled = {
    container: {
        borderColor: button.secondary.borderColor,
        backgroundColor: button.secondary.backgroundColor,
    },
    icon: {
        color: contrast.low,
    },
    caption: {
        color: contrast.low,
    },
};
export const btnSuccessDisabled = {
    container: {
        borderColor: brand.successLight,
        backgroundColor: brand.successLight,
    },
    icon: {
        color: contrast.low,
    },
    caption: {
        color: contrast.low,
    },
};
export const btnWarningDisabled = {
    container: {
        borderColor: brand.warningLight,
        backgroundColor: brand.warningLight,
    },
    icon: {
        color: contrast.low,
    },
    caption: {
        color: contrast.low,
    },
};
export const btnDangerDisabled = {
    container: {
        borderColor: brand.dangerLight,
        backgroundColor: brand.dangerLight,
    },
    icon: {
        color: contrast.low,
    },
    caption: {
        color: contrast.low,
    },
};

export const btnTextAlignStart = {
    container: {
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
};

export const btnTextAlignEnd = {
    container: {
        alignItems: "flex-end",
        justifyContent: "flex-end",
    },
};

const btnDashboardCommon = {
    container: {
        borderWidth: 0,
        borderRadius: 0,
        rippleColor: contrast.lowest,
        backgroundColor: "transparent",
        padding: 0,
        height: 70
    }
};

export const btnDashboardIcon = { ...btnDashboardCommon,
    icon: {
        color: brand.primary,
        fontWeight: font.weightBold,
        size: adjustFont(35)
    }
};

export const btnDashboardBadgePrimary = { ...btnDashboardCommon,
    caption: {
        fontWeight: font.weightBold,
        fontSize: adjustFont(30),
        lineHeight: adjustFont(30),
        color: brand.primary
    }
};

export const btnDashboardBadgeSuccess = { ...btnDashboardCommon,
    caption: {
        fontWeight: font.weightBold,
        fontSize: adjustFont(30),
        lineHeight: adjustFont(30),
        color: brand.success
    }
};

export const btnDashboardBadgeWarning = { ...btnDashboardCommon,
    caption: {
        fontWeight: font.weightBold,
        fontSize: adjustFont(30),
        lineHeight: adjustFont(30),
        color: brand.warning
    }
};

export const btnDashboardBadgedanger = { ...btnDashboardCommon,
    caption: {
        fontWeight: font.weightBold,
        fontSize: adjustFont(30),
        lineHeight: adjustFont(30),
        color: brand.danger
    }
};
