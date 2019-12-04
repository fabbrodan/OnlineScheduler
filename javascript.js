function SaveApointment(){
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

    $("#formApointment").css("display", "none");
    $("#apointmentButton").css("display", "flex");

}
function AddApointment(){
    var form = $("#formApointment");
    form.css("display", "flex");
    $("#apointmentButton").css("display", "none");
}