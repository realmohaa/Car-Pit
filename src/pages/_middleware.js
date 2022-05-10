import { NextResponse } from "next/server";
// import { verify } from "jsonwebtoken";

const secret = "51e49600-a42d-4539-8fc0-f9658dda49cc";

export default function middleware(req,res) {
    const { cookies } = req;

    const jwt = cookies.access_token;
    const url = req.url;
    
    if(url.includes('/dashboard')){
        if(jwt === undefined) {
            return NextResponse.rewrite(new URL('/login', url));
        }

        try {
            verify(jwt, secret);
            return NextResponse.next()
        } catch(e){
            return NextResponse.rewrite(new URL('/login', url));
        }
    }
}
