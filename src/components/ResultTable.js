import React from 'react';

const ResultTable = ({ data }) => {
    return (
        <table>
            <thead>
                <tr>
                    {/* Render table headers based on data structure */}
                    {Object.keys(data[0]).map((key) => (
                        <th key={key}>{key}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {/* Render table rows based on data */}
                {data.map((item, index) => (
                    <tr key={index}>
                        {Object.values(item).map((value, idx) => (
                            <td key={idx}>{value}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ResultTable;
