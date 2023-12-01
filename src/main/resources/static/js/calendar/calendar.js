
document.addEventListener('DOMContentLoaded', function() {
    console.log(calendar_drills);
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'timeGridWeek',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        slotLabelFormat: {
              hour: 'numeric',
              minute: '2-digit',
              omitZeroMinute: false,
              meridiem: 'short',
              hour12:false
        },
        eventOverlap:false,
        eventClick: function(info){
            var eventObj= info.event;
            alert(eventObj.title + '\n' +
                  'Start time: ' + eventObj.start + '\n' +
                  'End Time: ' + eventObj.end + '\n' +
                  'Location: ' + eventObj.extendedProps.location + '\n' +
                  'Report to: ' + eventObj.extendedProps.reportTo + '\n' +
                  'Description: ' + eventObj.extendedProps.description)
        },


    });
    calendar.render();
         for(let i = 0; i < calendar_drills.length; i++){
         calendar.addEvent({
            title: calendar_drills[i].title,
            start: calendar_drills[i].startTime,
            end: calendar_drills[i].endTime,
            color: calendar_drills[i].color,
            location: calendar_drills[i].location,
            description: calendar_drills[i].description,
            reportTo: getUserNameByID(calendar_drills[i].reportToID),
            textColor: 'black',
         });
         }
});

function getUserNameByID(userID){
    let foundUser = findUserByID(userID);
    let userName = foundUser.firstName + '  ' + foundUser.lastName;
    return userName;
}



