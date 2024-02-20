const TimerInput = ({ value, onChange }) => {
    return (
        <div>
            <label htmlFor="studyTime">Study time (minutes):</label>
            <input
                id="studyTime"
                type="number"
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default TimerInput;
