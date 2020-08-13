// calendar
$(function() {
    $("#calendar").fullCalendar({});
  });
  
  // day's agenda
  $(function() {
    $("#dayAgenda").fullCalendar({
      defaultView: "agendaDay",
      duration: { days: 1 },
      views: {
        day: {
          titleFormat: "MMM DD, YYYY"
        }
      }
    });
  });