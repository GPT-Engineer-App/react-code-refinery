import React, { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";

const CodeDisplay = ({ code }) => (
  <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
    <code className="text-sm">{code}</code>
  </pre>
);

const Index = () => {
  const [searchText, setSearchText] = useState('const MyComponent = () => {\n  return (\n    <div>\n      <h1>Hello, World!</h1>\n    </div>\n  );\n};');
  const [replaceText, setReplaceText] = useState('const MyComponent = () => {\n  return (\n    <div>\n      <h1>Hello, React!</h1>\n      <p>Welcome to my app.</p>\n    </div>\n  );\n};');

  const fakeReactCode = `
import React from 'react';

const MyComponent = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My React Component</h1>
      <p className="mb-2">You clicked {count} times</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        Click me
      </button>
    </div>
  );
};

export default MyComponent;
  `.trim();

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
      </div>
      <div className="w-2/3 p-4">
        <h2 className="text-2xl font-bold mb-4">Formatted React Code</h2>
        <CodeDisplay code={fakeReactCode} />
      </div>
    </div>
  );
};

export default Index;
