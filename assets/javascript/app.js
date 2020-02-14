$(document).ready(function () {

    var trainName = "";
    var destination = "";
    var trainTime = "";
    var frequency = "";
    var nextArrival = "";
    var minutesAway = "";

    function currentTime() {
        var time = moment().format('LT')
        $(".local-time").text(time)

    }



    var database = {
        apiKey: "AIzaSyCTQvJ9GOKDh4mAMV0-_8z3QpDcs_FBlQM",
        authDomain: "how-to-train-your-schedule.firebaseio.com",
        databaseURL: "https://how-to-train-your-schedule.firebaseio.com/",
    };

    firebase.initializeApp(database);
    var database = firebase.database();

    $(".submit").on("click", function (event) {

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

        $("#trainName").val("")
        $("#destination").val("")
        $("#trainTime").val("")
        $("#frequency").val("")

        return false;
    });

    database.ref().on("child_added", function (snapshot) {

        var freqOfTrain = snapshot.child("freqOfTrain").val()
        trainTimeConvert = moment(snapshot.val().trainTime, "hh:mm").subtract(1, "years");
        trainDiff = moment().diff(moment(trainTimeConvert), "minutes");
        console.log(trainDiff);

        trainRemainder = trainDiff % freqOfTrain;
        console.log(trainRemainder);
        console.log(snapshot.child("freqOfTrain").val());

        minutesAway = freqOfTrain - trainRemainder;
        console.log(minutesAway);


        nextArrival = moment().add(minutesAway, "m").format("hh:mm A");
        console.log(nextArrival);

        $(".table-body").append(
            "<tr><td>" + snapshot.val().nameOfTrain + "</td>"
            + "<td>" + snapshot.val().destOfTrain + "</td>"
            + "<td>" + snapshot.val().freqOfTrain + "</td>"
            + "<td>" + nextArrival + "</td>"
            + "<td>" + minutesAway + "</td>"
        )
    })



    currentTime()
    setInterval(currentTime, 1000)


});