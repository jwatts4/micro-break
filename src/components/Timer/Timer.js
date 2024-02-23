import { useState } from "react";
import { useInterval } from "../../hooks/useInterval";
import TimerToggleModeButton from "./TimerToggleModeButton";
import TimerButton from "./TimerButton";
import TimerDisplay from "./TimerDisplay";

import { minutesToSeconds, formatTime } from "../../utils/helpers";

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

    return (
        <div className="flex flex-col items-center bg-slate-200 p-6 rounded-lg shadow-md my-8">
            <TimerDisplay
                isMicroBreak={isMicroBreak}
                secondsRemaining={secondsRemaining}
            />

            <div className="flex justify-center space-x-4">
                <TimerButton
                    label="Start"
                    onClick={handleStart}
                    isMicroBreak={isMicroBreak}
                />

                <TimerButton
                    label="Stop"
                    onClick={handleStop}
                    isMicroBreak={isMicroBreak}
                />

                <TimerButton
                    label="Reset"
                    onClick={handleReset}
                    isMicroBreak={isMicroBreak}
                />

                <TimerToggleModeButton
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
