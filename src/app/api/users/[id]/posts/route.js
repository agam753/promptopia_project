import { connectToDB } from "@/utils/database";
import Prompt from '@/models/prompt.js';
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export const GET = async (req, { params }) => {
    try {
        // connect to database
        await connectToDB();

        const data = await Prompt.find({
            creator: new ObjectId(params.id)
        }).populate('creator');

        // console.log(data);
        return NextResponse.json(data, { status: 200 });
    }
    catch (error) {
        console.log(error);

        return NextResponse.json({ message: 'Failed to fetch the prompts!' }, { status: 500 });
    }
}