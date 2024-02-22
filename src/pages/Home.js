import Timer from "../components/Timer";
import { useState } from "react";

const Home = () => {
    const [isMicroBreak, setIsMicroBreak] = useState(false);

    return (
        <div
            className={`flex flex-col justify-start items-center min-h-screen pt-32 ${
                isMicroBreak ? "bg-orange-500" : "bg-blue-500"
            }`}
        >
            <div className="w-4/6 max-w-4xl">
                <h3 className="text-5xl text-center font-semibold text-white mb-6">
                    Micro Break Timer
                </h3>
                <Timer
                    isMicroBreak={isMicroBreak}
                    setIsMicroBreak={setIsMicroBreak}
                />
            </div>
        </div>
    );
};

export default Home;
