import React from "react";

export function Container({children}: {children: React.ReactElement}) {
    return (
        <div style={{maxWidth: 1200, width: '95%', margin:'0 auto'}}>
            {children}
        </div>
    )
}