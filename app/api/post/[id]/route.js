import { NextResponse } from "next/server";
import { connectToDB } from "@utils/database";
import Post from "@models/post";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();

        const existingPost = await Post.findById(params.id);

        if (!existingPost) return NextResponse.json({ message: "Post not Found" }, { status: 404 });

        return NextResponse.json({ post: existingPost }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: "Failed to fetch post" }, {
            status: 500
        });
    }
}

// PATCH (update)
export const PATCH = async (req, { params }) => {
    const { prompt, ai } = await req.json();

    try {
        await connectToDB();

        const existingPost = await Post.findById(params.id);

        if (!existingPost) return new Response("Post not found", {
            status: 404
        })

        existingPost.prompt = prompt;
        existingPost.ai = ai;

        await existingPost.save();

        return NextResponse.json({ post: existingPost }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({ message: "Failed to update post." }, {
            status: 500
        })
    }
}

// DELETE (delete)
export const DELETE = async (req, { params }) => {
    try {

        await connectToDB();

        await Post.findByIdAndDelete(params.id);

        return NextResponse.json({ message: "Prompt deleted successfully" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}