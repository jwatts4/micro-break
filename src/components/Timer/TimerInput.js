const TimerInput = ({ value, onChange }) => {
    return (
        <div className="flex items-center justify-between mb-4">
            <label htmlFor="studyTime" className="ml-2 text-slate-700">
                Study time (minutes):
            </label>
            <input
                id="studyTime"
                type="range"
                min="10" // minimum value
                max="60" // maximum value
                value={value}
                onChange={onChange}
                className="w-full"
            />
        </div>
    );
};

export default TimerInput;
