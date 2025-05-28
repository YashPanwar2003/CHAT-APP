import { format, isToday, isYesterday, parseISO , isSameDay} from "date-fns"
export const getJoinDate = (createDate) => {
    if (!createDate) return ""
    const joinDate = format(parseISO(createDate), "MMMM d, yyyy")
    return joinDate
}
export const getCurrentTime = (dateInput) => {

    let date

    if (typeof dateInput === "number" || typeof dateInput === "string") {
        date = new Date(dateInput)
    } else if (dateInput instanceof Date) {
        date = dateInput
    } else {
       return null
    }

    if (isNaN(date.getTime())) {
        return "Invalid date"
    }

    return format(date, "hh:mm a") 

}
export const getDayLabel = (dateInput) => {

    if(!dateInput){
        return null
    }
    if(dateInput instanceof Date){
        dateInput=new Date(dateInput)
    }
    if(isToday(dateInput)){
        return "Today"
    }
    if(isYesterday(dateInput)){
        return "Yesterday"
    }
    const dayLabel=format(parseISO(dateInput),"MMMM d, yyyy")
    return dayLabel
}

export const isSameDayMessage=(date1,date2)=>{
    if(!date1 || !date2) return false
    if(! date1 instanceof Date){
        date1=new Date(date1)
    }
    if(! date2 instanceof Date){
        date2= new Date(date2)
    }
    return isSameDay(date1,date2)
}