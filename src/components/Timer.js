import { useState, useEffect } from "react";

const Timer = () => {
    const START_TIME = 5;

    const [secondsRemaining, setSecondsRemaining] = useState(START_TIME);
    const [isActive, setIsActive] = useState(false);

    let intervalID = null;

    useEffect(() => {
        if (isActive) {
            intervalID = setInterval(() => {
                setSecondsRemaining((currentSeconds) => {
                    if (currentSeconds > 1) return currentSeconds - 1;

                    clearInterval(intervalID);
                    setIsActive(false);
                    return 0;
                });
            }, 1000);
        }

        return () => clearInterval(intervalID);
    }, [isActive]);

    const handleStart = () => {
        if (!isActive && secondsRemaining > 0) {
            setIsActive(true);
        }
    };

    const handleStop = () => {
        setIsActive(false);
    };

    const handleReset = () => {
        setIsActive(false);
        setSecondsRemaining(START_TIME);
    };

    return (
        <div>
            <div>Time Remaining: {secondsRemaining}</div>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
            <button onClick={handleReset}>Reset</button>
        </div>
    );
};

export default Timer;
