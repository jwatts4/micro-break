import Timer from "../components/Timer";
const Home = () => {
    return (
        // Use flex layout to center the content vertically and horizontally
        <div className="flex justify-center items-center min-h-screen bg-slate-100">
            <div className="text-center">
                <h3 className="text-2xl font-semibold text-slate-700 mb-6">
                    Micro Break Timer
                </h3>
                <Timer />
            </div>
        </div>
    );
};

export default Home;
