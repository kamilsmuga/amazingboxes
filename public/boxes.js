// object representation of box
function Box(id, name, color, x, y) {
	this.id = id;
	this.name = name;
	this.color = color;
	this.x = x;
	this.y = y;
}

// global variable to store all box instances 
var boxes = [];

// global variable to store number of created boxes
var counter = 0;

window.onload = init;

// init function assigns onclick handlers for generate and clear buttons
function init() {
	var generateButton = document.getElementById("generateButton");
	generateButton.onclick = generate;
	var clearButton = document.getElementById("clearButton");
	clearButton.onclick = clear;
}

// generate function creates box object and div structure in DOM
function generate() {
	// grab main form
	var form = document.getElementById("data");

	// get box name
	var boxName = document.getElementById("name");

	// if user did not enter name prompt and return
	if (boxName.value == "" || boxName.value == null) {
		alert("Please provide box name!");
		form.reset();
		return false;
	}

	// get box color
	var boxColorSelect = document.getElementById("color");

	// figure out which one is selected
	var boxColor = boxColorSelect.options[boxColorSelect.selectedIndex];

	// get all inputs from the main form
	var inputs = document.getElementsByTagName("input");

	// variable to store checked radio button
	var howMany = null;

	// select only radio inputs and check for selected one
	for (var i=0; i<inputs.length; i++) {
		if (inputs[i].type == "radio") {
			if (inputs[i].checked) {
				howMany = inputs[i];
			}
		}
	}

	// if not found any selected radio throw an alert
	if (!howMany) {
		alert("Select how many boxes you want to create!");
			return false;
	}

	// generate random position and Box instance howMany.value times
	for (var i=0; i<howMany.value; i++) {

		// create random position on scene for box
		var sceneDiv = document.getElementById("scene");
		var x = Math.floor(Math.random() * (sceneDiv.offsetWidth-101));
		var y = Math.floor(Math.random() * (sceneDiv.offsetHeight-101));

		// create div for box
		var divBox = document.createElement("div");
		// position div
		divBox.style.left = x + "px";
		divBox.style.top = y + "px";
		// set background
		divBox.style.backgroundColor = boxColorSelect.value;
		// set classname
		divBox.className = "box";
		// add unique id attribute for identification
		divBox.setAttribute("id", boxName.value + counter);
		// set box name
		divBox.innerText = boxName.value;
		// onclick events handled by display function
		divBox.onclick = display;

		// create object instance of Box
		var boxInstance = new Box(boxName.value + counter, boxName.value, boxColorSelect.value, x, y);

		// add boxInstance to global array of boxes
		boxes.push(boxInstance);

		// divBox.onclick = boxInstance.display;

		// append div box to scene
		sceneDiv.appendChild(divBox);

		// increment global counter
		counter++;
	}
}

// function that handles clicks on boxes
function display(e) {
	// read event target
	var div = e.target;
	// grab id
	var id = div.id;
	// assign box we're looking for to null
	var box = null;
	// iterate through all boxes
	// when box from event is found assign to box variable
	for (var i=0; i<boxes.length; i++) {
		if (boxes[i].id == id) {
			box = boxes[i];
			break;
		}
	}
	// if box is found then display its properties
	if (box) {
		alert("Box name: " + box.name + "\nBox id: " + box.id + "\nBox color: " + box.color + "\nBox location: (" + box.x + ", " + box.y + ")");
	}	
}

function clear() {
	// grab scene element
	var scene = document.getElementById("scene");
	while (scene.firstChild) {
    	scene.removeChild(scene.firstChild);
	}
}