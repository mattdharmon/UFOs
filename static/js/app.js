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
                row.append("td")
                    .text(val);
            });
    });
}

// store the form filters here.
let form = [];

function updateFilters() {

    let filter = d3.select(this);
    let value = filter.property('value');
    let id = filter.attr('id');

    let found = form.findIndex(_ => _.id == id);


    // set the filter values.
    if (found > -1) {
        if (value == "") {
            form.splice(found, 1);
        } else {
            form[i].value = value;
        }
    } else {
        form.push({
            id: id,
            value: value, 
        });
    }
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

// Build the initial table
buildTable(tableData);