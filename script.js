$("document").ready(function() {

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
    var database = fb.database();

    $("#loginForm").submit(function(event) {
        event.preventDefault();
        SignIn($(this), database);
    });

    $("#newUserForm").submit(function(event) {
        event.preventDefault();
        CreateUser($(this), database)
    })
});

function SignIn(form, database) {
    var inputs = form.find(":input");
    var userName = inputs[0].value;
    var password = inputs[1].value;

    

    database.ref("/users/"+userName).once("value", function(snapshot) {
        if (snapshot.exists()) {
            var fbPassword = snapshot.val();
            if (password === fbPassword["password"]) {
                window.location.href="/schedule.html?user="+userName;
            }
            else {
                alert("incorrect password");
            }
        }
        else {
            alert("incorrect username");
        }
    })
}

function CreateUser(form, database) {

    var inputs = form.find(":input"),
    userName = inputs[0].value,
    firstPassword = inputs[1].value,
    secondPassword = inputs[2].value;

    if (firstPassword !== secondPassword) {
        alert("Passwords are different!");
        return;
    }

    database.ref("/users/"+userName).set ({
        password: firstPassword
    });
    window.location.href="/schedule.html?user="+userName;
}