/* import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
// import { getServerSession } from 'next-auth';
// import authOptions from '@/lib/authOptions';

export default async function GET() {
  // const session = await getServerSession(authOptions);
  const session = await auth();

  if (!session) {
    return new NextResponse(JSON.stringify({ error: 'unauthorized' }), {
      status: 401,
    });
  }

  // console.log('GET API', session)
  return NextResponse.json({ authenticated: !!session });
}
*/
import { handlers } from '@/lib/auth';

export const { GET, POST } = handlers;
