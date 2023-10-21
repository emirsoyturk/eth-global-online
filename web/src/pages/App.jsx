import Layout from "../components/Layout.jsx";
import Sidebar from "./Sidebar/Sidebar.jsx";
import Home from "./Home/Home.jsx";
import {useEffect, useState} from "react";
import {getAndParsePost, getTimelineContract, sentenceToIndexes} from "../api/index.js";
import {Toaster} from "react-hot-toast";

function App() {
    const [censor, setCensor] = useState(false)
    const [totalPost, setTotalPost] = useState(0)
    const [posts, setPosts] = useState([])

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

    return (
        <Layout setCensor={setCensor} censor={censor}>
            <Toaster />
            <div className={"grid md:grid-cols-5 w-full"}>
                <Sidebar/>
                <Home posts={posts} censor={censor}/>
                {/*<Sidebar/>*/}
            </div>
        </Layout>
    )
}

export default App
