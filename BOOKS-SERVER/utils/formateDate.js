
exports.formatTodayDate = (date) => {
    const day = String(date.getUTCDate() + 1).padStart(2, '0');
    // console.log('day:', day)
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    // console.log('month:', month)
    const year = date.getUTCFullYear();
    // console.log('year:', year)
    const formattedDate = `${year}-${month}-${day}T${String(date.getUTCHours()).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')}:${String(date.getUTCSeconds()).padStart(2, '0')}Z`;
    console.log('formattedDate:', formattedDate)
    return new Date(formattedDate);
}

exports.formatWeekDate = (date) => {
    const today = new Date();
    const oneWeekAgoDate = new Date(today);
    oneWeekAgoDate.setDate(today.getDate() - 5);
    console.log('oneWeekAgoDate formatWeekDate:', oneWeekAgoDate)
    return new Date(oneWeekAgoDate);
}