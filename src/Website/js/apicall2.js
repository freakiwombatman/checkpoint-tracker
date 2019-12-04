
function addWalker(walkerNumber, checkpoint) {

    var now = generateFormattedDate();
    var id = generateUUID();

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://d8sk3vbw15.execute-api.eu-west-2.amazonaws.com/default/AddWalker",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "x-api-key": "",
            "Accept": "*/*",
            "Host": "d8sk3vbw15.execute-api.eu-west-2.amazonaws.com",
            "Accept-Encoding": "gzip, deflate",
            "Connection": "keep-alive"
        },
        "processData": false,
        "error": function (jqXHR, textStatus, errorThrown) { alert("error: " + textStatus + jqXHR.responseText); },
        "data": "{\"TableName\": \"CheckpointRegister\",\"Item\": {\"EntryId\": \"" + id + "\",\"WalkerNumber\": " + walkerNumber + ",\"Checkpoint\": " + checkpoint + ",\"RecordedDate\": \"" + now + "\"}}"
    }

    $.ajax(settings).done(function (response) {
        $(".toast-body").html("Walker Number: " + walkerNumber + " added");
        $(".toast").toast('show');
    });

}

function GetWalkers() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://d8sk3vbw15.execute-api.eu-west-2.amazonaws.com/default/AddWalker?TableName=CheckpointRegister",
        "method": "GET",
        "headers": {
            "Content-Type": "application/json",
            "x-api-key": "",
            "Accept": "*/*",
            "Host": "d8sk3vbw15.execute-api.eu-west-2.amazonaws.com",
            "Accept-Encoding": "gzip, deflate",
            "Connection": "keep-alive"
        },
        "processData": false,
        "data": ""
    }

    $.ajax(settings).done(function (response) {
        $.each(response.Items, function (i, item) {
            var $tr = $('<tr>').append(
                $('<td>').text(item.WalkerNumber),
                $('<td>').text(item.Checkpoint),
                $('<td>').text(item.RecordedDate)
            ).appendTo('#records_table');
        });
        $("#records_table").easyTable({
            hover:'btn-primary',
            buttons:false,
            select:false,
            sortable:true,
            scroll: {active: true, height: '400px'}
        });
    });
}