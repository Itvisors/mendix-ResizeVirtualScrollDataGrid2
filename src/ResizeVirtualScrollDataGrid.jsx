import { useElementHeight } from "./hooks/useElementHeight";
import { useRef } from "react";

// Get the header margin correction once, at module level
const headerMarginCorrection = (() => {
    const value = getComputedStyle(document.documentElement)
        .getPropertyValue("--resize-virtualscroll-datagrid-header-margin-correction")
        .trim();
    return value ? Number(value) : 0;
})();

export function ResizeVirtualScrollDataGrid(props) {
    const slotRef = useRef(null);
    const elementHeight = useElementHeight(slotRef);
    const { widgetType } = props;

    // Set the height on a custom style that targets the data grid 2 or gallery in the widget contents
    const className = props.name + " resizeVirtualScrollDataGrid";
    const correction = widgetType === "datagrid2" ? headerMarginCorrection : 0;
    const gridHeight = elementHeight - props.headerHeight - props.footerHeight + correction;

    let dataGridStyle = null;
    switch (widgetType) {
        case "datagrid2":
            dataGridStyle = "div." + props.name + " { div.widget-datagrid-grid { max-height: " + gridHeight + "px }}";
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
