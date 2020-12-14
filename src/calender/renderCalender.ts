export default function renderCalender(todaysDate) {
    const startDate = todaysDate.clone().startOf("month").startOf("week");
    const endDate = todaysDate.clone().endOf("month").endOf("week");
    const day = startDate.clone().subtract(1, "day");
    const calender = [];
    while (day.isBefore(endDate, "day")) {
        calender.push(Array(7)
        .fill(0)
        .map(() => day.add(1, "day").clone()));
    }

    return calender;
}