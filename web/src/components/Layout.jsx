import PropTypes from "prop-types";
import Navbar from "../pages/Navbar/Navbar.jsx";

const Layout = ({children}) => {
    return (
        <div className={"bg-dark_111 min-h-screen py-5 px-2 md:px-5 lg:px-10 "}>
            <Navbar />
            <div
                className="flex flex-col items-center justify-center mx-auto max-w-zkml">
                {children}
            </div>
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.element
}
export default Layout
