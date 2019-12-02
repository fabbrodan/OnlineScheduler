$("document").ready(function() {
    $("#loginForm").submit(function(event) {
        event.preventDefault();
        SignIn($(this));
    });
});

function SignIn(form) {
    var inputs = form.find(":input");
    var userName = inputs[0].value;
    var password = inputs[1].value;
    var users;

    $.ajax({
        cache: false,
        url: "Store/users.txt",
        success: function(response) {
            users = JSON.parse(response);
        }
    }).then(function() {
        
        $.each(users, function(index, element) {
            if (element.userName == userName) {
                if (element.password == password) {
                    console.log("logged in");
                    window.location.href="/schedule.html"
                    return false;
                }
                else {
                    console.log("incorrect password");
                    return false;
                }
            }
        });
    });
}