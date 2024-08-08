import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';

const CodeDisplay = ({ code, language, highlightRange }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code, highlightRange]);

  const highlightedCode = highlightRange
    ? code.slice(0, highlightRange.start) +
      `<span class="bg-yellow-200">${code.slice(highlightRange.start, highlightRange.end)}</span>` +
      code.slice(highlightRange.end)
    : code;

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

  const [highlightRange, setHighlightRange] = useState(null);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);

  const performSearch = useCallback(() => {
    const searchIndex = codeText.indexOf(searchText);
    if (searchIndex !== -1) {
      setHighlightRange({
        start: searchIndex,
        end: searchIndex + searchText.length,
      });
    } else {
      setHighlightRange(null);
    }
  }, [codeText, searchText]);

  const performReplace = useCallback(() => {
    if (highlightRange) {
      const newCodeText =
        codeText.slice(0, highlightRange.start) +
        replaceText +
        codeText.slice(highlightRange.end);
      setCodeText(newCodeText);
      setHighlightRange(null);
    }
  }, [codeText, replaceText, highlightRange]);

  const handleSearchReplace = () => {
    if (currentSearchIndex < searchText.length) {
      setCurrentSearchIndex((prev) => prev + 1);
    } else {
      performReplace();
      setCurrentSearchIndex(0);
    }
  };

  const handleReset = () => {
    setSearchText('');
    setReplaceText('');
    setCodeText(originalCode.current);
    setHighlightRange(null);
    setCurrentSearchIndex(0);
  };

  useEffect(() => {
    if (currentSearchIndex > 0) {
      const partialSearch = searchText.slice(0, currentSearchIndex);
      const searchIndex = codeText.indexOf(partialSearch);
      if (searchIndex !== -1) {
        setHighlightRange({
          start: searchIndex,
          end: searchIndex + partialSearch.length,
        });
      } else {
        setHighlightRange(null);
      }
    }
  }, [currentSearchIndex, searchText, codeText]);

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
            {currentSearchIndex < searchText.length ? "Search" : "Replace"}
          </Button>
          <Button onClick={handleReset} variant="outline">
            Reset
          </Button>
        </div>
      </div>
      <div className="w-2/3 p-4">
        <h2 className="text-2xl font-bold mb-4">Code</h2>
        <CodeDisplay code={codeText} language="jsx" highlightRange={highlightRange} />
      </div>
    </div>
  );
};

export default Index;
