import Timer from "../components/Timer";
import { useState } from "react";

const Home = () => {
    const [isMicroBreak, setIsMicroBreak] = useState(false);

    return (
        // Use flex layout to center the content vertically and horizontally
        <div
            className={`flex justify-center  items-start min-h-screen pt-32 ${
                isMicroBreak ? "bg-orange-500" : "bg-blue-500"
            }`}
        >
            <div className="text-center ">
                <h3 className="text-5xl font-semibold text-white mb-6">
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
