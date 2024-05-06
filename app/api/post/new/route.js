import { NextResponse } from "next/server";
import { connectToDB } from "@utils/database";
import Post from "@models/post";

export const POST = async (req) => {
    const { userId, prompt, image, ai, filename } = await req.json();
    try {
        await connectToDB();
        const newPost = new Post({
            creator: userId,
            prompt,
            image,
            ai,
            filename,
        })

        await newPost.save();
        return NextResponse.json({ message: "Post Created" }, {
            status: 200
        })
    } catch (err) {
        return NextResponse.json({ message: "Failed to create post." }, {
            status: 500
        })
    }
}