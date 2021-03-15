// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody");

/**
 * Build out the visual table for the ufo data.
 * 
 * @param {Array} data 
 */
function buildTable(data) {
    // Clear the table
    tbody.html("");

    // Loop through each field in the dataRow and
    // add each value as a table cell (td)
    data.forEach((dataRow) => {
        // Create a table row.
        let row = tbody.append("tr");

        // Add data cells to the row.
        Object.values(dataRow).forEach((val) => {
            let cell = row.append("td");
            cell.text(val);
        });
    });
}

function handleClick() {
    let date = d3.select("#datetime")
        .property("value");

    let filteredData = tableData;

    if (date) {
        filteredData = filteredData.filter(row => row.datetime === date);
    }

    buildTable(filteredData);
}

d3.selectAll("#filter-btn").on("click", handleClick);

buildTable(tableData);