
function init() {

    // Get Data Set
        
    const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
        
    d3.json(url).then(function(data) {
        data = data;
        
        console.log(data);
        
    let names = Object.values(data.names);
        console.log(names)

    // Get Metadata

    let metadata = Object.values(data.metadata[0]);
    console.log(`Metadata`)
    console.log(metadata)

    // Get Sample Values

    let sampVal = Object.values(data.samples[0].sample_values);
        console.log(`Sample Values`);
        console.log(sampVal);
    
    // Get OTU ID's
        
    let otuIDs = Object.values(data.samples[0].otu_ids);
        console.log(`OTU ID's`);
        console.log(otuIDs);
    

        let otuLabels = Object.values(data.samples[0].otu_labels);
        console.log(`OTU Labels`);
        console.log(otuLabels);
  
    
// Populate the dropdown from the list/array
    let selector = d3.select("#selDataset");
    for (let i = 0; i < names.length; i++){
    console.log(data[names[i]])
    selector.append("option").text(names[i]).property("value", names[i]);
    }

    d3.select("#sample-metadata").html(displayMeta(metadata));

    displayMeta(metadata)
    displayBar(sampVal, otuIDs)
    displayBubble(otuIDs, sampVal, otuLabels)
    displayWashing(metadata)
})};

function optionChanged(){
    const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
        
    d3.json(url).then(function(data) {
        let menu = d3.select("#selDataset");
        let dataset = menu.property("value");
        console.log(`user selected ${dataset}`);

       
        let newData = data.samples.find(sample => sample.id === dataset);
        if (newData) {
            let newSamp = newData.sample_values;
            let newOtu = newData.otu_ids;
            let newLabels = newData.otu_labels;
            
           
            let x = newSamp.slice(0,10).reverse();
            let y = newOtu.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();
            displayBar(newSamp, newOtu);
            displayBubble(newOtu, newSamp, newLabels);
        } 
    });
}

function displayBar(sampVal, otuIDs) {
    console.log("displaybar")
    let x = sampVal.slice(0,10).reverse();
    let y = otuIDs.slice(0,10).map(otuID => `OTU ${otuID}`).reverse();
    console.log(x)
    console.log(y)  
    let barChart = [{
        x: x,
        y: y,
        type: "bar",
        orientation: "h",
        marker : {
            color: "#c242f5"
        }
       
    }];

    let barLayout = [{
        title: "Top 10 Belly Bacts",


        margin: { t: 30, l: 150 },
        paper_bgcolor: "lavender"
    }];

    Plotly.newPlot("bar", barChart, barLayout);

  }

function displayBubble(otuIDs, sampVal, otuLabels) {
    
    // Since the bubble chart displays all of the bacterium found in the belly button, 
    
        let a = otuIDs;
        let b = sampVal;
        let text = otuLabels;
        let marker_size = sampVal;
        let marker_color = otuIDs 
    
        console.log(text)
    
        let bubbleChart = [{
            x: a,
            y: b,
            text: text,
            mode: "markers",
            marker: {
                size: marker_size,
                color: marker_color,
                colorscale: 'Picnic', 
            }
        }];
    
        let bubbleLayout = [{
            title: "Top 10 Belly Bacts",
           
            xaxis:{
                title: "OTU-IDs"
            },
            showlegend: true,
            paper_bgcolor: "lavender",
            height: 700,
            width: 1500,
        }];
    
        Plotly.newPlot("bubble", bubbleChart, bubbleLayout);
    }

    function displayMeta(metadata){let demo = "";
    Object.entries(metadata).forEach(([key, value]) => demo += `<br>${key}: ${value}<br>`)
    return demo;
        }
init()      
   d3.selectAll("#selDataset").on("change", optionChanged);   

        
