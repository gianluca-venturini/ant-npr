var UIbindings;
$(document).ready(function() {



});

var startUI = function() {
    var parametersBox = d3.select("ul.parameters");

    var paramArray = d3.keys(parameters);

    // Update
    var parametersControls = parametersBox.selectAll(".parameter").data(paramArray);

    // Enter
    var newControls =parametersControls.enter()
        .append("li")
        .classed("parameter", true);

    newControls.append("label")
        .attr("for", function (d) {return d;})
        .html(function(d) {return d});

    newControls.append("input")
        .attr("type", "text")
        .attr("id", function (d) {return d;})
        .attr("name", function (d) {return d;})
        .attr("value", function(d) {return parameters[d]})
        .on("keyup", function(d) {
            if(d3.event.keyCode == 13) {
                parameters[d] = +this.value;
                console.log("changed");
            }
        });
};


//<!--<li>-->
//<!--<label for="gain">Gain</label>-->
//<!--<input id="gain" type="text" name="gain">-->
//<!--<hr/>-->
//<!--</li>-->