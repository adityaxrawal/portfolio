import { useEffect, useRef } from "react";

export const useSmoothScroll = () => {
    const scrollContainer = useRef(null);
    const scrollY = useRef(0);
    const ease = 0.08; // Adjust for smoothness (lower = smoother)
    let targetScrollY = 0;

    useEffect(() => {
        const handleScroll = () => {
            targetScrollY = window.scrollY; // Target position
        };

        const smoothScroll = () => {
            // Apply easing formula (interpolation)
            scrollY.current += (targetScrollY - scrollY.current) * ease;

            if (scrollContainer.current) {
                scrollContainer.current.style.transform = `translate3d(0, -${scrollY.current}px, 0)`;
            }

            requestAnimationFrame(smoothScroll);
        };

        // Set up the container
        document.body.style.height = `${scrollContainer.current.clientHeight}px`;
        window.addEventListener("scroll", handleScroll);

        requestAnimationFrame(smoothScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return scrollContainer;
};
