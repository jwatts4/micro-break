import { formatTime, di } from "../../utils/helpers";

const TimerDisplay = ({ isMicroBreak, secondsRemaining }) => {
    const displayText = isMicroBreak ? "Break" : "Work";

    return (
        <div>
            <h1
                className={`text-3xl text-center my-4 font-bold ${
                    isMicroBreak ? "text-orange-600" : "text-blue-600"
                }`}
            >
                {displayText}
            </h1>

            <div className="text-slate-700 justify-center w-max font-bold text-3xl p-6 bg-white shadow-md rounded-lg text-center mb-4">
                Time Remaining: {formatTime(secondsRemaining)}
            </div>
        </div>
    );
};

export default TimerDisplay;
