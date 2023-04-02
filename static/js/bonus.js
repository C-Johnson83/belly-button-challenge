let newMetadata = data.metadata.find(meta => meta.id === dataset);
if (newMetadata) {
    displayWashing(newMetadata),
    displayMeta(newMetadata);
    } 


function displayWashing(metadata) {
    
    let value = metadata[6];

// Check to see if the data we're getting is the data we need
    console.log(`Daily Washing`)
    console.log(value)

    let gaugeChart = [{
        domain: { x: [0, 1], y: [0, 1] },
        value: value,
        type: "indicator",
        axis: { range: [null, 7] },
        title: { text: "Washing Frequency" },
        mode: "gauge+number",
        gauge: {
            axis: { range: [null, 7], tickwidth: 1 },
            bar: { color: "green", thickness: 0.1 },
            steps: [
                { range: [0, 2], color: "blue" },
                { range: [2, 4], color: "purple" },
                { range: [4, 7], color: "red" }
            ],
            threshold: {
                line: { color: "red", width: 4 },
                thickness: 0.75,
                value: value
              }
        }
    }];

    let gaugeLayout = { 
        width: 600, 
        height: 500, 
        margin: { t: 25, r: 25, l: 25, b: 25 },
        paper_bgcolor: "lavender",
        font: { color: "darkblue", family: "Arial" }
    };

    Plotly.newPlot("gauge", gaugeChart, gaugeLayout);
}


function displayMeta(metadata){
    let demo = "";
    Object.entries(metadata).forEach(([key, value]) => demo += `<br>${key}: ${value}<br>`)
    return demo;}