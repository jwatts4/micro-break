const About = () => {
    return (
        <div className="flex flex-col items-center justify-start min-h-screen pt-32 bg-blue-500">
            {/* Ensure full screen height and padding from the top */}
            <h1 className="text-5xl text-center font-semibold text-white mb-6">
                What is a micro break timer anyway?
            </h1>
            <div className="w-4/6 max-w-4xl bg-slate-200 p-6 rounded-lg shadow-md mb-6">
                <p className="text-slate-700 pb-3">
                    This app was inspired by a research article that suggests
                    positive effects of taking micro breaks during work
                    sessions...
                </p>
                <p className="text-slate-700 pb-3">
                    There are two modes: rapid and spares. The former mimics the
                    protocol used in the research article, while the latter
                    would be more practicable for use in regular work or study.
                </p>
                <p className="text-slate-700 pb-3">
                    This app was built using React and Tailwind CSS...
                </p>
            </div>
        </div>
    );
};

export default About;
