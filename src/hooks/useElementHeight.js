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

        // Initiele meting
        setHeight(el.clientHeight);

        // ResizeObserver: update bij parent/slot resizes en font/layout changes
        const ro = new ResizeObserver(entries => {
            // gebruik forEach om 'void' intent duidelijk te maken voor ESLint
            entries.forEach(entry => {
                setHeight(Math.round(entry.contentRect.height));
            });
        });
        ro.observe(el);

        const onWinResize = () => setHeight(el.clientHeight);
        window.addEventListener("resize", onWinResize);

        // eslint-disable-next-line consistent-return
        return () => {
            ro.disconnect();
            window.removeEventListener("resize", onWinResize);
        };
    }, [ref]);

    return height;
}
