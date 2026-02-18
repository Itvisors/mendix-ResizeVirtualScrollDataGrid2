import { useLayoutEffect, useState } from "react";

/**
 * Meet de content-box hoogte van een element met ResizeObserver.
 * @param {import('react').RefObject<HTMLElement>} ref
 * @returns {number}
 */
export function useElementHeight(ref) {
    const [height, setHeight] = useState(0);

    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return;

        // console.info("useElementHeight - initial: " + el.clientHeight);
        setHeight(el.clientHeight);

    }, [ref]);

    return height;
}
