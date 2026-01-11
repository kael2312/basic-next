export async function POST(request: Request) {
    const res = await request.json()
    console.log('res POST: ', res);
    const token = res.data
    if(!token){
        return Response.json({ error: 'No token provided' }, { status: 400 })
    }
    return Response.json({ res }, {
        status: 200,
        headers: {
            'Set-Cookie': `sessionToken=${token}; Path=/ ; HttpOnly; SameSite=Strict; Max-Age=${60 * 60 * 24 * 7}` // 7 days
        }
    } )
}
