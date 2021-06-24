// from data.js
var tableData = data;

// YOUR CODE HERE!
var tbody = d3.select("tbody");

// function to filter the records based on date input
function filterRecords(dt) {
    var mdy1 = new Date(dt);
    // console.log(mdy1.getMonth());
    // console.log(mdy1.getDate());
    // console.log(mdy1.getFullYear());
    var records = []
    tableData.forEach(data => {
        var mdy2 = new Date(data.datetime);
        if ((mdy2.getTime() === mdy1.getTime()) || (dt === "")) {
            records.push(data);
        }
    });
    return records;
}


function updateTable(records) {
    tbody.html("");
    if (records.length < 1) return; // if no input, return nothing.
    records.forEach(record => {
        var row = tbody.append("tr");
        Object.entries(record).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
}

var button = d3.select("#filter-btn");

function handleInput() {
    // stops the page refresh on "Enter" button
    d3.event.preventDefault();

    var dt = d3.select("#datetime").property("value");
    var records = filterRecords(dt);
    updateTable(records);
}

// Update the table with button click
button.on("click", handleInput);
// Enter also update the output
d3.select("form").on("submit", handleInput);
