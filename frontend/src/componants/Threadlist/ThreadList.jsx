import React, { useState, useRef, useEffect } from "react";

const ThreadList = () => {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [text, setText] = useState("");
  const spanRef = useRef(null);
  const [inputWidth, setInputWidth] = useState(250); // initial width in pixels

  useEffect(() => {
    if (spanRef.current) {
      const width = spanRef.current.offsetWidth + 24; // add some padding
      setInputWidth(Math.max(100, width)); // minimum width
    }
  }, [text]);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:5000/api/threads");
        if (!response.ok) {
          throw new Error('Failed to fetch threads');
        }
        const data = await response.json();
        setThreads(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch threads:", err);
        setError("Failed to load threads. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchThreads();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-gray-200 dark:bg-gray-700 h-24 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center">
          <div className="text-red-600 dark:text-red-400 text-lg font-medium mb-2">
            ⚠️ Something went wrong
          </div>
          <p className="text-red-700 dark:text-red-300">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (threads.length === 0) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No threads yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Be the first to start a conversation!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>

      <div className='font-virgil flex  justify-center  text-5xl p-5'>
        <div className="border-b-4 border-0 border-black">
          <div className="relative inline-block">
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
        </div>
      </div>



      <div className="p-6 max-w-4xl mx-auto space-y-4">
        {/* Header */}
        {/* <div className="flex flex-col items-center justify-center">
          <h1 className="font-virgil text-3xl font-bold text-black mb-2">
            Threads
          </h1>
        </div> */}

        {/* Thread List */}
        <div className="w-100 space-y-4 font-virgil ">
          {threads.map((thread, index) => (
            <div
              key={thread.id}
              className="group relative bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.6s ease-out forwards'
              }}
            >
              {/* Thread Header */}
              <div className="flex items-start justify-between mb-3">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-pink-400 transition-colors duration-200 line-clamp-2">
                  {thread.title}
                </h2>
              </div>

              {/* Thread Content */}
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3 mb-4">
                {thread.content}
              </p>

              {/* Thread Meta */}
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-4">
                  {thread.created_at && (
                    <span className="flex items-center space-x-1">
                      <span>&gt;</span>
                      <span>{new Date(thread.created_at).toLocaleDateString()}</span>
                    </span>
                  )}
                </div>

                {/* Read more indicator */}
                <div className="flex items-center space-x-1 text-blue-500 dark:text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span>Read more</span>
                  <span>→</span>
                </div>
              </div>

              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Load more button (if needed) */}
        {threads.length > 0 && (
          <div className="text-center pt-8">
            <button className="bg-black text-white font-medium px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 hover:text-pink-400">
              V
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThreadList;