import {toast, Toaster} from 'react-hot-toast'

const copyText = (text) => {
    navigator.clipboard.writeText(text)
    toast.success("Copied ✅")
}

export default copyText