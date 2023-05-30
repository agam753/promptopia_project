import { connectToDB } from "@/utils/database";
import Prompt from '@/models/prompt.js';
import { NextResponse } from "next/server";


// GET (read)
export const GET = async (req, { params }) => {
    try {
        // connect to database
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator');

        if (!prompt) return NextResponse.json({ message: 'Prompt not found' }, { status: 404 });


        return NextResponse.json(prompt, { status: 200 });
    }
    catch (error) {
        console.log(error);

        return NextResponse.json({ message: 'Failed to fetch the prompts!' }, { status: 500 });
    }
}

// PATCH (update)
export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json();

    try {
        await connectToDB();

        const existingPost = await Prompt.findById(params.id);

        if (!existingPost) return NextResponse.json({ message: 'Prompt not found' }, { status: 404 });

        existingPost.prompt = prompt;
        existingPost.tag = tag;

        await existingPost.save();

        return NextResponse.json({ message: 'Successfully updated the prompt' }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ message: 'Failed to update the prompt' }, { status: 500 });
    }
};

// DELETE (delete)
export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id);

        return NextResponse.json({ message: 'Successfully deleted the prompt' }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ message: 'Failed to delete the prompt' }, { status: 500 });
    }
}