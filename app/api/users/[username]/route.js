import { connectToDB } from "@utils/database";
import User from "@models/user";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    try {
        await connectToDB();

        const user = await User.findOne({
            username: params.username
        });

        return new Response(JSON.stringify(user), {
            status: 200
        })
    } catch (error) {
        return new Response("Failed to fetch user info", {
            status: 500
        })
    }
}

// PATCH (update profile picture)
export const PATCH = async (req, { params }) => {
    const { image, filename, userId } = await req.json();

    try {
        await connectToDB();

        const existingUser = await User.findById(userId);

        if (!existingUser) return NextResponse.json({ message: "User not found" }, {
            status: 404
        })

        existingUser.image = image;
        existingUser.filename = filename;

        await existingUser.save();

        return NextResponse.json({ message: "Profile picture updated successfully" }, {
            status: 200
        })
    } catch (error) {
        return NextResponse.json({ message: "Failed to update profile picture." }, {
            status: 500
        })
    }
}
