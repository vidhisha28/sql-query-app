import Papa from 'papaparse';

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
    
