$("document").ready(function() {

    var userName = GetUrlParam("user");

    var firebaseConfig = {
        apiKey: "AIzaSyAh50GpB6sirjKPLqY-I6KAwN2tkfR86rs",
        authDomain: "onlinescheduler-cc7ee.firebaseapp.com",
        databaseURL: "https://onlinescheduler-cc7ee.firebaseio.com",
        projectId: "onlinescheduler-cc7ee",
        storageBucket: "onlinescheduler-cc7ee.appspot.com",
        messagingSenderId: "32569569158",
        appId: "1:32569569158:web:c26fcb132fbd658dd4c607"
    };
    
    var fb = firebase.initializeApp(firebaseConfig);

    LoadUserAppointments(fb.database(), userName);

    $("#formApointment").submit(function(event) {
        event.preventDefault();
        SaveAppointment(fb.database(), userName);
    });

});

function LoadUserAppointments(database, userName) {

    var appointmentsArr = []
    database.ref("/appointments/"+userName).once("value", function(snapshot) {
        snapshot.forEach(function(apptSnap) {
            appointmentsArr.push(apptSnap.val());
        });
    });
    // POPULATE SCHEMA CELLS USING appointmentsArr HERE BELOW
}

function GetUrlParam(sParam) {
    var sPageURL = window.location.search.substring(1);
	    var sURLVariables = sPageURL.split('&');
	    for (var i = 0; i < sURLVariables.length; i++)
	    {
	        var sParameterName = sURLVariables[i].split('=');
	        if (sParameterName[0] == sParam)
	        {
	            return sParameterName[1];
	        }
	    }
}

function AddApointment(){
    var form = $("#formApointment");
    form.css("display", "flex");
    $("#apointmentButton").css("display", "none");
}

function SaveAppointment(database, userName) {

    var name = $("#name").val();
    var email = $("#email").val();
    var notes = $("#inputNotes").val();
    var from = $("#from").val();
    var to = $("#to").val();

    var apointment = {
        aname: name,
        aemail: email,
        anotes: notes,
        afrom: from,
        ato: to
    }

    var userAppointments = database.ref("/appointments/"+userName);
    var newAppt = userAppointments.push();
    newAppt.set( {
        note: notes,
        startTime: from,
        endTime: to
    });
}