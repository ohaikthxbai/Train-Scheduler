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
