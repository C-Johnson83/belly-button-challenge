
// Get the Data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
d3.json(url).then(function(data) {
// Get Metadata
let metadata = Object.values(data.metadata[0]);
let freq = metadata[6]
  displayWashing(freq)
});


function displayWashing(freq) {

// Check to see if the data we're getting is the data we need
  console.log(`Daily Washing`)
  console.log(freq)
  let gaugeChart = [{
      domain: { x: [0, 1], y: [0, 1] },
      value: freq,
      type: "indicator",
      axis: { range: [null, 7] },
      
      title: { text: "Washing Frequency" },
      mode: "gauge+number",
      
      gauge: {
          axis: { range: [0, 9], tickwidth: 1 },
          
          bar: { color: "white", thickness: 0.1},
          steps: [
              { range: [0, .5], color: "#0D47A1", },
              { range: [.5,1], color: "#1565C0" },
              { range: [1,1.5], color: "#1976D2" },
              { range: [1.5,2], color: "#1E88E5"},
              { range: [2,2.5], color: "#2196F3"},
              { range: [2.5,3], color: "#42A5F5", },
              { range: [3,3.5], color: "#64B5F6", },
              { range: [3.5,4], color: "#90CAF9" },
              { range: [4,4.5], color: "#BBDEFB" },
              { range: [4.5, 5], color: "#F8BBD0"},
              { range: [5,5.5], color: "#F48FB1" },
              { range: [5.5,6], color: "#F06292", },
              { range: [6,6.5], color: "#EC407A"},
              { range: [6.5,7], color: "#E91E63" },
              { range: [7, 7.5], color: "#D81B60", },
              { range: [7.5,8], color: "#C2185B"},
              { range: [8,8.5], color: "#AD1457" },
              { range: [8.5,9], color: "#880E4F", },
             
              
              
              
              
             
             
          ],
          threshold: {
              line: { color: "white", width: 4 },
              thickness: 0.75,
              value: freq
            }
      }
  }];
  let gaugeLayout = {
      width: 450,
      height: 450,
      margin: { t: 25, r: 25, l: 25, b: 25 },
      
      // paper_bgcolor: "cyan",
      font: { color: "Black", family: "Arial" }
  };
  Plotly.newPlot("gauge", gaugeChart, gaugeLayout);


}

          
  

