import Post from "./Post.jsx";

export default function Home(props) {
    const {posts} = props
    return (
        <div className={"col-span-3 grid grid-cols-1 border-collapse w-full"}>
            {
                posts.map((post, i) => (
                        <Post key={i}
                              sender={"AAAAA"}
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