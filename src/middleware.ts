
import { NextRequest, NextResponse } from 'next/server';

export default function middleware(req: NextRequest) {
    console.log('Cookie Header:', req.headers.get('cookie'));
    console.log('All Headers:', Object.fromEntries(req.headers));
    
    return NextResponse.next();
  }