import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="bg-slate-200 shadow-md p-4 rounded-lg">
            <div className="flex justify-center items-center">
                <Link
                    to="/"
                    className="text-slate-500 hover:text-slate-900 font-semibold px-4 py-2 rounded transition-colors"
                >
                    Timer
                </Link>

                <Link
                    to="/about"
                    className="text-slate-500 hover:text-slate-900 font-semibold px-4 py-2 rounded transition-colors"
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
