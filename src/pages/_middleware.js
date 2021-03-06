import { NextResponse } from "next/server";
// import { verify } from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export default function middleware(req,res) {
    const { cookies } = req;

    const jwt = cookies.access_token;
    const url = req.url;
    
    if(url.includes('/dashboard')){
        if(jwt === undefined) {
            return NextResponse.rewrite(new URL('/', url));
        }

        try {
            // verify(jwt, secret);
            return NextResponse.next()
        } catch(e){
            return NextResponse.rewrite(new URL('/', url));
        }
    }
}
