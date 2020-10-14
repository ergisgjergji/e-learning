export const formatDateTime = (dateTime) => {

    const date = new Date(dateTime);
    const month = date.getMonth() + 1;
    const formated = date.getDate() + "-" + month + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
    
    return formated;
}

export const contentTypeIcon = (contentType) => {
    // returns Font Awesome classname based on the Content Type of a file
    switch(contentType) 
    {
        case "text/plain":
            return "fa-file-text-o"; 
            break;
        case "application/pdf":
            return "fa-file-pdf-o"; 
            break;
        case "image/png":
        case "image/jpg":
        case "image/jpeg":
            return "fa-file-image-o";
            break;
        case "application/vnd.ms-powerpoint":
        case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
            return "fa-file-powerpoint-o";
            break;
        case "application/vnd.rar":
        case "application/zip":
        case "application/x-7z-compressed":
            return 'fa-file-archive-o'
            break;
        default:
            return "fa-file-o";
            break;
    }
}

export const sortById = (data, direction) => {
    
    switch(direction)
    {
        case "ASC":
            data.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
            break;
        case "DESC":
            data.sort((a,b) => (a.id < b.id) ? 1 : ((b.id < a.id) ? -1 : 0));
            break;
        default:
            break;
    }
    return data;
}