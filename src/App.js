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
      // Execute the SQL query
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


// import React, { useState } from 'react';
// import { Controlled as CodeMirror } from 'react-codemirror2';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/mode/sql/sql';
// import './App.css';
// import { fetchShoeData } from './services/DataService';

// function App() {
//   const [sqlQuery, setSqlQuery] = useState('');
//   const [queryResults, setQueryResults] = useState([]);

//   const handleExecuteQuery = async () => {
//     try {
//       // Fetch data from the CSV file
//       const data = await fetchShoeData();
//       // Your logic to filter data based on the SQL query goes here
//       // For now, let's assume you want to show all data
//       setQueryResults(data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setQueryResults([]);
//     }
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>SQL Query Executor</h1>
//         <CodeMirror
//           value={sqlQuery}
//           options={{
//             mode: 'sql',
//             theme: 'material',
//             lineNumbers: true,
//           }}
//           onBeforeChange={(editor, data, value) => setSqlQuery(value)}
//         />
//         <button onClick={handleExecuteQuery}>Execute Query</button>
//         <div>
//           <h2>Query Results</h2>
//           <table>
//             <thead>
//               <tr>
//                 {/* Display table headers based on the CSV columns */}
//                 {Object.keys(queryResults[0] || {}).map((header) => (
//                   <th key={header}>{header}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {/* Display table rows based on the CSV data */}
//               {queryResults.map((row, index) => (
//                 <tr key={index}>
//                   {Object.values(row).map((value, idx) => (
//                     <td key={idx}>{value}</td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </header>
//     </div>
//   );
// }

// export default App;


// // import React, { useState } from 'react';
// // import { Controlled as CodeMirror } from 'react-codemirror2';
// // // import SQLInput from './SQLInput';
// // // import ResultTable from './ResultTable';
// // import 'codemirror/lib/codemirror.css';
// // import 'codemirror/mode/sql/sql';
// // import './App.css';
// // import fetchData from './services/DataService';

// // function App() {
// //   const [sqlQuery, setSqlQuery] = useState('');
// //   const [queryResults, setQueryResults] = useState([]);

// //   const handleExecuteQuery = async () => {
// //     try {
// //       // Fetch data based on the SQL query
// //       const data = await fetchData(sqlQuery);
// //       setQueryResults(data);
// //     } catch (error) {
// //       console.error('Error executing query:', error);
// //       setQueryResults([]);
// //     }
// //   };

// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <h1>SQL Query Executor</h1>
// //         <CodeMirror
// //           value={sqlQuery}
// //           options={{
// //             mode: 'sql',
// //             theme: 'material',
// //             lineNumbers: true,
// //           }}
// //           onBeforeChange={(editor, data, value) => setSqlQuery(value)}
// //         />
// //         <button onClick={handleExecuteQuery}>Execute Query</button>
// //         <div>
// //           <h2>Query Results</h2>
// //           <table>
// //             <thead>
// //               <tr>
// //                 {/* Display table headers based on the CSV columns */}
// //                 {Object.keys(queryResults[0] || {}).map((header) => (
// //                   <th key={header}>{header}</th>
// //                 ))}
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {/* Display table rows based on the CSV data */}
// //               {queryResults.map((row, index) => (
// //                 <tr key={index}>
// //                   {Object.values(row).map((value, idx) => (
// //                     <td key={idx}>{value}</td>
// //                   ))}
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;
