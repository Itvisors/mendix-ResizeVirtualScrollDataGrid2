import { createElement, useEffect, useRef } from "react";
import { useElementHeight } from "./hooks/useElementHeight";

export function ResizeVirtualScrollDataGrid(props) {
    const slotRef = useRef(null);
    const elementHeight = useElementHeight(slotRef);

    useEffect(() => {
        console.info("GetContainerSizeWidget elementHeight: " + elementHeight);
    }, [elementHeight]);

    const className = props.name + " resizeVirtualScrollDataGrid";
    return (
        <div ref={slotRef} style={{ height: "100%" }} className={className}>
            {props.content}
        </div>
    );
}
