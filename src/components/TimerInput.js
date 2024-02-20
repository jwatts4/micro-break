const TimerInput = ({ value, onChange }) => {
    return (
        <div className="mb-4">
            <label htmlFor="studyTime" className="block text-slate-700">
                Study time (minutes):
            </label>
            <input
                id="studyTime"
                type="number"
                value={value}
                onChange={onChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
            />
        </div>
    );
};

export default TimerInput;
