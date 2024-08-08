import React, { useState, useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea";
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';

const CodeDisplay = ({ code, language }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
};

const Index = () => {
  const [searchText, setSearchText] = useState('const MyComponent = () => {\n  return (\n    <div>\n      <h1>Hello, World!</h1>\n    </div>\n  );\n};');
  const [replaceText, setReplaceText] = useState('const MyComponent = () => {\n  return (\n    <div>\n      <h1>Hello, React!</h1>\n      <p>Welcome to my app.</p>\n    </div>\n  );\n};');

  const fakeReactCode = `
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
`.trim();

const fakeCSS = `
.container {
  max-width: 800px;
  margin: 0 auto;
}

.title {
  font-size: 24px;
  color: #333;
  margin-bottom: 16px;
}

.list-item {
  padding: 8px;
  border-bottom: 1px solid #eee;
}

.list-item:last-child {
  border-bottom: none;
}
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
        <CodeDisplay code={fakeReactCode} language="jsx" />
        <h2 className="text-2xl font-bold mt-8 mb-4">CSS Styles</h2>
        <CodeDisplay code={fakeCSS} language="css" />
      </div>
    </div>
  );
};

export default Index;
