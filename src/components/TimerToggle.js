const TimerToggle = ({ timerMode, setTimerMode, isMicroBreak }) => {
    const toggleMode = () => {
        setTimerMode((timerMode) => {
            return timerMode === "sparse" ? "rapid" : "sparse";
        });
    };

    return (
        <div
            className={`px-4 py-2 rounded font-medium text-white focus:outline-none 
                               ${
                                   isMicroBreak
                                       ? "bg-orange-500 hover:bg-orange-600"
                                       : "bg-blue-500 hover:bg-blue-600"
                               } 
                               transition-colors`}
        >
            <button onClick={toggleMode}>
                Switch to {timerMode === "sparse" ? "rapid" : "sparse"} mode
            </button>
        </div>
    );
};

export default TimerToggle;
