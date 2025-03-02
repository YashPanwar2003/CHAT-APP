export const getJoinDate=(createDate)=>{
    const newDate=new Date(createDate);
    const day=newDate.getDate()
    const monthIndex=newDate.getMonth()
    const year=newDate.getFullYear()
    const names=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    return `${day} ${names[monthIndex]}, ${year}`
}