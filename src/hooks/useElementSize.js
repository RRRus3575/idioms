import { useEffect, useState } from "react";

export function useElementSize() {
  const [el, setEl] = useState(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!el) return;
    setHeight(el.getBoundingClientRect().height);

    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        setHeight(entry.target.getBoundingClientRect().height);
      }
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, [el]);

  return { refCallback: setEl, height };
}