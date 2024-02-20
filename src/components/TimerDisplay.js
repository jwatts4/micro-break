import { formatTime } from "../utils/helpers";

const TimerDisplay = ({ secondsRemaining, nextBreakStart, nextBreakEnd }) => {
    return (
        <div className="text-slate-700">
            <p>Seconds left: {formatTime(secondsRemaining)}</p>
            <p>Next break start: {formatTime(nextBreakStart)}</p>
            <p>Next break end: {formatTime(nextBreakEnd)}</p>
        </div>
    );
};

export default TimerDisplay;
