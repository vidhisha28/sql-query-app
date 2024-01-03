import React, { useState, useEffect } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/sql/sql';
import 'codemirror/theme/material.css';
import Papa from 'papaparse';
import { initDatabase , executeQuery } from './services/Database';

function App() {
  const [sqlQuery, setSqlQuery] = useState('');
  const [queryResults, setQueryResults] = useState([]);
  const [database, setDatabase] = useState(null);

  useEffect(() => {
    Papa.parse('/mens_shoes_data.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (result) => {
        initDatabase(result.data).then((db) => setDatabase(db));
      },
    });
  }, []);

  const handleExecuteQuery = () => {
    if (database) {
      //For executing SQL Query
      const results = executeQuery(database, sqlQuery);
      setQueryResults(results);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>SQL Query Executor</h1>
        <CodeMirror
          value={sqlQuery}
          options={{
            mode: 'sql',
            theme: 'material',
            lineNumbers: true,
            lineWrapping: true, // Enable horizontal scrollbar
          }}
          onChange={(editor, data, value) => setSqlQuery(value)}
        />
        <button onClick={handleExecuteQuery}>Execute Query</button>
        <div>
          <h2>Query Results</h2>
          <table>
            <thead>
              <tr>
                {/* Display table headers based on the query results columns */}
                {Object.keys(queryResults[0] || {}).map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Display table rows based on the query results data */}
              {queryResults.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, idx) => (
                    <td key={idx}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </header>
    </div>
  );
}

export default App;

