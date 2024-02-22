const About = () => {
    return (
        <div className="min-h-screen bg-slate-200 pt-20">
            {" "}
            {/* Ensure full screen height and padding from the top */}
            <div className="w-2/3 md:w-1/2 lg:w-1/3 mx-auto space-y-4 p-6 bg-white shadow-md rounded-lg">
                {" "}
                {/* Centered with automatic margins */}
                <h1 className="text-xl font-bold text-blue-600 text-center">
                    What is a micro timer?
                </h1>
                <p className="text-slate-700">
                    This app was inspired by a research article that suggests
                    positive effects of taking micro breaks during work
                    sessions...
                </p>
                <p className="text-slate-700">
                    There are two modes: rapid and spares. The former mimics the
                    protocol used in the research article, while the latter
                    would be more practicable for use in regular work or study.
                </p>
                <p className="text-slate-700">
                    This app was built using React and Tailwind CSS...
                </p>
            </div>
        </div>
    );
};

export default About;
