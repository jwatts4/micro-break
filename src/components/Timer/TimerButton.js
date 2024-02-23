import React from "react";

const TimerButton = ({ label, onClick, isMicroBreak }) => {
    const baseStyle =
        "px-4 py-2 rounded font-medium text-white focus:outline-none transition-colors";
    const microBreakStyle = isMicroBreak
        ? "bg-orange-500 hover:bg-orange-600"
        : "bg-blue-500 hover:bg-blue-600";

    return (
        <button className={`${baseStyle} ${microBreakStyle}`} onClick={onClick}>
            {label}
        </button>
    );
};

export default TimerButton;
