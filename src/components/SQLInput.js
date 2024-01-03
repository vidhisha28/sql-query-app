// SQLInput.js
import React, { useState } from 'react';

const SQLInput = ({ onQueryChange }) => {
  const [query, setQuery] = useState('');

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };


  const handleRunQuery = () => {
      if (database) {
        try {
          // Executes the SQL query
          const results = executeQuery(database, sqlQuery);
          setQueryResults(results);
        } catch (error) {
          console.error('Error executing query:', error);
          // error handling
        }
      }
    };
  
  
  return (
    <div>
      <textarea value={query} onChange={handleQueryChange} rows="4" cols="50" />
      <button onClick={handleRunQuery}>Run Query</button>
    </div>
  );
};


export default SQLInput;

