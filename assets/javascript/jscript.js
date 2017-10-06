
  var config = {
    apiKey: "AIzaSyDmBwkwy1qChpXgrJZ_d-7BQ6H4DEZdLsQ",
    authDomain: "project1-3bbd1.firebaseapp.com",
    databaseURL: "https://project1-3bbd1.firebaseio.com",
    projectId: "project1-3bbd1",
    storageBucket: "project1-3bbd1.appspot.com",
    messagingSenderId: "128336383314"
  };
  firebase.initializeApp(config);


  var database = firebase.database();

  var name = "";
  var dest = "";
  var time = 0;
  var freq = 0;

  $("#add-user").on("click", function() {
    event.preventDefault();

    name = $("#name-input").val().trim();
    dest = $("#dest-input").val().trim();
    time = $("#time-input").val().trim();
    freq = $("#freq-input").val().trim();

    

  
    var timeConverted = moment(time, "hh:mm").subtract(1, "years");
    console.log(timeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(timeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % freq;
    console.log(tRemainder);

    var tMinutesTillTrain = freq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    console.log("frequency is" + freq);
    var display = "<tr><td>" + name + "</td><td>" + dest + "</td></td>" + time + "</td><td>" + freq + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>";
            $("#table").append(display);

      database.ref().push({
      name: name,
      dest: dest,
      time: time,
      freq: freq,
      
    });
  });

  database.ref().on("child_added", function(newInput){
    console.log(newInput.val().name);

    $("#name-input").val('');
    $("#dest-input").val('');
    $("#time-input").val('');
    $("#freq-input").val('');

  })
