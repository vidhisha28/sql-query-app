// Simulated data service, replace with actual data fetching logic
import Papa from 'papaparse';

  // Assuming the CSV file is in the public folder of your React app
  const csvFilePath = '/mens_shoes_data.csv';
  
  export const fetchShoeData = async () => {
    return new Promise((resolve, reject) => {
      Papa.parse(csvFilePath, {
        header: true,
        download: true,
        skipEmptyLines: true,
        complete: (result) => {
          // Result.data contains the parsed CSV data
          if (result.errors.length > 0) {
            reject(result.errors);
          } else {
            resolve(result.data);
          }
        },
      });
    });
  };
    
