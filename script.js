var dataset;
var mapData;
var yrec = {year: '1975', states: [{state_name: 'United States', state_cd: 'US', population: 0, incarcerationRate: 0, inmates: 0, state_id: 0}]};
var srec = {state_name: 'test', state_cd: 'zz', state_id: 0, years: [{year: '1975', population: 0, incarcerationRate: 0, inmates: 0}]};
var USArec = {state_name: 'United States', state_cd: 'US', state_id: 0, years: [{year: '1975', population: 0, incarcerationRate: 0, inmates: 0}]};
var bin = {state_name: 'line bin', state_cd: 'bin', state_id: 52, years: [{year: '1975', population: 0, incarcerationRate: 0, inmates: 0, populationPct: 0, inmatesPct: 0}]};
var maxIncarcerationRate = 0, binProcessing=false;;
const federal_state_id=57;

var svgSpace;
const svgSpace1='#section1';
const svgSpace2='#section2';
const svgSpace3='#section3';
const w_FullSize = 1920; // max width for my monitor
//const w_FullSize = 1860;   // working width is w_Sec1 + w_Sec2
const h_FullSize = 790;    //
const w_Sec1 = 700;  //Top left section
const h_Sec1 = 320;
//const w_Sec2 = 800;  //Right section
const w_Sec2 = 1100;  //Right section
const h_Sec2 = h_FullSize;
const w_Sec3 = 700;  //Lower left section
const h_Sec3 = 350;
const w_Sec4 = 245;  //Right section
const h_Sec4 = h_FullSize;


const overColor="LightGrey";
//var colors10=["Black","Blue","Purple","DarkGray","Green","Cyan","Magenta","DarkOrange","Red","Gold"];
var colors10=["Indigo","Blue","Purple","Brown","Green","Cyan","Magenta","DarkOrange","Red","Gold"];

// Current State variables these are updated when mouse cursor lands on a new state
var state_name="", state_id=0, state_cd="", incarcerationRate="0", population="0", inmates="0", curYear=1900, startYear=1978, endYear=2014;
//For race analysis
var totalWhite, totalBlack, totalOther, totalWhitePrison, totalBlackPrison, totalOtherPrison, WhitePctPop, BlackPctPop, OtherPctPop, WhitePctPrison, BlackPctPrison, OtherPctPrison;
var incarcerationRate_black, incarcerationRate_white, incarcerationRate_other;
var icons;
var gridData, gridDataLoaded=0;
var raceImage="prison", raceImageFirstTime=1;


var dateRec = [" "];  // for passing in labels for x axis

var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
   var margin = {top: 20, right: 20, bottom: 30, left: 35};

    var svg_line, svg_note;
    var svg_lineArray=[];     // State lines
    var secNoteSpaceActive=1;
    var svg_lineNum=0;
    var svg_lineNum2=0;       // Special lines, e.g. U.S.A.
    var svg_lineMode="add";   //add or subtract lines


    var w_Sec;
    var h_Sec;

    // for resizing section 2
    var w_ScaleDown=1;
    if (x < w_FullSize) {
      w_ScaleDown=(x/w_FullSize);
    }



    //by defining svg 1 globally we don't need to drop it and create it each time we change years
    var svg = d3.select(svgSpace1).classed('chart', true).append('svg')
        .attr('width', w_Sec1)
        .attr('height', h_Sec1)
        .attr("stroke", "#AAAAAA");

//  var myButton0 = document.querySelector("#button0");
  var myButton1 = document.querySelector("#button1");
  var myButton20 = document.querySelector("#button20");
  var myButton101 = document.querySelector("#button101");
  var myButton102 = document.querySelector("#button102");
  var myButtonClose = document.querySelector("#buttonClose");
  var myYearList = document.querySelector("#yearList");
  var sec1Heading = document.querySelector('#explain1');
  var sec1Directions = document.querySelector('#directions1');
  var sec2Heading = document.querySelector('#explain2');
  var sec2Directions = document.querySelector('#directions2');
  var sec3Heading = document.querySelector('#explain3');
  var sec3Directions = document.querySelector('#directions3');
  var sec4Heading = document.querySelector('#explain4');
  var sec4Directions = document.querySelector('#directions4');

  var myParagraph = document.querySelector("#explain1");
  //myButton0.disabled=0;
  myButton1.disabled=0;

  //const displayBar = 0;
  //const displayLine = 1;

  const map_id = 0;
  const barChart_id = 1;
  const lineChart_id = 2;
  const grid_id = 3;
  var sec_apps=[1,3,2,0];   // for indicating what app is running in what section.  The default now is section 0, app 1, section 1,app 2 section 2, app 3

/*
  myButton0.onclick = function() {
    var inSpace=2;

    sec_apps[barChart_id] = 3;    //Turn on bar chart
    //sec_apps[grid_id] = 0;  // Turn off male female

    updateApps(barChart_id);


    //Refresh;

    srec_fill("United States");
    setCurrentState(0);
    svg_lineNum=0;  // Refreshes Line Chart
    //updateApps(lineChart_id);
    secNoteSpace_refresh(secNoteSpaceActive);
    updateApps(barChart_id);

  }*/
  myButtonClose.onclick = function() {
    //Refresh;
     //secNoteSpaceActive=((secNoteSpaceActive===1) ? 0 : 1);

     if (secNoteSpaceActive===1) {
       secNoteSpaceActive=0;
     }
     else {
       secNoteSpaceActive=1;
       secNoteSpaceActive=( (w_ScaleDown < .68) ? 0 : 1);
     }

     updateApps(lineChart_id);;
     updateApps(grid_id);

     //.attr("id",("dum"+svg_lineNum));
     //element.removeChild(child);
     //("dum"+svg_lineNum)
  }
  myButton1.onclick = function() {
    //setQueryType(displayLine);
    //srec_fill("United States");
    //svg_lineNum=0;  // Refreshes Line Chart
    //updateApps(lineChart_id);
    //updateApps(barChart_id);

    // if you put it in space 2, then you want to close note window first.
    //secNoteSpaceActive=0;
    //secNoteSpace_refresh(secNoteSpaceActive);
    setCurrentState(57);
    popUpBox2({id:57}, 57);
  }


  myButton101.onclick = function() {

    var varHeading = "Black Americans 5 times more likely to go to prison";
    var inSpace=2;


    if (raceImageFirstTime===1) {
      // Set defaults
       svgSpace_set(inSpace, grid_id);

       raceImage="pop";
       var varDirections = "Below is the break down of Black Americans in the general population.  Click again on the 'Black and White' button to see how race breaks down in prison.  Click on the icons of the differnent racial groups to see their incarceration rate.";

       var newYear="2014";  // We are only working with data frim 2014 so set the state of the app to that year
       myYearList.value=newYear;
       yrec_fill(newYear);
       StateMap(mapData);
       //drawGraph_Line_refresh();
       setCurrentState(0);
       sec1Heading.innerHTML = "Map now showing Incarceration Rate for " + newYear;
       sec1Directions.innerHTML = "In " + newYear + " the incarceration rate for the United States was " + incarcerationRate + " per 100,000.  The population was " + population.toLocaleString('en-US') + ". There were " + inmates.toLocaleString('en-US') + " people behind bars.";

       raceImageFirstTime=0;
    }
    else {
      raceImage = raceImage==="prison" ? "pop" : "prison";
      if (raceImage==="prison") {
        var varDirections = "Below is the break down of Black Americans in prison.  Click again on the 'Black and White' button to see how race breaks down in the general population.  Click on the icons of the differnent racial groups to see their incarceration rate.";
      }
      else  {
        var varDirections = "Below is the break down of Black Americans in the general population.  Click again on the 'Black and White' button to see how race breaks down in prison.  Click on the icons of the differnent racial groups to see their incarceration rate.";
       }
    }

    secTextUpdate(inSpace, varHeading, varDirections)
    updateApps(grid_id);

  }

  myButton102.onclick = function() {
    svgSpace_set(2, lineChart_id);
    secNoteSpaceActive=1;
    updateApps(lineChart_id);
    raceImageFirstTime=1;  //reset race viz
  }

  myButton20.onclick = function() {
      binProcessing= (binProcessing===false) ? true : false;
      updateApps(lineChart_id);
/*
    srec_fill("United States");
    setCurrentState(0);
    updateApps(lineChart_id);
    updateApps(barChart_id);
*/
    //updateApps(maleFemale_id);
  }

  myYearList.onclick = function() {
    //var state_name1=myStateList.value;

    var newYear=myYearList.value;

    yrec_fill(newYear);
    StateMap(mapData);

    setCurrentState(0);
    sec1Heading.innerHTML = "Map now showing Incarceration Rate for " + curYear + ".";
    sec1Directions.innerHTML = "In " + curYear + " the incarceration rate for the United States was " + incarcerationRate + " per 100,000.  The population was " + population.toLocaleString('en-US') + ". There were " + inmates.toLocaleString('en-US') + " people behind bars.";
    secNoteSpace_refresh();
    //updateApps(lineChart_id);
  }


  window.addEventListener('resize', refreshGraph);

  function refreshGraph(){
    x = w.innerWidth || e.clientWidth || g.clientWidth;
    if (x < w_FullSize) {
      w_ScaleDown=(x/w_FullSize);
    }
    else {
      w_ScaleDown=1;
    }


    if (w_ScaleDown < .68) {
      secNoteSpaceActive=0;
    }
    updateApps(lineChart_id);
    updateApps(grid_id);

  }


  LoadData();  // Loads all of our application data

  StateMap_LoadAndRun();


// Queuing up asynchronous data loading. Convenient when you've got more than
// one file you want to load.

function StateMap_LoadAndRun(){
    d3.queue()
    //.defer(d3.json, "./statedata.json")
        .defer(d3.json, "./us.json")
        .await(ready);

// The ready function is called when our data files have finished loading.
// In this instance it takes 3 arguments:
// error -- which if will throw and error if there are problems with our data
// map -- which contains the GeoJson mapping of the world's countries
}

function ready(error, map) {
  if (error) throw error;

  mapData=map;  // save data so we don't have to keep reading it in

  // call our map making function with the data we've loaded in from our scores.json file & our world map file
  StateMap(mapData);


  sec_apps[barChart_id] = 3;

  setCurrentState(0);
  updateApps(lineChart_id);
  updateApps(barChart_id);

  sec1Heading.innerHTML = "Map now showing Incarceration Rate for " + curYear + ".";
  sec1Directions.innerHTML = "In " + curYear + " the incarceration rate for the United States was " + incarcerationRate + " per 100,000.  The population was " + population.toLocaleString('en-US') + ". There were " + inmates.toLocaleString('en-US') + " people behind bars.";

}


function StateMap(map) {

  var margin = {top: 5, right: 20, bottom: 20, left: 25},
      width = w_Sec1 - margin.left - margin.right,
      height = h_Sec1 - margin.top - margin.bottom;


  //function to transform incarcerationRates into colors
  var color = d3.scaleLinear().domain([0, maxIncarcerationRate]).range(["LemonChiffon", "DarkRed"]);

  var w = 310;
  var h = 175;

  var projection = d3.geoAlbersUsa()
      .scale(660)
      .translate([w, h]);

  var path = d3.geoPath()
      .projection(projection);

  let countries = topojson.feature(map, map.objects.states).features;

  //placeholder for mouse coords, updated when we movemouse over a country
  let coordinates = [0, 0];

  svg.selectAll(".state")
    .data(countries).enter()
    .insert("path")
    .attr("d", path)
    .style("fill", (d) => { //nice JS6 way 'arrow syntax' for doing anonymous functions
        setCurrentState(d.id);
        return (color(incarcerationRate)); })
    .on("click", popUpBox2)
    .on('mouseover', overFunc)
    .on('mouseleave', outFunc)
    .on("mouseout",function(d){d3.selectAll("#Inmates").transition().duration(100).remove();});


  //handle mouseovers - just adds text for countries associated with data & turns country color white
  function overFunc(d, i) {

    //update mouse coordinates
    coordinates = d3.mouse(this);

    //check if we are over a country that is in our json file
    d3.select(this).style('fill', overColor);

    if (d.id > -1) {

      svg.selectAll(".state")
        .data(countries)
        .enter()
        .append("text")
        .text(
            d2 => { //nice JS6 way 'arrow syntax' for doing anonymous functions
                setCurrentState(d.id);
                return (state_name + "("+incarcerationRate+")");
            }
            )
        .attr("x", coordinates[0])
        .attr("y", coordinates[1] - 10)
        .attr("text-anchor","middle")
        .attr("dy","-40")
        .attr('font-size','15px')
        .attr("fill", "black")
        .attr("stroke-width", "0px")
        //.attr("font-family","Brown,helvetica,sans-serif") //I like this "Brown" font, if you don't have it, back up to helvetica or a sans-serif!
    }
  };


  //handle mouseleaves - removes text and returns to default color

  function outFunc(d) {
    d3.select(this).style('fill', d => {
        setCurrentState(d.id);
        return (color(incarcerationRate)); });

    if (d.id > -1) {
      svg.selectAll("text").remove();
    }

  };

} // End of StateMap(map)



function popUpBox2(d, i) {
//setCurrentState(d.id);

  var svg_currentLine=-1, colorNum=0;
  if (svg_lineMode==="add") {
    for (var i = 0; i < svg_lineArray.length; i++) {
        if (svg_lineArray[i].state_id===state_id) {
            //delete
            svg_currentLine=i;
            break;
        }
    }

    if (svg_currentLine!=-1) {   // delete them from the array and re-add
      svg_lineArray.splice(svg_currentLine, 1);
    }

    if (svg_lineArray.length===0) {
      colorNum = 0;
    }
    else {
      colorNum = (svg_lineArray[(svg_lineArray.length-1)].colorNum + 1) % 10;      //Grap next element in color array
    }
    svg_lineArray.push({state_id: state_id, colorNum:colorNum});

    svg_lineNum = svg_lineArray.length-1;  // reset

  }   // Need to add svg_lineMode==="subtract"

srec_fill(state_name);
updateApps(barChart_id);

    updateApps(lineChart_id);
}   // End of popUpBox2(d, i)





function LoadData() {

  var addTotalRec = 0;  // boolean variable used for aggregating data

  d3.csv("Prisondata_byYearAndState.csv", function(data) {

  //Hand CSV data off to global var,
  dataset = data.concat();

  for (var i = 0; i < dataset.length; i++) {

     addTotalRec = 1;
     for (var l = 0; l < dateRec.length; l++) {
        if (dateRec[l].trim()===dataset[i].Year.toString()) {
            addTotalRec=0;
            break;
        }
      }

      if (addTotalRec === 1) {
         dateRec.push(dataset[i].Year);
     }


      if(maxIncarcerationRate < parseFloat(dataset[i].IncarcerationRate)){
         maxIncarcerationRate=parseFloat(dataset[i].IncarcerationRate);
      }


  }  // End of Dataset processing loop

  var i = Math.round(maxIncarcerationRate/100);
  maxIncarcerationRate=i*100;

  for (var i = dateRec.length-1; i >= 0; i--) {
    addYearToList(dateRec[i]);
   }

  yrec_fill("2014");
  srec_fill("United States");

  });    // End of d3.csv("Project1.csv", function(data) {



    d3.csv("PrisonDataRace5.csv", function(data) {
    //Hand CSV data off to global var,
      raceData = data.concat();

      for (var i = 0; i < raceData.length; i++) {

          if (raceData[i].Year.toString()==='2014') {

            totalWhite=raceData[i].White;
            totalBlack=raceData[i].Black;
            totalOther=raceData[i].OtherPop;
            totalWhitePrison=raceData[i].WhitePrison;
            totalBlackPrison=raceData[i].BlackPrison;
            totalOtherPrison=raceData[i].OtherPrison;
            WhitePctPop=raceData[i].WhitePctPop;
            BlackPctPop=raceData[i].BlackPctPop;
            OtherPctPop=raceData[i].OtherPctPop;
            WhitePctPrison=raceData[i].WhitePctPrison;
            BlackPctPrison=raceData[i].BlackPctPrison;
            OtherPctPrison=raceData[i].OtherPctPrison;

          }

        } // dataset[i] loop

        incarcerationRate_black=Math.round(totalBlackPrison*100000/totalBlack);
        incarcerationRate_white=Math.round(totalWhitePrison*100000/totalWhite);
        incarcerationRate_other=Math.round(totalOtherPrison*100000/totalOther);

/*
console.log("WhitePctPrison: " + WhitePctPrison);
        console.log("BlackPctPrison: " + BlackPctPrison);
        console.log("OtherPctPrison: " + OtherPctPrison);

*/

    });    // End of d3.csv("PrisonDataRace5.csv", function(data)



         var q = d3.queue(3)
         .defer(d3.xml, "images/BlackPop.svg")
         .defer(d3.xml, "images/OtherPop.svg")
         .defer(d3.xml, "images/WhitePop.svg")
         .defer(d3.xml, "images/BlackPrison.svg")
         .defer(d3.xml, "images/OtherPrison.svg")
         .defer(d3.xml, "images/WhitePrison.svg")
         .awaitAll(function (error, results) {
/*
             console.log("Error: " + error);
             console.log("files: " + results[1] + ", " + results[2] + ", " +  results[3] + ", " + results[4] + ", " + results[5] + ", " +  results[0]);
*/
             icons=results;
        });



}        // End main data load routine


function setCurrentState(inState_id) {

      if (inState_id.toString()===state_id.toString()) {
        return state_name;
      }


      for (var i = 0; i < yrec.states.length; i++) {

          if (inState_id.toString()===yrec.states[i].state_id.toString()) {
            state_name=yrec.states[i].state_name;
            state_id=yrec.states[i].state_id;
            state_cd=yrec.states[i].state_cd;
            population=yrec.states[i].population;
            incarcerationRate=yrec.states[i].incarcerationRate;
            inmates=yrec.states[i].inmates;
            break;
          }
        }

        return state_name + "("+incarcerationRate+")";

    } // end of function


    function srec_getYear(inState_id, inYear) {

          if (inState_id.toString()!=srec.state_id.toString()) {
               if (! srec_fill_state_id(inState_id)) {
                 return returnYear;
               }
          }

          var returnYear = {year: '1900', population: 0, incarcerationRate: 0, inmates: 0};

          for (var i = 0; i < srec.years.length; i++) {

              if (inYear.toString()===srec.years[i].year.toString()) {
                returnYear=srec.years[i];
                break;
              }
          }

          return returnYear;

}



function yrec_fill(inYear) {


  if (yrec.year != inYear) {
      yrec.year=inYear;
      curYear=inYear;


      yrec.states.splice(0,yrec.states.length);  // purge state data


      for (var i = 0; i < dataset.length; i++) {

          if (dataset[i].Year.toString()===inYear) {
            yrec.states.push({});
            var k=yrec.states.length-1;
            yrec.states[k].state_name=dataset[i].state_name;
            yrec.states[k].state_cd=dataset[i].state_cd;                       // state abbreviation
            yrec.states[k].state_id=dataset[i].state_id;                       // state abbreviation
            yrec.states[k].population=parseInt(dataset[i].Population);
            yrec.states[k].incarcerationRate=parseInt(dataset[i].IncarcerationRate);
            yrec.states[k].inmates=parseInt(dataset[i].Inmates);                         // number of inmates
          }
        } // dataset[i] loop

      }
    } // end of function




    function srec_fill(inState) {
      if (inState==="United States") {
        myButton20.disabled=1;
      }
      else {
        myButton20.disabled=0;
      }


      if (srec.state_name!=inState) {
        srec.state_name=inState;

        srec.years.splice(0,srec.years.length);  // purge state data
          for (var i = 0; i < dataset.length; i++) {
            if (dataset[i].state_name.trim()===inState.trim()) {
                srec.years.push({});
                var k=srec.years.length-1;
                srec.years[k].year=dataset[i].Year;
                srec.years[k].population=dataset[i].Population;
                srec.years[k].incarcerationRate=dataset[i].IncarcerationRate;
                srec.years[k].inmates=dataset[i].Inmates;
                if (k===0) {
                  srec.state_cd=dataset[i].state_cd;
                  srec.state_id=dataset[i].state_id;
               // state mapping ID
                }
            }
          } // dataset[i] loop

      }

    } // end of function






    function srec_fill_state_id(inState_id) {

      var retVal=true;

      if (srec.state_id!=inState_id) {
        srec.state_id=inState_id;

        srec.years.splice(0,srec.years.length);  // purge state data

        for (var i = 0; i < dataset.length; i++) {
            if (inState_id.toString()===dataset[i].state_id.toString()) {
                srec.years.push({});
                var k=srec.years.length-1;
                srec.years[k].year=dataset[i].Year;
                srec.years[k].population=dataset[i].Population;
                srec.years[k].incarcerationRate=dataset[i].IncarcerationRate;
                srec.years[k].inmates=dataset[i].Inmates;
                if (k===0) {
                  srec.state_cd==dataset[k].state_cd;
                  srec.state_name=dataset[k].state_name;
               // state mapping ID
                }
            }
          } // dataset[i] loop

          retVal = srec.years.length > 10 ? true : false;
      }

      return retVal;
    } // end of function





        function srec_fill2(inState_id, inRec) {

          var retVal=true
          if (inState_id===0) {  // U.S.A. line

          }
          else if (inState_id===52) {   // binState_id line
              // fill array for first element in svg_lineArray[0] and then call routine to add in the rest
              inState_id=svg_lineArray[0].state_id;
              //binProcessing=true;
              console.log("In srec_fill2: binProcessing ... inRec.state_id = " + inRec.state_id + ", inState_id =" + inState_id)

          }
          else {   // state line

          }



              inRec.state_id=inState_id;
              console.log("srec_fill2: inState_id=" + inState_id + ",  state_id=" + state_id);

              inRec.years.splice(0,inRec.years.length);  // purge state data

            for (var i = 0; i < dataset.length; i++) {
                if (inState_id.toString()===dataset[i].state_id.toString()) {
                    inRec.years.push({});
                    var k=inRec.years.length-1;
                    console.log("srec_fill2: filling inRec, i=" + i + ", k="+ k);
                    inRec.years[k].year=dataset[i].Year;
                    inRec.years[k].population=parseInt(dataset[i].Population);
                    inRec.years[k].incarcerationRate=parseInt(dataset[i].IncarcerationRate);
                    inRec.years[k].inmates=parseInt(dataset[i].Inmates);
                    if (k===0) {
                      inRec.state_cd=dataset[k].state_cd;
                      inRec.state_name=dataset[k].state_name;
                   // state mapping ID
                    }
                }
              } // dataset[i] loop

              retVal = inRec.years.length > 10 ? true : false;

              if (binProcessing===true) {
                console.log("srec_fill2: drawGraph_LineBin(inRec)");
                drawGraph_LineBin(inRec);
              }


          return retVal;
        } // end of function





        function addYearToList(inYear) {
        var sel = document.getElementById("yearList");
        var opt = document.createElement("option");
          opt.value = inYear;
          opt.text = inYear;

          sel.add(opt, null);

        }






        function drawGraph_BarChart(inSpace) {
          svgSpace_set(inSpace, barChart_id);

          var margin = {top: 20, right: 10, bottom: 20, left: 30};
          //var margin = {top: 20, right: 20, bottom: 70, left: 50},
          var width = w_Sec-margin.right-margin.left;
          var height = h_Sec-margin.top-margin.bottom;


          var iYears=[];
          for (var i = 0; i < srec.years.length; i++) {
            iYears.push({year: 1975, incarcerationRate: 0});
            iYears[i].year=parseInt(srec.years[i].year);
            iYears[i].incarcerationRate=parseInt(srec.years[i].incarcerationRate);
          }
          //var parseTime = d3.timeParse("%y");
          const barScale = .978;
          var barPadding = 1;
          var numberOfBars = srec.years.length;  // = Number of time periods being processed
          var biggestValue =maxIncarcerationRate;
          var color = d3.scaleLinear().domain([0, maxIncarcerationRate]).range(["LemonChiffon", "DarkRed"]);

          var varHeading="", varDirections="";


          // horizontal scale for data and the other for displaying the xAxis
          var xScale = d3.scaleLinear().domain([0, numberOfBars]).range([0, width]);
          var xAxis = d3.axisBottom(xScale)
                        .ticks(numberOfBars)
                        .tickPadding([15])
                        .tickFormat(function(d) { return dateRec[d].substring(2); });   // Dates that are displayed at the bottom of each column

          var x = d3.scaleLinear().domain(d3.extent(iYears, function(d) { return d.year; }) ).range([0, width]);


          var yScale = d3.scaleLinear().domain([0, biggestValue]).range([height, 0]);
          var yAxis = d3.axisLeft(yScale).ticks(9);

          var y = d3.scaleLinear().range([height, 0]).domain([0, biggestValue]);


          d3.select(svgSpace).select('svg').remove();  //first clear away the old graph

          var svg = d3.select(svgSpace).classed('chart', true).append('svg')
              .classed('navigator', true)
              .attr('width', width+margin.right+margin.left)
              .attr('height', height+margin.top+margin.bottom)
              //.attr("stroke", "#AAAAAA")
              //.append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
              //.attr("transform", "translate(" + margin.left + "," + margin.top + ")scale(.95, .9)");




             svg.selectAll("rect")
                .data(iYears)
                .enter()
                .append("rect")
                .attr("x", function(d) { return x(d.year)*barScale; })
                .attr("width", ((width/numberOfBars)-barPadding)*barScale)
                .attr("y", function(d) { return y(d.incarcerationRate); })
                .attr("height", function(d) { return height - y(d.incarcerationRate); })
                .attr("fill", function(d) { return color(d.incarcerationRate); })
                .on("click", function(d){
                  var newYear=d.year.toString();
                  yrec_fill(newYear);
                  StateMap(mapData);
                  myYearList.value=d.year.toString();
                  secNoteSpace_refresh();

                  updateApps(lineChart_id);
                  updateApps(grid_id);
                  setCurrentState(0);
                  sec1Heading.innerHTML = "Map now showing Incarceration Rate for " + newYear;
                  sec1Directions.innerHTML = "In " + newYear + " the incarceration rate for the United States was " + incarcerationRate + " per 100,000.  The population was " + population.toLocaleString('en-US') + ". There were " + inmates.toLocaleString('en-US') + " people behind bars.";

                  });


              //------------------------------------------
              // display value on top of column
              //------------------------------------------
              svg.selectAll("text")
                   .data(iYears)
                   .enter()
                   .append("text")
                   .text(function(d) {
                      return Math.round(d.incarcerationRate);
                   })
                  .attr("text-anchor", "middle")
                  .attr("x", function(d) { return (x(d.year)*barScale)+9; })
                  .attr("y", function(d) { return y(d.incarcerationRate)+10; })
                   .attr("font-family", "sans-serif")
                   .attr("font-size", "11px")
                   .attr("fill", "white");



               svg.append("g")
                 .attr("class", "axis")
                 .attr("transform", "translate(0," + height + ")")
                 .call(xAxis)
                 .selectAll("text")
                 .style("text-anchor", "end")
                 .attr("dx", "-.8em")
                 .attr("dy", "-.55em");

              svg.append("g")
                  .attr("class", "axis")
                  .call(yAxis);

                  if (srec.state_name==="United States") {
                    varHeading = srec.state_name + " Incarceration Rate History.";
                    varDirections = "Click on bars to update map, to see how states contributed to the country's rising incarceration rate.  Click on states to see their histories.";
                  } else {
                    varHeading = srec.state_name + "'s Incarceration Rate History.";
                    varDirections = "Click on bars to update map, and see how the other states incarceration rates looked for that year. Then click on a state to view their history.";
                  }


                  secTextUpdate(inSpace, varHeading, varDirections);

        }  // drawGraph_BarChart




        function drawGraph_Line(inSpace, in_LineNum, supressNotes) {

          // Which svg space are we using?
          svgSpace_set(inSpace, lineChart_id);

          var margin = {top: 20, right: 20, bottom: 20, left: 30};
          //var margin = {top: 20, right: 20, bottom: 70, left: 50},
          var width = w_Sec-margin.right-margin.left;
          var height = h_Sec-margin.top-margin.bottom;

          var svg;
          var varHeading="", varDirections="";


          var svg_colorNum, lcolor, lcolor_saturation, lclass, numLines=0, lineRec;

          if (srec.state_name==="United States" || state_id===0) {
            state_id=0;
          }


          if (state_id===0) {
            // drawing U.S.A. line
            lineRec=srec;
            lcolor="Black";
            lcolor_saturation = 1;
            lclass="lineBold";
            ++svg_lineNum2;

            if (svg_lineNum===0) {
              numLines=svg_lineNum2;
            }
            else {
              numLines=svg_lineNum+svg_lineNum2+1;
            }

          }
          else if (state_id===52) {
            // drawing U.S.A. line
            lineRec=bin;
            //lcolor="DarkSlateGray";
            lcolor="DarkRed";
            lcolor_saturation = .6;
            lclass="lineDashedBold";
            ++svg_lineNum2;
            numLines=svg_lineNum+svg_lineNum2+1;
          }
          else {
            lineRec=srec;
            svg_colorNum=svg_lineArray[svg_lineNum].colorNum;
            lcolor=colors10[svg_colorNum];
            lcolor_saturation = ((svg_lineArray.length) - svg_lineNum) <=10 ? .7 : .1;
            lclass="line";
            numLines=svg_lineNum+svg_lineNum2+1;
          }





          //console.log("In Line Graph: svg_lineNum="+ svg_lineNum + ", numLines="+ numLines + ", state_id="+ state_id);

          if (in_LineNum===0) { // Starting Fresh
            d3.select(svgSpace).select('svg').remove();  //first clear away the old graph

            svg = d3.select(svgSpace).classed('chart', true).append('svg')
                .classed('navigator', true)
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                console.log("In svg_graph_line 2: svg_lineNum=" + svg_lineNum + ", in_LineNum" + in_LineNum + ",  state_id=" + state_id);

                //.attr("transform", "translate(" + margin.left + "," + margin.top + ")scale(" + (scaleXdown) + ", .7)");
          }
          else {
            svg = svg_line;
          }

          if (lineRec.state_name==="United States") {
            varHeading = lineRec.state_name + " Incarceration Rate History.";
          } else {
            varHeading = "Just added " + lineRec.state_name + "'s History.";
          }

          if (numLines>1) {
            varDirections = "Click on a state to add its history to the graph.  You have " +  (numLines) + " histories so far.";
          } else {
            varDirections = "Click on a state to add its history to the graph.  You have " +  (numLines) + " history so far.";
          }



          var iYears=[];
          for (var i = 0; i < lineRec.years.length; i++) {
            iYears.push({year: 1975, incarcerationRate: 0});
            iYears[i].year=parseInt(lineRec.years[i].year);
            iYears[i].incarcerationRate=parseInt(lineRec.years[i].incarcerationRate);
            //console.log("iYears[i].year: "+ iYears[i].year + ", iYears[i].incarcerationRate: "+ iYears[i].incarcerationRate + ", i: " + i);
          }
          //var parseTime = d3.timeParse("%y");
          var numberOfDataPoints = lineRec.years.length;  // = Number of days being processed
          var biggestValue =maxIncarcerationRate;


          var line = d3.line()
              .x(function(d) { return x(d.year); })
              .y(function(d) { return y(d.incarcerationRate); });



          if (in_LineNum===0) { // Starting Fresh
            var xScale = d3.scaleLinear().domain([0, numberOfDataPoints]).range([0, width]);
            var xAxis = d3.axisBottom(xScale)
                          .ticks(numberOfDataPoints)
                          .tickPadding([15])
                          .tickFormat(function(d) { return dateRec[d].substring(2); });   // Dates that are displayed at the bottom of each column


            var yScale = d3.scaleLinear().domain([0, biggestValue]).range([height, 0]);
            var yAxis = d3.axisLeft(yScale)
              .ticks(9);

            svg.append("g")
               .attr("class", "axis")
               .attr("transform", "translate(0," + height + ")")
               .call(xAxis)
               .selectAll("text")
               .style("text-anchor", "end")
              .attr("dx", "-.8em")
              .attr("dy", "-.55em");


            svg.append("g")
            .attr("class", "axis")
            .call(yAxis);
          }

          var x = d3.scaleLinear().domain(d3.extent(iYears, function(d) { return d.year; }) ).range([0, width]);

          var y = d3.scaleLinear().range([height, 0]).domain([0, biggestValue])

          svg.append("path")
              .datum(iYears)
              .attr("class", lclass)
              .attr("d", line)
              .style("stroke", lcolor)
              .style("opacity", lcolor_saturation);
              //.on("click", function(x){console.log("clicked on line, year=" + x);});

          svg.append("text")
              .attr("transform", "translate(" + (width+2) + "," + y(iYears[iYears.length-1].incarcerationRate) + ")")
              .attr("dy", ".35em")
              .attr("text-anchor", "start")
              .attr("font-family", "sans-serif")
              .attr("font-size", "11px")
              .style("fill", lcolor)
              .style("opacity", lcolor_saturation)
              .text(lineRec.state_cd);

          /*
            svg.on("click", function() {
                var coords = d3.mouse(this);

                // Normally we go from data to pixels, but here we're doing pixels to data
                var newData = {
                    x: Math.round(xScale.invert(coords[0])),  // Takes the pixel number to convert to number
                    y: Math.round(yScale.invert(coords[1]))
                };

                var xStart = Math.max(newData.x - (lticks_x / 2), 0), xEnd = Math.min(newData.x + (lticks_x / 2), riverData[curRiverNum].z_interp.length-1);
                riverSection = ((xStart) + " meters to " + xEnd + " meters");
                myDataList2.value = riverSection;

                drawRiverSection(2, xStart, xEnd);

            });
*/


              secTextUpdate(inSpace, varHeading, varDirections);

            if (secNoteSpaceActive === 1 && supressNotes!=1) {
              if (state_name==="United States") {
                secTextUpdate(4, "Notes for " + curYear, "");
                secNoteSpace("The " + state_name + " incarceration rate was " + incarcerationRate + " per 100,000.  The population was " + population.toLocaleString('en-US') + ". There were " + inmates.toLocaleString('en-US') + " people behind bars.", -1);
              }
              else {
                secTextUpdate(4, "Notes for " + curYear, "");
                secNoteSpace(state_name + "'s incarceration rate was " + incarcerationRate + " per 100,000.  The population was " + population.toLocaleString('en-US') + ". There were " + inmates.toLocaleString('en-US') + " people behind bars.", -1);
              }
            }

            svg_line=svg;
            return 1;
  }




  function drawGraph_Grid(inSpace, refresh) {

  var margin = {top: 5, right: 5, bottom: 15, left:5};
  //var margin = {top: 20, right: 20, bottom: 20, left: 30};

  svgSpace_set(inSpace, grid_id);
  //var margin = {top: 20, right: 20, bottom: 70, left: 50},
  var width = w_Sec-margin.right-margin.left;
  var height = h_Sec-margin.top-margin.bottom;

  var svg;
  var varHeading="", varDirections="";

      var barPadding = 1;
      var xAxisVerticalPadding = 10;
      var yAxisHorizontalPadding = 10;

      var w = width;
      var h = height;

      if (gridDataLoaded===0 || refresh===1) {
        gridData = gridData1(width, height);
        gridDataLoaded=1;
      }



     d3.select(svgSpace).select('svg').remove();  //first clear away the old graph


     //console.log(gridData);

     var svg = d3.select(svgSpace)
   	    .append("svg")
   	    .attr("width", w)
   	    .attr("height", h);

   	  var row = svg.selectAll("g")
               	    .data(gridData)
               	    .enter()
               	    .append("g")
                    .attr("class", "row");


      var cell = row.selectAll(".cell")
        .data(function(d) { return d; })
        .enter().append("g")
        .attr("transform", function(d, i){
   	        return "translate(" + d.x + ","
   	            + d.y + ")"
   	            +"scale("+ 0.1 +")";
   	    })
        .on("click", gridClick)
   	    .each(function(d, i){
           var plane;
           if (raceImage==="prison") {
             if (d.prisonImage==="black") {
               //console.log("PrisonImage=" + d.prisonImage);
              plane = this.appendChild(document.importNode(icons[3].documentElement, true));

             }
             else if (d.prisonImage==="white") {
               //console.log("PrisonImage=" + d.prisonImage);
               plane = this.appendChild(document.importNode(icons[5].documentElement, true));
               //plane = this.appendChild(importedNodeWhite.cloneNode(true));
             }
             else if (d.prisonImage==="other") {
               console.log("PrisonImage=" + d.prisonImage);
               //plane = this.appendChild(importedNodeOther.cloneNode(true));
               plane = this.appendChild(document.importNode(icons[4].documentElement, true));
             }
           }
           else {
             if (d.popImage==="black") {
               //console.log("PopImage=" + d.popImage);
              plane = this.appendChild(document.importNode(icons[0].documentElement, true));

             }
             else if (d.popImage==="white") {
               //console.log("PopImage=" + d.popImage);
              plane = this.appendChild(document.importNode(icons[2].documentElement, true));
               //plane = this.appendChild(importedNodeWhite.cloneNode(true));
             }
             else if (d.popImage==="other") {
               //console.log("PopImage=" + d.popImage);
               //plane = this.appendChild(importedNodeOther.cloneNode(true));
               plane = this.appendChild(document.importNode(icons[1].documentElement, true));
             }
           }

   	       d3.select(plane).select("path").attr("fill", "blue")
   	    })
        //.attr("xlink:href", "male.png")
   	    .transition()
   	    .duration(2000)
       .attr("class","cell");


  } // End of drawGraph_Grid()




  function gridClick(d, i) {
  //setCurrentState(d.id);
  var incarcerationRate

  if (raceImage==="prison"){
      if (d.prisonImage==="black") {
        varHeading = "African Americans in Prison";
        varDirections = BlackPctPop + "% of the population is African American, but they make up " + BlackPctPrison + "% of the prison population.  That's an incarceration rate for African Americans of " + incarcerationRate_black + " per 100,000.  Click on the 'Black and White' button to see how race breaks down in the general population."
      }
      else if (d.prisonImage==="white") {
        varHeading = "White Americans in Prison";
        varDirections = WhitePctPop + "% of the population is white, and " + WhitePctPrison + "% of the prison population.  That's an incarceration rate for white Americans of " + incarcerationRate_white + " per 100,000.  Click on the 'Black and White' button to see how race breaks down in the general population."
      }
      else if (d.prisonImage==="other") {
        varHeading = "Other Racial Groups in Prison";
        varDirections = OtherPctPop + "% of the population is Latino, Asian and various other races. They make up " + OtherPctPrison +  "% of the prison population.  That's an incarceration rate of " + incarcerationRate_other + " per 100,000.  Click on the 'Black and White' button to see how race breaks down in the general population."
      }

    }
    else {
        if (d.popImage==="black") {
          varHeading = "African Americans in Prison";
          varDirections = BlackPctPop + "% of the population is African American, but they make up " + BlackPctPrison + "% of the prison population.  That's an incarceration rate for African Americans of " + incarcerationRate_black + " per 100,000.  Click on the 'Black and White' button to see how race breaks down in prison."
        }
        else if (d.popImage==="white") {
          varHeading = "White Americans in Prison";
          varDirections = WhitePctPop + "% of the population is white, and " + WhitePctPrison + "% of the prison population.  That's an incarceration rate for white Americans of " + incarcerationRate_white + " per 100,000.  Click on the 'Black and White' button to see how race breaks down in prison."
        }
        else if (d.popImage==="other") {
          varHeading = "Other Racial Groups in Prison";
          varDirections = OtherPctPop + "% of the population is Latino, Asian and various other races. They make up " + OtherPctPrison +  "% of the prison population.  That's an incarceration rate of " + incarcerationRate_other + " per 100,000.  Click on the 'Black and White' button to see how race breaks down in prison."
        }

      }
   //console.log("In Click: d.popImage=" + d.popImage + ", d.prisonImage=" + d.prisonImage);

   secTextUpdate(2, varHeading, varDirections);


 }




  function returnRace(raceCounter, current) {

        if (current.number<=0) {  // Keep outputting current Race

          if (raceCounter.black>0) {
            current.race="black";
            current.number = raceCounter.black;
            raceCounter.black-=current.number;
          }
            else  if (raceCounter.other>0) {
              current.race="other";
              current.number = raceCounter.other;
              raceCounter.other-=current.number;
            }
            else {
                current.race="white";
                current.number = raceCounter.white;
                raceCounter.white-=current.number;
              }
        }

        current.number--;
        return current.race;
  }



  function gridData1(inWidth, inHeight) {
    var margin = {top: 5, right: 5, bottom: 15, left: 5};
    var data = new Array();
    var xpos = margin.left; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
    var ypos = margin.top;
    var w_cell = inWidth/10;
    var h_cell = inHeight/10;
    var click = 0;
    var fWidth = inWidth;
    var fHeight = inHeight;
    var numRows=fHeight/h_cell;
    var numColumns=fWidth/w_cell;
    var raceCounter1 = {black: BlackPctPop, white: WhitePctPop, other: OtherPctPop};
    var raceCounter2 = {black: BlackPctPrison, white: WhitePctPrison, other: OtherPctPrison};
    var current1 = {race: 0, number: 0};
    var current2 = {race: 0, number: 0};


    // iterate for rows
    for (var row = 0; row < numRows; row++) {
      data.push( new Array() );

      // iterate for cells/columns inside rows
      for (var column = 0; column < numColumns; column++) {
        data[row].push({
          x: xpos,
          y: ypos,
          width: w_cell,
          height: h_cell,
          click: click,
          prisonImage: returnRace(raceCounter2, current2),
          popImage: returnRace(raceCounter1, current1)
          //icon: icon
        })
        // increment the x position. I.e. move it over by 50 (width variable)
        xpos += w_cell;
      }
      // reset the x position after a row is complete
      xpos = margin.left;
      // increment the y position for the next row. Move it down 50 (height variable)
      ypos += h_cell;
    }

    return data;
  }




  function type(d) {
    d.year = parseTime(d.Year);
    d.incarcerationRate = d.incarcerationRate;
    return d;
  }


    function updateApps(inApp_id) {

        var inSpace=sec_apps[inApp_id];

        if (inSpace === 0) {
          return 0;     // App is not running
        }

        if (inApp_id === barChart_id) {
            //drawGraph_SunBurst(inSpace);
            drawGraph_BarChart(inSpace);
        }
        else if (inApp_id === lineChart_id) {
            drawGraph_Line_refresh();
            //drawGraph_Line(inSpace, (svg_lineNum+svg_lineNum2), 0);  // parameters (svgSpace, refresh)
        }
        else if (inApp_id === grid_id) {
            drawGraph_Grid(inSpace, 1);
        }

    }  // End



        function svgSpace_set(inSpace, inApp_id) {

          // Which svg space are we using?
          for (var i = 0; i < sec_apps.length; i++) {
             if (sec_apps[i]===inSpace) {
               sec_apps[i]=0;
               break;
             }
          }
          sec_apps[inApp_id]=inSpace;

          var i=0;
// sec_apps=[1,2,3,0];
          if (inSpace===1) {
            svgSpace=svgSpace1;
            w_Sec = w_Sec1;
            h_Sec = h_Sec1;
          }
          else if (inSpace===2){
            svgSpace=svgSpace2;
            w_Sec = w_Sec2 - ((secNoteSpaceActive === 1) ? (w_Sec4+40) : 60);
            h_Sec = h_Sec2;
            if (w_ScaleDown < 1 ) {
              i=w_FullSize-w_ScaleDown*w_FullSize;  // width that needs to be removed from w_Sec2
              /*
              if ((w_Sec2 - parseInt(i)) < 600){
                secNoteSpaceActive = 0;
              }
              */
              w_Sec = w_Sec2 - parseInt(i) - ((secNoteSpaceActive === 1) ? (w_Sec4+40) : 60);
            }

            console.log("window x=" + x + ", window y=" + y  + ", w_ScaleDown=" + w_ScaleDown  + ", w_Sec2=" + w_Sec2  + ", w_Sec=" + w_Sec + ", w_Sec4=" + w_Sec4 + ", i=" + i)

          }
          else if (inSpace===3) {
            svgSpace=svgSpace3;
            w_Sec = w_Sec3;
            h_Sec = h_Sec3;
          }

        }



        function secTextUpdate(inSpace, inHeading, inDirections) {

          // Which svg space are we using?

          if (inSpace===1) {
            sec1Heading.innerHTML = inHeading;
            sec1Directions.innerHTML = inDirections;
          }
          else if (inSpace===2){
            sec2Heading.innerHTML = inHeading;
            sec2Directions.innerHTML = inDirections;
          }
          else if (inSpace===3) {
            sec3Heading.innerHTML = inHeading;
            sec3Directions.innerHTML = inDirections;
          }
          else if (inSpace===4) {
            sec4Heading.innerHTML = inHeading;
            sec4Directions.innerHTML = inDirections;
          }

        }



        function secNoteSpace(inNote, inLine) {

          var svg_colorNum, lcolor, lcolor_saturation, id1;

/*
            d3.select("#explain5")
              .append("li")
              .attr("id",("dum"+svg_lineNum));
*/

              if (srec.state_name==="United States" || state_id===0) {
                // drawing U.S.A. line
                lcolor="Black";
                lcolor_saturation = 1;
                id1=60;
              }
              else if (state_id===52) {
                // drawing U.S.A. line
                lcolor="DarkRed";
                lcolor_saturation = 1;
                id1=61;
              }
              else {
                id1=(inLine>-1) ? inLine : (svg_lineNum);
                svg_colorNum=svg_lineArray[id1].colorNum;
                lcolor=colors10[svg_colorNum];
                lcolor_saturation = ((svg_lineArray.length) - id1) <=10 ? 1 : .2;
              }


              console.log("!!!!!!!!!! Hey!!!!!!  in secNoteSpace, ID1=" + id1 + ", inNote ="+ inNote);

              d3.select("#explain5")
                .append("li")
                .attr("id",("dum"+id1));



            var elem = document.getElementById(("dum"+id1));
            elem.innerHTML = inNote;
            elem.style.color = lcolor;
            elem.style.opacity = lcolor_saturation;

       }


       function secNoteSpace_refresh() {
         //Refresh;
         secTextUpdate(4, "", "");                         // clear header
         d3.select("#explain5").selectAll("li").remove();  //clear away old notes


         if (secNoteSpaceActive === 1) {
           setCurrentState(0);
           srec_fill(state_name);
           secTextUpdate(4, "Notes for " + curYear, "");
           secNoteSpace("The " + state_name + " incarceration rate was " + incarcerationRate + " per 100,000.  The population was " + population.toLocaleString('en-US') + ". There were " + inmates.toLocaleString('en-US') + " people behind bars.", 60);

/*
           state_name=bin.state_name;
           incarcerationRate=bin.incarcerationRate
           secNoteSpace("The " + state_name + " incarceration rate was " + incarcerationRate + " per 100,000.  The population was " + population.toLocaleString('en-US') + ". There were " + inmates.toLocaleString('en-US') + " people behind bars.", 61);
*/

           for (var i = svg_lineArray.length-1; i >= 0; i--) {
               //svg_lineNum=i;
               setCurrentState(svg_lineArray[i].state_id);
               srec_fill(state_name);
               secTextUpdate(4, "Notes for " + curYear, "");
               secNoteSpace(state_name + "'s incarceration rate was " + incarcerationRate + " per 100,000.  The population was " + population.toLocaleString('en-US') + ". There were " + inmates.toLocaleString('en-US') + " people behind bars.", i);

           }

         }
       }



       function drawGraph_Line_refresh() {
         //Refresh;
         var i=0;
         secTextUpdate(4, "", "");                         // clear header
         d3.select("#explain5").selectAll("li").remove();  //clear away old notes
           svg_lineNum2=0;
           svg_lineNum=0;
           for (i = 0; i < svg_lineArray.length; i++) {
               svg_lineNum=i;
               setCurrentState(svg_lineArray[i].state_id);
               srec_fill(state_name);
               //updateApps(lineChart_id);
               drawGraph_Line(2, svg_lineNum, 1);  // parameters (svgSpace, refresh)
           }
           // add line for United States
           setCurrentState(0);
           srec_fill(state_name);
           //updateApps(lineChart_id);
           drawGraph_Line(2, (svg_lineNum2+i), 1);  // parameters (svgSpace, refresh)

          secNoteSpace_refresh();

          if (svg_lineNum>0) {
            console.log("In drawGraph_Line_refresh: about to call srec_fill2(52, bin)" )
            srec_fill2(52, bin);
          }
             //var secNoteDiv = document.getElementById("#section4");
             //secNoteDiv.scrollTop = h_Sec4;
             //secNoteDiv.scrollTop = secNoteDiv.scrollHeight;
       }



       function drawGraph_LineBin(inRec) {
         //Refresh;
         var yearCount=0, inState_id;
         //srec_fill_state_id(svg_lineArray[0].state_id);  // initialize

         for (var i = 1; i < svg_lineArray.length; i++) {       // put State Data in bin
                inState_id=svg_lineArray[i].state_id;
                yearCount=0;
                for (var j = 0; j < dataset.length; j++) {
                    if (inState_id.toString()===dataset[j].state_id.toString()) {
                      for (var k = 0; k < inRec.years.length; k++) {
                         if (inRec.years[k].year.toString()===dataset[j].Year.toString()) {
                           if (inState_id.toString()!=federal_state_id.toString()) {
                             inRec.years[k].population+=parseInt(dataset[j].Population);   // Skip adding in Federal Population, that would double up the count
                           }
                           inRec.years[k].inmates+=parseInt(dataset[j].Inmates);
                           console.log("In drawGraph_LineBin: inRec.years[k].inmates=" + inRec.years[k].inmates + ", inRec.years[k].Population=" + inRec.years[k].population)
                           yearCount++;
                           break;
                         }
                       }
                    }
                    if (yearCount===inRec.years.length) {
                      for (var k = 0; k < inRec.years.length; k++) {
                         //bin.years[j].populationPct = bin.years[j].population/srec.years[j].population
                         //bin.years[j].inmatesPct = bin.years[j].inmates/srec.years[j].inmates
                         inRec.years[k].incarcerationRate = Math.round((inRec.years[k].inmates*100000)/inRec.years[k].population)
                         if (inRec.years[k].year.toString()===curYear.toString()) {
                           population=inRec.years[k].population;
                           inmates=inRec.years[k].inmates;
                           incarcerationRate=inRec.years[k].incarcerationRate;
                         }

                         console.log("In drawGraph_LineBin: inRec.years[k].incarcerationRate=" + inRec.years[k].incarcerationRate )
                      }
                      break;
                    }
                  }
          }
          inRec.state_name='line bin';
          inRec.state_cd='bin';
          inRec.state_id=52;
          state_name='line bin';
          state_cd='bin';
          state_id=52;
          svg_lineNum2++
          drawGraph_Line(2, (svg_lineNum2+svg_lineNum), 1);  // parameters (svgSpace, refresh)
        }




function getIC_struct() {
    //riffleAndPool={elevation: 0, locRiffle:0, lenRiffleUp:0, lenRiffleDown:0, waterDepthRiffle:0, locPool:0, lenPoolEntrance:0, lenPoolExit:0, waterDepthPool:0};
    //extrema = { elevation: 0, eleRelLastExtrema: 0, waterDepth: 0, location: 0, start: 0, end: 0, lenExtrema: 0, lenEntrance: 0, lenExit: 0, Type: -1 };
    var IC_struct = {name: "United States", Year: "1975", incarcerationRate: 0, state_cd: "US", inmates: 0, population: 0, state_id, children: []};
    return IC_struct;
}



function build_jsonStructure(inYear) {
    var root = getIC_struct();

    setCurrentState(0);

    root.name="United States";
    root.year=inYear;
    root.incarcerationRate=incarcerationRate;
    root.state_cd=state_cd;
    root.inmates=inmates;
    root.population=population;


    //Sort records for this year by incarcerationRate
    yrec.states.sort(function (a, b) {
        return a.incarcerationRate - b.incarcerationRate;
    });

    var highRate=getIC_struct();
    highRate.name="High Rate States";
    highRate.year=inYear;


    // Split states up into groups of High Rate, Medium Rate and Low Rate (# of states in each catagory is 17, 16 and 17 respectively)
    var highRateStates;
    for (var i = 0; i < 17; i++) {

        highRateStates = getIC_struct();
        highRateStates.name = yrec.states[i].state_name;
        highRateStates.year = inYear;
        highRateStates.state_cd = yrec.states[i].state_cd;
        highRateStates.inmates = yrec.states[i].inmates;
        highRateStates.population = yrec.states[i].population;
        highRateStates.incarcerationRate = yrec.states[i].incarcerationRate;
        highRate.inmates += yrec.states[i].inmates;
        highRate.population += yrec.states[i].population;

        highRate.push(highRateStates);
    }

    highRate.incarcerationRate=Math.round((highRate.inmates*100000)/highRate.population);

    var mediumRate=getIC_struct();
    mediumRate.name="Medium Rate States";
    mediumRate.year=inYear;


    var mediumRateStates;
    for (var i = 17; i < 33; i++) {

        mediumRateStates = getIC_struct();
        mediumRateStates.name = yrec.states[i].state_name;
        mediumRateStates.year = inYear;
        mediumRateStates.state_cd = yrec.states[i].state_cd;
        mediumRateStates.inmates = yrec.states[i].inmates;
        mediumRateStates.population = yrec.states[i].population;
        mediumRateStates.incarcerationRate = yrec.states[i].incarcerationRate;
        mediumRate.inmates += yrec.states[i].inmates;
        mediumRate.population += yrec.states[i].population;

        mediumRate.push(mediumRateStates);
    }

    mediumRate.incarcerationRate=Math.round((mediumRate.inmates*100000)/mediumRate.population);


    var lowRate=getIC_struct();
    lowRate.name="Low Rate States";
    lowRate.year=inYear;

    var lowRateStates;
    for (var i = 33; i < 50; i++) {

        lowRateStates = getIC_struct();
        lowRateStates.name = yrec.states[i].state_name;
        lowRateStates.year = inYear;
        lowRateStates.state_cd = yrec.states[i].state_cd;
        lowRateStates.inmates = yrec.states[i].inmates;
        lowRateStates.population = yrec.states[i].population;
        lowRateStates.incarcerationRate = yrec.states[i].incarcerationRate;
        lowRate.inmates += yrec.states[i].inmates;
        lowRate.population += yrec.states[i].population;

        lowRate.push(lowRateStates);
    }

    lowRate.incarcerationRate=Math.round((lowRate.inmates*100000)/lowRate.population);

    root.push(highRate);
    root.push(mediumRate);
    root.push(lowRate);


    return root;
};









function drawGraph_SunBurst(inSpace) {
    svgSpace_set(inSpace, barChart_id);

    var margin = {top: 20, right: 10, bottom: 20, left: 30};
    //var margin = {top: 20, right: 20, bottom: 70, left: 50},
    var width = w_Sec - margin.right - margin.left;
    var height = h_Sec - margin.top - margin.bottom;

    radius = Math.min(width, height) / 2;
        //color = d3.scale.category20c();
    var color = d3.scaleLinear().domain([0, maxIncarcerationRate]).range(["LemonChiffon", "DarkRed"]);

    d3.select(svgSpace).select('svg').remove();  //first clear away the old graph

    var svg = d3.select(svgSpace).classed('chart', true).append('svg')
        .classed('navigator', true)
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height * .52 + ")");
    //.attr("stroke", "#AAAAAA")
    //.append("g")
    //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    //.attr("transform", "translate(" + margin.left + "," + margin.top + ")scale(.95, .9)");


    //var color = d3.scaleLinear().domain([0, maxIncarcerationRate]).range(["LemonChiffon", "DarkRed"]);

    var varHeading = "", varDirections = "";


    var partition = d3.partition()
        //.sort(null)
        .size([2 * Math.PI, radius * radius])
        .value(function (d) {
            return 1;
        });

    var arc = d3.svg.arc()
        .startAngle(function (d) {
            return d.x;
        })
        .endAngle(function (d) {
            return d.x + d.dx;
        })
        .innerRadius(function (d) {
            return Math.sqrt(d.y);
        })
        .outerRadius(function (d) {
            return Math.sqrt(d.y + d.dy);
        });

    var root = build_jsonStructure(yrec.year);
    var path = svg.datum(root).selectAll("path")
        .data(partition.nodes)
        .enter().append("path")
        .attr("display", function (d) {
            return d.depth ? null : "none";
        }) // hide inner ring
        .attr("d", arc)
        .style("stroke", "#fff")
        .style("fill", function (d) {
            return color((d.children ? d : d.parent).name);
        })
        .style("fill-rule", "evenodd")
        .each(stash);

    d3.selectAll("input").on("change", function change() {
        var value = this.value === "count"
            ? function () {
            return 1;
        }
            : function (d) {
            return d.size;
        };

        path
            .data(partition.value(value).nodes)
            .transition()
            .duration(1500)
            .attrTween("d", arcTween);
    });

    d3.select(self.frameElement).style("height", height + "px");
}

// Stash the old values for transition.
function stash(d) {
    d.x0 = d.x;
    d.dx0 = d.dx;
}

// Interpolate the arcs in data space.
function arcTween(a) {
    var i = d3.interpolate({x: a.x0, dx: a.dx0}, a);
    return function(t) {
        var b = i(t);
        a.x0 = b.x;
        a.dx0 = b.dx;
        return arc(b);
    };
}







/*

                      for (var j = 0; j < srec.years.length; j++) {
                         if (bin.years[j].year===srec.years[j].year) {
                         }
                      }



              srec_fill_state_id(0);   // United States
       }

               srec.years.push({});
               var k=srec.years.length-1;
               srec.years[k].year=dataset[i].Year;
               srec.years[k].population=dataset[i].Population;
               srec.years[k].incarcerationRate=dataset[i].IncarcerationRate;
               srec.years[k].inmates=dataset[i].Inmates;
               if (k===0) {
                 srec.state_cd==dataset[k].state_cd;
                 srec.state_name=dataset[k].state_name;
              // state mapping ID
               }
           }
         } // dataset[i] loop



        srec_fill_state_id(0);   // United States










         for (var i = 0; i < svg_lineArray.length; i++) {       // put State Data in bin
               srec_fill_state_id(svg_lineArray[i].state_id);
               for (var j = 0; j < srec.years.length; j++) {
                  if (bin.years[j].year===srec.years[j].year) {
                    bin.years[j].population+=srec.years[j].population
                    bin.years[j].inmates+=srec.years[j].inmates
                  }
               }
              srec_fill_state_id(0);   // United States
              for (var j = 0; j < srec.years.length; j++) {
                 bin.years[j].populationPct = bin.years[j].population/srec.years[j].population
                 bin.years[j].inmatesPct = bin.years[j].inmates/srec.years[j].inmates
                 bin.years[j].incarcerationRate = Math.round(bin.years[j].inmates*100000/bin.years[j].population)
               }
       }










       if (svg_currentLine!=-1) {   // delete them from the array and re-add
         svg_lineArray.splice(svg_currentLine, 1);
       }

       if (svg_lineArray.length===0) {
         colorNum = 0;
       }
       else {
         colorNum = (svg_lineArray[(svg_lineArray.length-1)].colorNum + 1) % 10;      //Grap next element in color array
       }
       svg_lineArray.push({state_id: state_id, colorNum:colorNum});

       svg_lineNum = svg_lineArray.length-1;  // reset

     }   // Need to add svg_lineMode==="subtract"


*/
