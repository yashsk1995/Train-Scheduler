    // Initialize Firebase
	var config = {
		apiKey: "AIzaSyB3il-EvOIa3oIuHhFHImpMrDPX-4TLCmA",
		authDomain: "exampl-2cd3a.firebaseapp.com",
		databaseURL: "https://exampl-2cd3a.firebaseio.com",
		projectId: "exampl-2cd3a",
		storageBucket: "",
		messagingSenderId: "424611221681"
	  };
	  firebase.initializeApp(config);

	//   assign firebase ref to new variable traindata
var trainData = firebase.database().ref();


// Button for adding trains
$("#addTrainBtn").on("click", function(){
event.preventDefault();  // Keeps from refreshing the page
	// Grabs user inputs
	var trainName = $("#trainNameInput").val().trim();
	var destination = $("#destinationInput").val().trim();
	var firstTrainUnix = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
	var frequency = $("#frequencyInput").val().trim();

	// Creates local "temporary" object for holding train data
	var newTrain = {
		name:  trainName,
		destination: destination,
		firstTrain: firstTrainUnix,
		frequency: frequency
	}

	// Uploads train data to the database
	trainData.push(newTrain);

	// Logs everything to console
	// console.log(newTrain.name);
	// console.log(newTrain.destination); 
	// console.log(firstTrainUnix);
	// console.log(newTrain.frequency)

	// Alert
	alert(newTrain.name + " has been successfully added");

	// Clears all of the text-boxes
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firstTrainInput").val("");
	$("#frequencyInput").val("");

	return false;
});


// Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
trainData.on("child_added", function(childSnapshot, prevChildKey){

	// Store everything into a variable.
	var data = childSnapshot.val();
	var tName = data.name;
	var tDestination = data.destination;
	var tFrequency = data.frequency;
	var tFirstTrain = data.firstTrain;
	// Calculate the minutes until arrival using hardcore math
	// To calculate the minutes till arrival, take the current time in unix subtract the FirstTrain time and find the modulus between the difference and the frequency  
	var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
	var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency ;
	var tMinutes = tFrequency - tRemainder;

	// To calculate the arrival time, add the tMinutes to the currrent time
	var tArrival = moment().add(tMinutes, "m").format("hh:mm A"); 
	// console.log(tMinutes + " minutes to arrival");
	// console.log(tArrival + " Arrival time");
	// console.log(moment().format("hh:mm A") + " current time Am/Pm format");
	// console.log(moment().format("X") + " current time in Unix format");


	// console.log(nextTrain);
	// Add each train's data into the table 
	$("#trainTable > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td id='min'>" + tFrequency + "</td><td id='min'>" + tArrival + "</td><td id='min'>" + tMinutes + "</td></tr>");

});
// showing current time on page
$("#currentTime").append(moment().format("hh:mm A"));

