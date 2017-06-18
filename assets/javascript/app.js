
 // Initialize Firebase
 var config = {
     apiKey: "AIzaSyDJUuDt4seJJRciTZcqVKPSVgWN39NdNus",
     authDomain: "train-scheduler-71070.firebaseapp.com",
     databaseURL: "https://train-scheduler-71070.firebaseio.com",
     projectId: "train-scheduler-71070",
     storageBucket: "train-scheduler-71070.appspot.com",
     messagingSenderId: "150792402031"
 };
 // initialize the database with provided configuration
 firebase.initializeApp(config);
 // declare database variable to reference the database library
 var database = firebase.database();
 //console.log(database);

 // Declaring Variables
 var name = "";
 var destination = "";
 var trainTime = "";
 var frequency = "";
 var nextArrival = "";
 var minAway = "";
 var timeConverted = "";
 var currentTime = "";
 var diffTime = "";
 var timeRemainder = "";
 var nextArrivalFormatted = "";


 // onClick event
 $("#submitBtn").on("click", function(event) {
     event.preventDefault();

     // Setting the values to the variables
     name = $("#trainName").val().trim();
     destination = $("#trainDestination").val().trim();
     trainTime = $("#firstTrainTime").val().trim();
     frequency = $("#trainFrequency").val().trim();
     trainTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
     currentTime = moment();
     diffTime = moment().diff(moment(trainTimeConverted), "minutes");
     timeRemainder = diffTime % frequency;
     minAway = frequency - timeRemainder;
     nextArrival = moment().add(minAway, "minutes");
     nextArrivalFormatted = moment(nextArrival).format("hh:mm");

     // Referencing and pushing the key value pairs for Firebase
     database.ref().push({
         tName: name,
         tDest: destination,
         tTime: trainTime,
         tFreq: frequency,
         tArrival: nextArrivalFormatted,
         tMin: minAway
     });

     // not understarting child_added
     database.ref().on("child_added", function(snapshot) {
         // TESTING
         //console.log(snapshot.val());

         // set the snapshot to a variable
         var snapValue = snapshot.val();

         // There's gotta be a better way than this
         $("#tData").append('<tr><td>' + snapValue.tName + '</td><td>' + snapValue.tDest + '</td><td>' + snapValue.tFreq + '</td><td>' + snapValue.tArrival + '</td><td>' + snapValue.tMin + '</td></tr>');
     });
 });
