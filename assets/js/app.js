var config = {
    apiKey: "AIzaSyCHHdgclpMboJCb5Jz_McWwLS9Jq3ZHu64",
    authDomain: "train-times-eb1d6.firebaseapp.com",
    databaseURL: "https://train-times-eb1d6.firebaseio.com",
    projectId: "train-times-eb1d6",
    storageBucket: "train-times-eb1d6.appspot.com",
    messagingSenderId: "683196019946"
  };
  firebase.initializeApp(config);

var trainData = firebase.database();

$("#add-train-button").on("click", function() {
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = moment($("#first-train-input").val().trim(), "HH: mm").subtract(10, "years").format("X");
    var frequency = $("#frequency-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

    trainData.ref().push(newTrain)
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
    
    return false;
});

trainData.ref().on("child_added", function(snapshot){
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain), "minutes")%frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes, "m").format("hh:mm A");

    console.log(remainder);
    console.log(minutes);
    console.log(arrival);

    $("#train-table > tbody").prepend("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");
});

