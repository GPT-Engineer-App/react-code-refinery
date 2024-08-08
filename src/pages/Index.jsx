import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';

const CodeDisplay = ({ code, language, highlightRanges }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code, highlightRange]);

  let highlightedCode = code;
  if (highlightRanges.length > 0) {
    highlightRanges.sort((a, b) => b.start - a.start);
    highlightRanges.forEach(range => {
      highlightedCode = 
        highlightedCode.slice(0, range.start) +
        `<span class="bg-yellow-200">${highlightedCode.slice(range.start, range.end)}</span>` +
        highlightedCode.slice(range.end);
    });
  }

  return (
    <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
      <code
        className={`language-${language}`}
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </pre>
  );
};

const Index = () => {
  const originalCode = useRef(`
import React, { useState, useEffect } from 'react';

const MyComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.example.com/data');
      const result = await response.json();
      setData(result);
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Data List</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;
  `.trim());

  const [searchText, setSearchText] = useState('const MyComponent');
  const [replaceText, setReplaceText] = useState('const MyUpdatedComponent');
  const [codeText, setCodeText] = useState(originalCode.current);

  const [highlightRanges, setHighlightRanges] = useState([]);

  const performSearch = useCallback(() => {
    const ranges = [];
    let startIndex = 0;
    while (true) {
      const index = codeText.indexOf(searchText, startIndex);
      if (index === -1) break;
      ranges.push({ start: index, end: index + searchText.length });
      startIndex = index + 1;
    }
    setHighlightRanges(ranges);
  }, [codeText, searchText]);

  const performReplace = useCallback(() => {
    let newCodeText = codeText;
    highlightRanges.sort((a, b) => b.start - a.start).forEach(range => {
      newCodeText = 
        newCodeText.slice(0, range.start) +
        replaceText +
        newCodeText.slice(range.end);
    });
    setCodeText(newCodeText);
    setHighlightRanges([]);
  }, [codeText, replaceText, highlightRanges]);

  const handleSearchReplace = () => {
    if (highlightRanges.length === 0) {
      performSearch();
    } else {
      performReplace();
    }
  };

  const handleReset = () => {
    setSearchText('');
    setReplaceText('');
    setCodeText(originalCode.current);
    setHighlightRanges([]);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      performSearch();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText, codeText, performSearch]);

  return (
    <div className="min-h-screen flex bg-white">
      <div className="w-1/3 p-4 border-r">
        <h2 className="text-xl font-semibold mb-2">Search</h2>
        <Textarea
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="mb-4 h-40"
        />
        <h2 className="text-xl font-semibold mb-2">Replace</h2>
        <Textarea
          value={replaceText}
          onChange={(e) => setReplaceText(e.target.value)}
          className="mb-4 h-40"
        />
        <div className="flex space-x-2">
          <Button onClick={handleSearchReplace}>
            {highlightRanges.length === 0 ? "Search" : "Replace"}
          </Button>
          <Button onClick={handleReset} variant="outline">
            Reset
          </Button>
        </div>
      </div>
      <div className="w-2/3 p-4">
        <h2 className="text-2xl font-bold mb-4">Code</h2>
        <CodeDisplay code={codeText} language="jsx" highlightRanges={highlightRanges} />
      </div>
    </div>
  );
};

export default Index;
