$(document).ready(function () {

    var trainName = "";
    var destination = "";
    var trainTime = "";
    var frequency = "";
    var nextArrival = "";
    var minutesAway = "";

    var database = {
        apiKey: "AIzaSyCTQvJ9GOKDh4mAMV0-_8z3QpDcs_FBlQM",
        authDomain: "how-to-train-your-schedule.firebaseio.com",
        databaseURL: "https://how-to-train-your-schedule.firebaseio.com/",
    };

    firebase.initializeApp(database);
    var database = firebase.database();

    $(".submit").on("click", function (event) {
        console.log("button was clicked");
        
        event.preventDefault();

        trainName = $("#trainName").val().trim();
        destination = $("#destination").val().trim();
        trainTime = $("#trainTime").val().trim();
        frequency = $("#frequency").val().trim();
        
        database.ref().push({
            nameOfTrain: trainName,
            destOfTrain: destination,
            timeOfTrain: trainTime,
            freqOfTrain: frequency
        });
    });

    database.ref().on("child_added", function (snapshot) {
        console.log(snapshot.val().nameOfTrain);
        


        $(".table-body").append(
        "<tr><td>" + snapshot.val().nameOfTrain + "</td>"
        + "<td>" + snapshot.val().destOfTrain + "</td>" 
        + "<td>" + snapshot.val().freqOfTrain + "</td>"
        // + "<td>" + snapshot.val().nameOfTrain + "</td>"
        // + "<td>" + snapshot.val().nameOfTrain + "</td>"
        )
    })
});