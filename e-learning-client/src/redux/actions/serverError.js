import { toast } from 'react-toastify';

const validateError = (err) => {
    if(err.response.status >= 500)
        toast.error("❕ Server error! Couldn't perform the requested action.");
}

export default validateError;