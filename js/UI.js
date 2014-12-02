var UIbindings;
$(document).ready(function() {

    d3.select("#canvas").on("click", function() {
        //newAnt = THREE.Vector2(d3.mouse(this)[0], d3.mouse(this)[1]);
        var canvasSizeHeight = parseFloat(d3.select(this).attr("height"));

        antUniforms.newAnt.value.x = d3.mouse(this)[0];
        antUniforms.newAnt.value.y = (canvasSizeHeight /2) - d3.mouse(this)[1];
    });

});

var startUI = function() {
    var menu = d3.select(".menu");

    menu.append("button")
        .classed("restart-button", true)
        .attr("type", "button")
        .html("Restart")
        .on("click", function() {
            UIStartRendering();

            console.log("restart!");
        });

    menu.append("button")
        .classed("stop-button", true)
        .attr("type", "button")
        .html("Stop")
        .on("click", function() {
            UIStopRendering();
            console.log("stop!");
        });

    menu.append("button")
        .classed("print-parameters", true)
        .attr("type", "button")
        .html("Get param")
        .on("click", function() {
            var message = "";
            d3.keys(parameters).forEach(function(key) {
                message += key + "=" + parameters[key] + "\n";
            });

            alert(message);
        });

    menu.append("button")
        .classed("toggle-living-painting", true)
        .attr("type", "button")
        .html("Change view")
        .on("click", function() {
            if(renderingView == RenderingView.LIVING) {
                renderingView = RenderingView.PAINTING;
            } else {
                renderingView = RenderingView.LIVING;
            }
        });

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
        .on("keyup", function() {
            if(d3.event.keyCode == 13) {
                UIStartRendering();
            }
        })
        .on("input", function(d) {

            if(d3.event.keyCode != 13) {
                UIStopRendering();
                parameters[d] = +this.value;
                console.log("changed");
            }
        })
        .on("focusin", function() {
            UIStopRendering();
        });
};



var UIStartRendering = function() {
    init();

    if(play == false) {
        play = true;
        requestAnimationFrame( animate );
    }
};

var UIStopRendering = function() {
   play = false;
};
