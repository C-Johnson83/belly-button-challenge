// Get the Data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
d3.json(url).then(function(data) {
// Get Metadata
let metadata = Object.values(data.metadata[0]);
  displayWashing(metadata)
});
function metaChange(){
      // Get the Data
  const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
  d3.json(url).then(function(data) {
      // Get Metadata
  let menu = d3.select("#selDataset");
  let dataset = menu.property("value");
  let newMetadata = data.metadata.find(meta => meta.id === dataset);
  if (newMetadata) {
      displayWashing(newMetadata),
      displayNewMeta(newMetadata);
  }
  }
  )
};
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
              value: value
            }
      }
  }];
  let gaugeLayout = {
      width: 600,
      height: 500,
      margin: { t: 25, r: 25, l: 25, b: 25 },
      // paper_bgcolor: "aquamarine",
      font: { color: "Magenta", family: "Arial" }
  };
  Plotly.newPlot("gauge", gaugeChart, gaugeLayout);
}
function displayNewMeta(newMetadata){
  let demo = "";
  Object.entries(newMetadata).forEach(([key, value]) => demo += `<br>${key}: ${value}<br>`)
  return demo;}