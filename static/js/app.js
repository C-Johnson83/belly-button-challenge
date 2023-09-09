////////////////////////////////////////
//      Function that plots the       //
//      default visualizations        //
//      so it is not a blank page     //
////////////////////////////////////////

function init() {

    // Get the Data
    const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

    d3.json(url).then(function (data) {
        console.log(`Initial Data`);
        console.log(data);
        // Get Names
        let names = Object.values(data.names);
        console.log(`Names`);
        console.log(names);
        // Get Metadata
        let metadata = Object(data.metadata[0]);
        console.log(`Metadata`);
        console.log(metadata);
        // Get Sample Values
        let sampVal = Object.values(data.samples[0].sample_values);
        console.log(`Sample Values`);
        console.log(sampVal);
        // Get OTU ID's
        let otuIDs = Object.values(data.samples[0].otu_ids);
        console.log(`OTU ID's`);
        console.log(otuIDs);
        // Get OTU Labels
        let otuLabels = Object.values(data.samples[0].otu_labels);
        console.log(`OTU Labels`);
        console.log(otuLabels);
        // Populate the dropdown from the list/array
        let selector = d3.select("#selDataset");
        for (let i = 0; i < names.length; i++) {
            console.log(data[names[i]])
            selector.append("option").text(names[i]).property("value", names[i]);
        }
        // Populate the Demographic Info with the Function defined below
        d3.select("#sample-metadata").html(demographic(metadata));
        demographic(metadata);
        console.log(`metadata`)
        console.log(metadata)

        // Call the Bar Function defined below
        displayBar(sampVal, otuIDs, otuLabels);

        // Call the Bubble Function defined below
        displayBubble(otuIDs, sampVal, otuLabels);
    }
    )
};
////////////////////////////////////////
//    Function that allows the        //
//    Charts to be chaned when the    //
//    Test Subject ID changes         //
////////////////////////////////////////

// Update the charts when the Test Subject ID is changed
function optionChanged() {

    // Get the Data
    d3.json(url).then(function (data) {
        let menu = d3.select("#selDataset");
        let dataset = menu.property("value");
        console.log(`user selected ${dataset}`);

        // Make variables for the selected Test Subject Id
        let newData = data.samples.find(sample => sample.id === dataset);
        console.log(`newData`);
        console.log(newData);

        // let newMetadata = data.metadata.find(metadat => metadat.id === dataset);
        if (newData) {
            let newSamp = newData.sample_values;
            let newOtu = newData.otu_ids;
            let newLabels = newData.otu_labels;
            let selectionData = dataset;
            console.log(selectionData);

            // Re-Call Bar and Bubble Functions
            displayBar(newSamp, newOtu, newLabels);
            displayBubble(newOtu, newSamp, newLabels);

            // Replace the demographic info with the new demographic info
            newDemographic(selectionData)
            let newMetadata = data.metadata.find(metadata => metadata.id == dataset)

            console.log(`newMetadata`);
            console.log(newMetadata);

            if (newMetadata) {
                // Extract the washing frequency from the metadata
                let newFreq = newMetadata.wfreq;
                displayWashing(newFreq);

            }
        }

    });

}
////////////////////////////////////////
//    Collection of defined           //
//    Functions to plot the charts    //
//    and the Demographic Info        //
////////////////////////////////////////
// Bar chart function
function displayBar(sampVal, otuIDs, otuLabels) {
    console.log(`displaybar`)
    // Set the Bar x and y values
    let x = sampVal.slice(0, 10).reverse();
    let y = otuIDs.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    text = otuLabels.slice(0, 10).reverse();
    console.log(x);
    console.log(y);
    // Set the bar chart parameters
    let barChart = [{
        x: x,
        y: y,
        type: "bar",
        text: text,
        orientation: "h",
        marker: {
            // bgcolor: "aquamarine",
            color: "#F06292",
            line: {
                color: 'Magenta',
                width: 2
            }
        }
    }
    ];
    // Set the size of the chart visualization and Title
    let barLayout = [{
        title: "Top 10 Belly Bacts",
        margin: { t: 25, l: 150 },
    }
    ];
    // Plot the chart when function is called
    Plotly.newPlot("bar", barChart, barLayout);
}
// Bubble chart function
function displayBubble(otuIDs, sampVal, otuLabels) {
    console.log(`Display Bubble`)
    // Set the Bubble variables
    let a = otuIDs;
    let b = sampVal;
    let text = otuLabels;
    let marker_size = sampVal;
    let marker_color = otuIDs
    console.log(`OTU ID's`);
    console.log(a);
    console.log(`Sample Values`);
    console.log(b);
    let bubbleChart = [
        {
            x: a,
            y: b,
            text: text,
            mode: "markers",
            marker: {
                size: marker_size,
                color: marker_color,
                colorscale: 'Bluered',
                line: {
                    color: "magenta",
                    width: 2
                }
            }
        }
    ];
    // Set the size, title, and other parameters of the chart visualization
    let bubbleLayout = [
        {

            title: "Top 10 Belly Bacts",
            xaxis: {
                title: "OTU-IDs"
            },
            showlegend: true,

            height: 800,
            width: 1800,

        }
    ];
    // Plot the chart when function is called
    Plotly.newPlot("bubble", bubbleChart, bubbleLayout);
}
// Demographic Info function for the default visualization
function demographic(metadata) {
    let demo = "";
    Object.entries(metadata).forEach(([key, value]) => demo += `<br>${key}: ${value}<br>`)
    return demo;
}
// Demographic Info function for the changed visualization
function newDemographic(selectionData) {
    d3.json(url).then((data) => {
        console.log(data);
        let metadata = data.metadata;
        let filData = metadata.filter((meta) => meta.id == selectionData);
        d3.select("#sample-metadata").html("");
        Object.entries(filData[0]).forEach(([key, value]) => (
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`)
        )
        );
    }
    );
};

// Finally, Call the actual initialization function set at the begining
init()
// Call the optionChanged function to update the plots when the ID is changed
d3.selectAll("#selDataset").on("change", optionChanged);