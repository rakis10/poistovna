import React from "react";

export const VpInput = ({children}: { children: JSX.Element[] }) => {
    return (
        <div className="row py-1 ">
            {children.map((child, index) => {
                return (
                    <div

                        className={`col-lg-6 ${
                            index === 0 ? 'text-lg-end' : 'text-lg-start '
                        } `}>
                        {child }
                    </div>
                )
            })}
        </div>

    )
}