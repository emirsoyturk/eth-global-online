import Post from "./Post.jsx";

export default function Home() {
    return (
        <div className={"col-span-3 grid grid-cols-1 border-collapse w-full"}>
            {
                Array(10).fill(0).map((x, i) => (
                    <Post key={i}
                          sender={"Emir Soyturk"}
                          pic={""}
                          address={"0x891f7737CeedC31dC149Cbe6950321345d06477D"}
                          text={"First post on this platform"}
                          date={"24s"}
                          positive={true}
                    />
                ))
            }
        </div>
    )
}