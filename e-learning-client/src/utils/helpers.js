export const formatDateTime = (dateTime) => {

    const date = new Date(dateTime);
    const formated = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
    
    return formated;
}