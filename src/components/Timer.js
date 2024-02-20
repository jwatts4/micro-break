import { useState } from "react";
import { useInterval } from "../hooks/useInterval";
import TimerInput from "./TimerInput";

import { minutesToSeconds, formatTime } from "../utils/helpers";

const Timer = () => {
    const START_TIME = 25; // minutes
    const MICRO_BREAK_TIME = 10;
    const AVERAGE_INTERVAL = 120;
    const VARIANCE = 20;

    const [inputTime, setInputTime] = useState(START_TIME);
    const [secondsRemaining, setSecondsRemaining] = useState(
        minutesToSeconds(START_TIME)
    );
    const [isActive, setIsActive] = useState(false);
    const [isMicroBreak, setIsMicroBreak] = useState(false);
    const [nextMicroBreakStart, setNextMicroBreakStart] = useState(null);
    const [nextMicroBreakEnd, setNextMicroBreakEnd] = useState(null);

    useInterval(
        () => {
            if (isActive) {
                setSecondsRemaining((currentSeconds) => {
                    if (currentSeconds <= 0) {
                        setIsActive(false);
                        return 0;
                    }
                    if (currentSeconds === nextMicroBreakStart) {
                        setIsMicroBreak(true);
                    }
                    if (currentSeconds === nextMicroBreakEnd) {
                        setIsMicroBreak(false);
                        scheduleNextMicroBreak();
                    }
                    return currentSeconds - 1;
                });
            }
        },
        isActive ? 1000 : null
    );

    const scheduleNextMicroBreak = () => {
        setSecondsRemaining((currentSeconds) => {
            const nextInterval = Math.round(
                AVERAGE_INTERVAL + (Math.random() * VARIANCE * 2 - VARIANCE)
            );

            const start = currentSeconds - nextInterval;
            const end = start - MICRO_BREAK_TIME;

            setNextMicroBreakStart(start);
            setNextMicroBreakEnd(end);

            return currentSeconds;
        });
    };

    const handleStart = () => {
        if (!isActive && secondsRemaining > 0) {
            setIsActive(true);
            scheduleNextMicroBreak(secondsRemaining);
        }
    };

    const handleStop = () => {
        setIsActive(false);
    };

    const handleReset = () => {
        setIsActive(false);
        setSecondsRemaining(minutesToSeconds(inputTime));
        setNextMicroBreakStart(null);
        setNextMicroBreakEnd(null);
    };

    const handleTimeChange = (event) => {
        const newTime = event.target.value;
        setInputTime(newTime);
        setSecondsRemaining(minutesToSeconds(newTime));
    };

    return (
        <div>
            <p>Seconds left: {formatTime(secondsRemaining)}</p>
            <p>Next break start: {formatTime(nextMicroBreakStart)}</p>
            <p>Next break end: {formatTime(nextMicroBreakEnd)}</p>
            <TimerInput value={inputTime} onChange={handleTimeChange} />
            <div>Time Remaining: {formatTime(secondsRemaining)}</div>
            {isMicroBreak && <h1>Micro Break Time!</h1>}
            <button onClick={handleStart}>Start</button>
            <button onClick={handleStop}>Stop</button>
            <button onClick={handleReset}>Reset</button>
        </div>
    );
};

export default Timer;
