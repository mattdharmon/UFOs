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
        Object.values(dataRow)
            .forEach((val) => {
                let cell = row.append("td");
                cell.text(val);
            });
    });
}

// store the form filters here.
let form = [];

function updateFilters() {

    let date = d3.select("#datetime")
        .property("value");
    let city = d3.select("#city")
        .property("value");
    let state = d3.select("#state")
        .property("value");
    let country = d3.select("#country")
        .property("value");
    let shape = d3.select("#shape")
        .property("value");

    // Clear the form filter
    form = [];

    // Add the filters that have values to the form filter.
    if (date) {
        form.push({ id: "datetime", value: date });
    }

    if (city) {
        form.push({ id: "city", value: city });
    }

    if (state) {
        form.push({ id: "state", value: state });
    }

    if (country) {
        form.push({ id: "country", value: country });
    }

    if (shape) {
        form.push({ id: "shape", value: shape });
    }

    // Filter the table
    filterTable();

}

function filterTable() {

    // Copy the table data to keep original data intact.
    let filteredData = tableData;

    // Loop through all of the filters and keep any data that
    // matches the filter values
    form.forEach((_) => {
        filteredData = filteredData.filter(row => row[_.id] === _.value);
    });


    // Build out the table to filtered data.
    buildTable(filteredData);
}

// Attach an event to listen for changes to each filter
d3.selectAll("#datetime").on("change", updateFilters);
d3.selectAll("#city").on("change", updateFilters);
d3.selectAll("#state").on("change", updateFilters);
d3.selectAll("#country").on("change", updateFilters);
d3.selectAll("#shape").on("change", updateFilters);

buildTable(tableData);