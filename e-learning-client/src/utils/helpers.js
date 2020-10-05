export const formatDateTime = (dateTime) => {

    const date = new Date(dateTime);
    const formated = date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
    
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