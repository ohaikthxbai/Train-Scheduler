 /* 

  PSEUDO STUFF 
  - create train object?
  - have user input information into addTrain
  - when the submit button is clicked, information is stored into database
    and updates the table, dynamically...?
  - initial load page will be empty
  - once user(s) start entering information and submitting it, 
  - new table rows should appear with the appropriate information


  */
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

 // onClick event
 $("#submitBtn").on("click", function(event) {
     event.preventDefault();

     // Setting the values to the variables
     name = $("#trainName").val().trim();
     //console.log(name);
     destination = $("#trainDestination").val().trim();
     //console.log(destination);
     trainTime = $("#firstTrainTime").val().trim();
     //console.log(trainTime);
     frequency = $("#trainFrequency").val().trim();
     //console.log(frequency);

     // Referencing and pushing the key value pairs for Firebase
     database.ref().push({
         tName: name,
         tDest: destination,
         tTime: trainTime,
         tFreq: frequency,
     });

     // not understarting child_added
     database.ref().on("child_added", function(snapshot) {
        // TESTING
        //console.log(snapshot.val());

        // set the snapshot to a variable
        var snapValue = snapshot.val();   
        
        // get array of the keys in object
        //var snapArray = Object.keys(snapValue);
        //console.log(snapArray);
        //console.log(snapArray.name);

        // There's gotta be a better way than this
         $("#tData").append('<tr><td>'+snapValue.tName+'</td><td>'+snapValue.tDest+'</td><td>'+snapValue.tTime+'</td><td>'+snapValue.tFreq+'</td></tr>');
        
        //$("#tData").append('<td>'+snapValue.Dest+'</td>');
        //$('#tTime').append(snapValue.tName);

    });
});     
