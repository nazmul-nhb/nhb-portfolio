import dayjs from "dayjs";

export const formatDate = (date) => {
    return dayjs(date).format('dddd, MMMM DD, YYYY | hh:mm:ssa')
}