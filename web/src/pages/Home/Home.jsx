import Post from "./Post.jsx";
import NewPost from "./NewPost.jsx";

export default function Home(props) {
    const {posts, censor} = props
    return (
        <div className={"col-span-3 grid grid-cols-1 border-collapse w-full"}>
            <NewPost address={"0x00x00"}/>
            {
                posts.map((post, i) => (
                        <Post key={i}
                              pic={""}
                              address={post.author}
                              text={post.content}
                              likes={post.likes}
                              comments={post.commentsCount}
                              date={"24s"}
                              positive={true}
                              id={post.id}
                        />
                    )
                )
            }
        </div>
    )
}