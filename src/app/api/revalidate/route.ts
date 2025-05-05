import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

interface PayloadCMSBody {
	collection: string
	slug?: string
	_type?: string
}

// CORS headers if Payload is hosted separately
const corsHeaders = {
	'Access-Control-Allow-Origin': process.env.PAYLOAD_ADMIN_URL ?? '*',
	'Access-Control-Allow-Methods': 'POST, OPTIONS',
	'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
	return new Response(null, {
		status: 204,
		headers: corsHeaders,
	})
}

export async function POST(req: NextRequest) {
	try {
		const body: PayloadCMSBody = await req.json()
		const { collection, slug } = body

		if (!slug || !collection) {
			return NextResponse.json(
				{ message: 'Missing slug or collection' },
				{ status: 400, headers: corsHeaders }
			)
		}

		// Revalidate dynamic pages like /work/[slug]
		if (collection === 'work') {
			revalidatePath(`/work/${slug}`)
			revalidatePath(`/work`) // Revalidate the listing page
			console.log(`Revalidated /work/${slug} and /work`)
		}

		// Revalidate other pages created in the CMS
		if (collection === 'pages') {
			revalidatePath(`/${slug}`)
			console.log(`Revalidated /${slug}`)
		}

		return NextResponse.json(
			{ message: `Revalidated paths for collection: ${collection}` },
			{ status: 200, headers: corsHeaders }
		)
	} catch (err) {
		console.error('Revalidation error:', err)
		return NextResponse.json(
			{ message: 'Revalidation failed' },
			{ status: 500, headers: corsHeaders }
		)
	}
}
