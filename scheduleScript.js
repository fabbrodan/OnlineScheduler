$("document").ready(function() {
    var userName = GetUrlParam("user");
    var JSONOBJ = {
        "userName": userName,
        "test1": "test1",
        "test2": 2
    }
    console.log(JSON.stringify(JSONOBJ));
    $.ajax({
        type: "GET",
        url: "127.0.0.6/save_json.php",
        data: { data: JSON.stringify(JSONOBJ) },
        success: console.log("saved!")
    });
});

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