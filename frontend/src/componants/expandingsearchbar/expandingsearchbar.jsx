// ExpandingSearchBarTailwind.js
import React, { useState, useRef, useEffect } from "react";

const ExpandingSearchBarTailwind = () => {
  const [text, setText] = useState("");
  const spanRef = useRef(null);
  const [inputWidth, setInputWidth] = useState(250); // initial width in pixels

  useEffect(() => {
    if (spanRef.current) {
      const width = spanRef.current.offsetWidth + 24; // add some padding
      setInputWidth(Math.max(100, width)); // minimum width
    }
  }, [text]);

  return (
    <div className="relative inline-block p-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search..."
        style={{ width: `${inputWidth}px` }}
        className="transition-all duration-200 rounded px-4 py-2 text-2xl outline-none bg-transparent border-none"
      />
      {/* Hidden span to calculate text width */}
      <span
        ref={spanRef}
        className="absolute top-[-9999px] left-[-9999px] whitespace-pre text-2xl px-4 py-2 font-sans"
      >
        {text || "Search..."}
      </span>
    </div>

  );
};

export default ExpandingSearchBarTailwind;

