import { useEffect } from 'react';

export const useContentProtection = (enabled = true) => {
    useEffect(() => {
        if (!enabled) return;

        const disableRightClick = (e) => e.preventDefault();
        const preventCopyActions = (e) => e.preventDefault();
        const preventKeys = (e) => {
            const key = e.key.toLowerCase();
            if (e.ctrlKey && ["c", "a", "u", "s", "p", "x", "v"].includes(key)) {
                e.preventDefault();
            }
            if (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(key)) {
                e.preventDefault();
            }
            if (e.key === "F12") e.preventDefault();
        };
        const preventSelection = (e) => e.preventDefault();
        const preventDrag = (e) => e.preventDefault();

        document.addEventListener("contextmenu", disableRightClick);
        document.addEventListener("copy", preventCopyActions);
        document.addEventListener("cut", preventCopyActions);
        document.addEventListener("paste", preventCopyActions);
        document.addEventListener("keydown", preventKeys);
        document.addEventListener("selectstart", preventSelection);
        document.addEventListener("dragstart", preventDrag);

        document.body.style.userSelect = "none";
        document.body.style.webkitUserSelect = "none";

        return () => {
            document.removeEventListener("contextmenu", disableRightClick);
            document.removeEventListener("copy", preventCopyActions);
            document.removeEventListener("cut", preventCopyActions);
            document.removeEventListener("paste", preventCopyActions);
            document.removeEventListener("keydown", preventKeys);
            document.removeEventListener("selectstart", preventSelection);
            document.removeEventListener("dragstart", preventDrag);

            document.body.style.userSelect = "auto";
            document.body.style.webkitUserSelect = "auto";
        };
    }, [enabled]);
};