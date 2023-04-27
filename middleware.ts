import { NextRequest, NextResponse } from 'next/server'
import { verifyAuth } from './lib/auth'

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('user-token')?.value

    const verifiedToken = token && await verifyAuth(token).catch((err) => {
        console.log(err.message)
    })

    // if (req.nextUrl.pathname.startsWith('/signup') && !verifiedToken) {
    //     return
    // }

    if (req.url.includes('/dashboard') && !verifiedToken) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    // if (!verifiedToken) {
    //     return NextResponse.redirect(new URL('/', req.url))
    // }

}
//Middleware will run whenever we go to...
export const config = {
    math: ['/dashboard', '/signup']
}