import React from "react";

export function Container({children}: {children: React.ReactElement}) {
    return (
        <div className={"max-w-[1200px] w-[95%] h-100 mx-auto my-0" }>
            {children}
        </div>
    )
}