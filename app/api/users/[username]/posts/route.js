import { connectToDB } from "@utils/database";
import Post from "@models/post";
import User from "@models/user";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();

        const user = await User.findOne({
            username: params.username
        });

        const posts = await Post.find({
            creator: user._id
        }).populate('creator');

        return new Response(JSON.stringify(posts), {
            status: 200
        })
    } catch (error) {
        return new Response("Failed to fetch user posts", {
            status: 500
        })
    }
}