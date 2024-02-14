import React from "react";
function useSpecificDescendantClick<T extends HTMLElement>(
  descendantRef: React.RefObject<T>,
  tag: keyof HTMLElementTagNameMap,
  handler: () => void
) {
  const handleClick = (event: MouseEvent) => {
    if (
      descendantRef.current &&
      descendantRef.current.contains(event.target as Node) &&
      event.target instanceof HTMLElement &&
      event.target.tagName.toLowerCase() === tag.toLowerCase()
    ) {
      handler();
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [descendantRef, tag, handler]);
}

export default useSpecificDescendantClick;
