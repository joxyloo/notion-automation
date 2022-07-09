exports.getDaysThisMonth = function(date) {

  return new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
}

exports.getMonthAndWeek = function(fullDate) {

  var date = fullDate.getDate();
  var day = fullDate.getDay();

  return `${fullDate.toLocaleString('default', { month: 'long' })} Week ${Math.ceil((date-1-day)/7)+1}`;
}

exports.getNotionDate = function(date) {
  //
  return new Date(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`).toISOString().split('T')[0];
}
