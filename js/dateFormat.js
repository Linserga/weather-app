export function getCurrentDate() {
    let weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let date = new Date();
    let year = date.getFullYear();
    let month = months[date.getMonth()];
    let weekDay = weekDays[date.getDay()];
    let day = date.getDate();
    let hours = date.getHours()
    let minutes = date.getMinutes();

    return `${weekDay} ${hours < 10? '0':''}${hours}:${minutes < 10 ? '0' : ''}${date.getMinutes()}`;
}


