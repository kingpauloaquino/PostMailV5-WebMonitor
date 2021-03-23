var counter = 0;
var sent = 0;
var failed = 0;
Pusher.logToConsole = true;
var pusher = new Pusher("1e1bea48a3fcca53c764", { cluster: "ap1" });

var channelAll = pusher.subscribe("my-postmail-all");
channelAll.bind("my-event", function (data) {
    $(document).ready(function () {
        var processId = "-";
        var subject = "-";
        if (parseInt(data.processId) > 0) {
            processId = data.processId;
        }
        if (!data.subject.includes("N/A")) {
            subject = data.subject;
        }
        if (parseInt(data.status) == 1) {
            sent++;
        }
        if (parseInt(data.status) == 2) {
            failed++;
        }
        var statusReport = "<span style='color: rgb(210, 231, 21)'>" + sent + " <i class='fas fa-paper-plane' title='Total Sent'></i></span> | ";
        statusReport += "<span style='color: rgb(240, 47, 95)'>" + failed + " <i class='fas fa-bug' title='Total Failed'></i></span>";
        $("#h4-status-counter").empty().prepend(statusReport);
        var tbody = "<tr>";
        tbody += "<td scope='row' class='font-color-" + data.prefixeId + "' style='text-align:center;'>" + counter + "</td>";
        tbody += "<td scope='row' class='font-color-" + data.prefixeId + "' style='text-align:center;'>" + data.prefixeId + "</td>";
        tbody += "<td scope='row' class='font-color-" + data.prefixeId + "' style='text-align:center;'>" + processId + "</td>";
        tbody += "<td scope='row' class='font-color-" + data.prefixeId + "'>" + subject + "</td>";
        tbody += "<td scope='row' class='font-color-" + data.prefixeId + "'>" + data.message + "</td>";
        tbody += "<td scope='row' class='font-color-" + data.prefixeId + "'>" + data.dateTime + "</td>";
        tbody += "<td scope='row' class='font-color-" + data.prefixeId + "' style='text-align:center;'><a href='#' title='View Email'><i class='fas fa-file-export'></i></a></td>";
        $("#app table tbody").prepend(tbody);
        if (counter > 100) {
            counter = 0;
            $("#app table tbody").empty().prepend(tbody);
        }
        counter++;
    });
});
