import React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

// const notify = () => toast.error("Warning notification!!! Something went wrong",{position:toast.POSITION.BOTTOM_LEFT})
export default function Notify() {
    return (
        <div>
{/* <button onClick={notify}>Notify !</button> */}
<ToastContainer />
</div>
    )
}



