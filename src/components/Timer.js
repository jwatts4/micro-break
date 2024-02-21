import "../index.css";

import { useState } from "react";
import { useInterval } from "../hooks/useInterval";
import TimerToggle from "./TimerToggle";

import { minutesToSeconds, formatTime } from "../utils/helpers";

const Timer = ({ isMicroBreak, setIsMicroBreak }) => {
    const START_TIME = 25; // minutes

    const modes = {
        rapid: {
            microBreakTime: 10,
            averageInterval: 10,
            variance: 1,
        },
        sparse: {
            microBreakTime: 10,
            averageInterval: 120,
            variance: 20,
        },
    };

    const [timerMode, setTimerMode] = useState("sparse");
    const [inputTime, setInputTime] = useState(START_TIME);
    const [secondsRemaining, setSecondsRemaining] = useState(
        minutesToSeconds(START_TIME)
    );
    const [isActive, setIsActive] = useState(false);
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
                modes[timerMode].averageInterval +
                    (Math.random() * modes[timerMode].variance * 2 -
                        modes[timerMode].variance)
            );

            const start = currentSeconds - nextInterval;
            const end = start - modes[timerMode].microBreakTime;

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

    const displayText = isMicroBreak ? "Break" : "Work";

    return (
        <div className="bg-slate-200 p-6 rounded-lg shadow-md my-8">
            <h1
                className={`text-xl text-center my-4 font-bold ${
                    isMicroBreak ? "text-orange-600" : "text-blue-600"
                }`}
            >
                {displayText}
            </h1>

            <div className="text-slate-700 mb-4">
                Time Remaining: {formatTime(secondsRemaining)}
            </div>

            <div className="flex justify-center space-x-4">
                <button
                    className={`px-4 py-2 rounded font-medium text-white focus:outline-none 
                               ${
                                   isMicroBreak
                                       ? "bg-orange-500 hover:bg-orange-600"
                                       : "bg-blue-500 hover:bg-blue-600"
                               } 
                               transition-colors`}
                    onClick={handleStart}
                >
                    Start
                </button>
                <button
                    className={`px-4 py-2 rounded font-medium text-white focus:outline-none 
                               ${
                                   isMicroBreak
                                       ? "bg-orange-500 hover:bg-orange-600"
                                       : "bg-blue-500 hover:bg-blue-600"
                               } 
                               transition-colors`}
                    onClick={handleStop}
                >
                    Stop
                </button>
                <button
                    className={`px-4 py-2 rounded font-medium text-white focus:outline-none 
                               ${
                                   isMicroBreak
                                       ? "bg-orange-500 hover:bg-orange-600"
                                       : "bg-blue-500 hover:bg-blue-600"
                               } 
                               transition-colors`}
                    onClick={handleReset}
                >
                    Reset
                </button>

                <TimerToggle
                    timerMode={timerMode}
                    setTimerMode={setTimerMode}
                    modes={modes}
                    isMicroBreak={isMicroBreak}
                />
            </div>
        </div>
    );
};

export default Timer;
