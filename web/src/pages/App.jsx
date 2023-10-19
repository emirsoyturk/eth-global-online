import Layout from "../components/Layout.jsx";
import {shortenAddress} from "../utils/index.js";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Sidebar from "./Sidebar/Sidebar.jsx";
import Home from "./Home/Home.jsx";

function App() {
    return (
        <Layout>
            <div className={"grid md:grid-cols-5 w-full"}>
                <Sidebar/>
                <Home/>
                {/*<Sidebar/>*/}
            </div>
        </Layout>
    )
}

export default App
