import { useState } from "react";
import { ArrowUp, IconBell } from "./icon"
import Notification from "./notification";

const Bell = ({message, date}: any) => {
    const [toggle, setToggle] = useState<boolean>(false);
    const handleClick = (e: any) => {
        e.stopPropagation()
        setToggle(!toggle);
    }
    return(
        <div
        onClick={handleClick}
        >
            <IconBell/>
            {toggle &&
                <>
                    <ArrowUp/>
                    <Notification />
                    <div>{message}{date}</div>
                </>
            }
        </div>
    )
}
export default Bell