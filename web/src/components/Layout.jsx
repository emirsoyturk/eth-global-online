import PropTypes from "prop-types";

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col items-center justify-center py-5 px-2 md:px-5 lg:px-10 mt-5 mx-auto max-w-zkml">
            {children}
        </div>
    )
}

Layout.propTypes = {
    children: PropTypes.element
}
export default Layout
