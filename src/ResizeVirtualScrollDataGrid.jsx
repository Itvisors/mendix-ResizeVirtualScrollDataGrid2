import { createElement, useRef } from "react";
import { useElementHeight } from "./hooks/useElementHeight";

export function ResizeVirtualScrollDataGrid(props) {
    const slotRef = useRef(null);
    const elementHeight = useElementHeight(slotRef);

    // Set the height on a custom style that targets the data grid 2 or gallery in the widget contents
    // The first render the element height will be zero
    // Only render the content (the grid) when the height is no longer zero as DG2 and Gallery only accept the container height on first render
    const className = props.name + " resizeVirtualScrollDataGrid";
    const gridHeight = elementHeight - props.headerHeight;
    let dataGridStyle = null;
    switch (props.widgetType) {
        case "datagrid2":
            dataGridStyle =
                "div." + props.name + " { div.widget-datagrid-grid-body { max-height: " + gridHeight + "px }}";
            break;

        case "gallery":
            dataGridStyle = "div." + props.name + " { div.widget-gallery-content { max-height: " + gridHeight + "px }}";
            break;

        default:
            break;
    }

    return (
        <div ref={slotRef} style={{ height: "100%" }} className={className}>
            <style>{dataGridStyle}</style>
            {elementHeight > 0 ? props.content : null}
        </div>
    );
}
