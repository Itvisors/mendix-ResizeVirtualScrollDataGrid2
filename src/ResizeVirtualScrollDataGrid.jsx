import { createElement, useRef } from "react";
import { useElementHeight } from "./hooks/useElementHeight";

export function ResizeVirtualScrollDataGrid(props) {
    const slotRef = useRef(null);
    const elementHeight = useElementHeight(slotRef);

    // useEffect(() => {
    //     console.info("GetContainerSizeWidget elementHeight: " + elementHeight);
    // }, [elementHeight]);

    const className = props.name + " resizeVirtualScrollDataGrid";
    const dataGridStyle = "div." + props.name + " { div.widget-datagrid-grid { max-height: " + elementHeight + "px }}";
    return (
        <div ref={slotRef} style={{ height: "100%" }} className={className}>
            <style>{dataGridStyle}</style>
            {elementHeight > 0 ? props.content : null}
        </div>
    );
}
