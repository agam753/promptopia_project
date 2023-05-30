import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
import { NextResponse } from "next/server";



export async function GET(request){
    console.log('GET request function');
};


export async function POST(request, response){
    const {prompt, userId, tag} = await request.json();
    
    try{
        // connect to database
        await connectToDB();

        const newPrompt = new  Prompt({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save();

        return NextResponse.json(newPrompt, {status: 201});
    }
    catch(error){
        console.log(error);

        return NextResponse.json({message: 'Failed to create a new prompt'}, {status: 500});
    }

    
};