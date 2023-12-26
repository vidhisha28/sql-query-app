// services/database.js
import initSqlJs from 'sql.js';

// Function to initialize the SQLite database
export async function initDatabase(csvData) {
  const SQL = await initSqlJs();

  // Create a new database
  const db = new SQL.Database();

  const tableName = 'your_table_name'; // Set your table name

  // Create a table and insert the data
  db.exec(`CREATE TABLE ${tableName} (${Object.keys(csvData[0]).join(', ')});`);
  csvData.forEach((row) => {
    const values = Object.values(row).map((value) => JSON.stringify(value));
    db.exec(`INSERT INTO ${tableName} VALUES (${values.join(', ')});`);
  });

  return db;
}

// Function to execute an SQL query on the database
export function executeQuery(db, query) {
  try {
    const result = db.exec(query);

    if (result.length > 0 && result[0].columns && result[0].values) {
      // Convert the results to an array of objects
      const queryResultsArray = result[0].values.map((row) =>
        result[0].columns.reduce((acc, col, index) => {
          acc[col] = row[index];
          return acc;
        }, {})
      );

      return queryResultsArray;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error executing query:', error);
    return [];
  }
}
