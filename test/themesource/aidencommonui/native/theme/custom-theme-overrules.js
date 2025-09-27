import { font } from "../../../../theme/native/custom-variables";
import { Text, TextInput } from "react-native";

// Theme overrule of core classes


// Allow some scaling fonts for accessibility, but not indefinetely. 
// Use allowFontScaling = false to block scaling completely.
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.maxFontSizeMultiplier = 1.3;
// Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.maxFontSizeMultiplier = 1.3;
// TextInput.defaultProps.allowFontScaling = false;

