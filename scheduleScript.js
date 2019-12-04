const times = [
    { id: 0, value: '00:00' },
    { id: 1, value: '00:30' },
    { id: 2, value: '01:00' },
    { id: 3, value: '01:30' },
    { id: 4, value: '02:00' },
    { id: 5, value: '02:30' },
    { id: 6, value: '03:00' },
    { id: 7, value: '03:30' },
    { id: 8, value: '04:00' },
    { id: 9, value: '04:30' },
    { id: 10, value: '05:00' },
    { id: 11, value: '05:30' },
    { id: 12, value: '06:00' },
    { id: 13, value: '07:00' },
    { id: 14, value: '07:30' },
    { id: 15, value: '08:00' },
    { id: 16, value: '08:30' },
    { id: 17, value: '09:00' },
    { id: 18, value: '09:30' },
    { id: 19, value: '10:00' },
    { id: 20, value: '10:30' },
    { id: 21, value: '11:00' },
    { id: 22, value: '11:30' },
    { id: 23, value: '12:00' },
    { id: 24, value: '12:30' },
    { id: 25, value: '13:00' },
    { id: 26, value: '13:30' },
    { id: 27, value: '14:00' },
    { id: 28, value: '14:30' },
    { id: 29, value: '15:00' },
    { id: 30, value: '15:30' },
    { id: 31, value: '16:00' },
    { id: 32, value: '16:30' },
    { id: 33, value: '17:00' },
    { id: 34, value: '17:30' },
    { id: 35, value: '18:00' },
    { id: 36, value: '18:30' },
    { id: 37, value: '19:00' },
    { id: 38, value: '19:30' },
    { id: 39, value: '20:00' },
    { id: 40, value: '20:30' },
    { id: 41, value: '21:00' },
    { id: 42, value: '21:30' },
    { id: 43, value: '22:00' },
    { id: 44, value: '22:30' },
    { id: 45, value: '23:00' },
    { id: 46, value: '23:30' }
  ];

$("document").ready(function() {

    var userName = GetUrlParam("user");

    if ((sessionStorage.getItem("signedIn") === null) || (sessionStorage.getItem("signedIn") !== userName)) {
        window.location.href = "/unauthorized.html";
        return;
    }

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

    $("#apointmentButton").click(AddApointment);

    $("#formApointment").submit(function(event) {
        event.preventDefault();
        SaveAppointment(fb.database(), userName);
    });

    $(".day").click(function() {
        var selectedTime = parseInt($(this).attr("id").slice(0, 2).replace("-", ""));
        var selectedDay = parseInt($(this).attr("id").slice(2, 3));
        AddApointment(selectedTime, selectedDay);
    });

    $.each(times, function(index, element) {
        var ddwnEntry = $("<option></option>").text(element["value"]);
        $("#to").append(ddwnEntry);
    });

    $.each(times, function(index, element) {
        var ddwnEntry = $("<option></option>").text(element["value"]);
        $("#from").append(ddwnEntry);
    });
});

async function LoadUserAppointments(database, userName) {

    var appointmentsArr = []
    await database.ref("/appointments/"+userName).once("value", function(snapshot) {
        snapshot.forEach(function(apptSnap) {
            appointmentsArr.push(apptSnap.val());
        });
    });

    $.each(appointmentsArr, function(index, element) {
        for(i = element["startTime"]; i <= element["endTime"]; i++) {
            $("#"+i+"-"+element["dayOfWeek"]).css("background-color", "green");
        }
    });
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

function AddApointment(startTime, selectedDay){
    var form = $("#formApointment");
    $("#from").val(times.find(i => i.id === startTime).value);
    $("#selectedDay").val(selectedDay);
    form.css("display", "flex");
    $("#apointmentButton").css("display", "none");
}

async function SaveAppointment(database, userName) {

    var dayOfWeek = parseInt($("#selectedDay").val());
    var notes = $("#inputNotes").val();
    var from = times.find(d => d.value === $("#from").val()).id;
    var to = times.find(d => d.value === $("#to").val()).id;

    var userAppointments = database.ref("/appointments/"+userName);
    var newAppt = userAppointments.push();
    await newAppt.set( {
        note: notes,
        startTime: from,
        endTime: to,
        dayOfWeek: dayOfWeek
    });

    location.reload();
}