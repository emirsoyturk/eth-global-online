import Layout from "../components/Layout.jsx";
import Sidebar from "./Sidebar/Sidebar.jsx";
import Home from "./Home/Home.jsx";
import {useEffect, useState} from "react";
import {getAndParsePost, getTimelineContract, sentenceToIndexes} from "../api/index.js";
import {Toaster} from "react-hot-toast";
import Messages from "./Home/Messages.jsx";
import Profile from "./Home/Profile.jsx";

function App() {
    const [censor, setCensor] = useState(true)
    const [totalPost, setTotalPost] = useState(0)
    const [posts, setPosts] = useState([])
    const [selected, setSelected] = useState("Home")

    useEffect(() => {
        const fetchPostCount = async () => {
            const contract = await getTimelineContract()
            if (contract) {
                const postCount = (await contract.postsCount()).toNumber()
                setTotalPost(postCount)
            }
        };

        fetchPostCount();
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            const posts = []
            const contract = await getTimelineContract()
            if (contract) {
                for (let i = posts.length; i < totalPost; i++) {
                    const post = await getAndParsePost(contract, i)
                    post.id = i
                    if (!post.error && (!censor || post.positive)) {
                        posts.push(post)
                    }
                }
            }
            setPosts(posts)
        };

        fetchPosts();
    }, [totalPost, censor]);

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on("chainChanged", () => {
                window.location.reload();
            });
            window.ethereum.on("accountsChanged", () => {
                window.location.reload();
            });
        }
    });

    return (
        <Layout setCensor={setCensor} censor={censor}>
            <div className={"grid md:grid-cols-5 w-full"}>
                <Sidebar selected={selected}
                         setSelected={setSelected}
                />
                {
                    selected === "Home" &&
                    <Home posts={posts}
                          censor={censor}
                    />
                }
                {
                    selected === "Messages" &&
                    <Messages posts={posts}
                              censor={censor}
                    />
                }
                {
                    selected === "Profile" &&
                    <Profile address={"0x1ab573acf41245"}
                             username={"Volthai7us"}
                             bio={"Building this platform"}
                    />
                }
                {/*<Sidebar/>*/}
            </div>
        </Layout>
    )
}

export default App
