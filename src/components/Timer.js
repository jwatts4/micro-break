import "../index.css";

import { useState } from "react";
import { useInterval } from "../hooks/useInterval";
import TimerInput from "./TimerInput";
import TimerDisplay from "./TimerDisplay";

import { minutesToSeconds, formatTime } from "../utils/helpers";

const Timer = () => {
    const START_TIME = 25; // minutes
    const MICRO_BREAK_TIME = 3;
    const AVERAGE_INTERVAL = 3;
    const VARIANCE = 1;

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
        <div className="bg-slate-200 p-6 rounded-lg shadow-md my-8">
            {isMicroBreak && (
                <h1 className="text-xl text-green-600 font-bold text-center my-4">
                    Micro Break Time!
                </h1>
            )}
            <TimerDisplay
                secondsRemaining={secondsRemaining}
                nextBreakStart={nextMicroBreakStart}
                nextBreakEnd={nextMicroBreakEnd}
            />
            <TimerInput value={inputTime} onChange={handleTimeChange} />
            <div className="text-slate-700 mb-4">
                Time Remaining: {formatTime(secondsRemaining)}
            </div>

            <div className="flex justify-center space-x-4">
                <button
                    className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-700 transition-colors"
                    onClick={handleStart}
                >
                    Start
                </button>
                <button
                    className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-700 transition-colors"
                    onClick={handleStop}
                >
                    Stop
                </button>
                <button
                    className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-700 transition-colors"
                    onClick={handleReset}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default Timer;
