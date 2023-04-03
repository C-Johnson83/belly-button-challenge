// Get the Data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
d3.json(url).then(function(data) {
// Get Metadata
let metadata = Object.values(data.metadata[0]);
let freq = metadata[6]
  displayWashing(freq)
});




function metaChange(){
      // Get the Data
  
  d3.json(url).then(function(data) {
  let menu = d3.select("#selDataset");
  let dataset = menu.property("value");

  // Make variables for new data
  let newData = data.metadata.find((meta)=> meta.id === dataset); 
  let newmetadata = Object.values(data.metadata[0]);
  if(newData){
    let newfreq = newmetadata[6]
  
    console.log(newData);
    console.log(newfreq)
    newWashing(newfreq)  
  }})}
  
;
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
          
          bar: { color: "Magenta", thickness: 0.1},
          steps: [
              { range: [0, 3], color: "blue", line: {color: "Magenta"} },
              { range: [3, 6], color: "cyan" },
              { range: [6, 9], color: "lightblue"}
          ],
          threshold: {
              line: { color: "Magenta", width: 4 },
              thickness: 0.75,
              value: freq
            }
      }
  }];
  let gaugeLayout = {
      width: 450,
      height: 450,
      margin: { t: 25, r: 25, l: 25, b: 25 },
      
      // paper_bgcolor: "powderblue",
      font: { color: "Magenta", family: "Arial" }
  };
  Plotly.newPlot("gauge", gaugeChart, gaugeLayout);


}
function newWashing(newfreq) {

  // Check to see if the data we're getting is the data we need
    console.log(`Daily Washing`)
    console.log(newfreq)
    let gaugeChart = [{
        domain: { x: [0, 1], y: [0, 1] },
        value: newfreq,
        type: "indicator",
        axis: { range: [null, 7] },
        
        title: { text: "Washing Frequency" },
        mode: "gauge+number",
        
        gauge: {
            axis: { range: [0, 9], tickwidth: 1 },
            
            bar: { color: "Magenta", thickness: 0.1 },
            steps: [
                { range: [0, 3], color: "blue" },
                { range: [3, 6], color: "cyan" },
                { range: [6, 9], color: "lightblue"}
            ],
            threshold: {
                line: { color: "Magenta", width: 4 },
                thickness: 0.75,
                value: newfreq
              }
        }
    }];
    let gaugeLayout = {
        width: 600,
        height: 500,
        margin: { t: 25, r: 25, l: 25, b: 25 },
        
        paper_bgcolor: "aquamarine",
        font: { color: "Magenta", family: "Arial" }
    };
    Plotly.newPlot("gauge", gaugeChart, gaugeLayout);
  
  
  }
          
  

d3.selectAll("#selDataset").on("change", metaChange);