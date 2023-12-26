// SQLInput.js
import React, { useState } from 'react';

const SQLInput = ({ onQueryChange }) => {
  const [query, setQuery] = useState('');

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleRunQuery = () => {
    // Call a function to handle the query (you will implement this)
    onQueryChange(query);
  };

  return (
    <div>
      <textarea value={query} onChange={handleQueryChange} rows="4" cols="50" />
      <button onClick={handleRunQuery}>Run Query</button>
    </div>
  );
};

export default SQLInput;
