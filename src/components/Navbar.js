import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="bg-slate-800 shadow-md p-4">
            <div className="flex justify-center items-center space-x-20">
                <Link
                    to="/"
                    className="text-slate-200 hover:text-white text-2xl font-semibold px-4 py-2 rounded transition-colors"
                >
                    Timer
                </Link>

                <Link
                    to="/about"
                    className="text-slate-200 hover:text-white text-2xl font-semibold px-4 py-2 rounded transition-colors"
                >
                    About
                </Link>
            </div>
            <nav>
                <div className=""></div>
            </nav>
        </div>
    );
};

export default Navbar;
