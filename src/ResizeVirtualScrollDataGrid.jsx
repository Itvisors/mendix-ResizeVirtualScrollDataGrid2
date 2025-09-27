import { createElement } from "react";

import { HelloWorldSample } from "./components/HelloWorldSample";
import "./ui/ResizeVirtualScrollDataGrid.css";

export function ResizeVirtualScrollDataGrid({ sampleText }) {
    return <HelloWorldSample sampleText={sampleText} />;
}
