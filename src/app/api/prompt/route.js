import { connectToDB } from "@/utils/database";
import Prompt from '@/models/prompt.js';
import { NextResponse } from "next/server";

export const GET = async (req) => {
    // fetch the prompts from the database
    try {
        // connect to database
        await connectToDB();

        const data = await Prompt.find({}).populate('creator');

        return NextResponse.json(data, {status: 200});
    }
    catch (error) {
        console.log(error);

        return NextResponse.json({message: 'Failed to fetch the prompts!'}, {status: 500});
    }
}