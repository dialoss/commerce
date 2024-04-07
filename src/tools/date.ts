import dayjs from "dayjs";

window.formatDate = date => {
    console.log(date)
    return dayjs(new Date(date).getTime()).format("HH:mm DD.MM.YYYY")
}