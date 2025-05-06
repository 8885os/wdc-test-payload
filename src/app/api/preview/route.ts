import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const slug = searchParams.get('slug') || ''
	const collection = searchParams.get('collection') || ''

	;(await draftMode()).enable()

	const redirectUrl = new URL(
		`${collection === 'pages' ? `/${slug === 'home' ? '' : `/${slug}`}` : `/${collection}`}/${slug}`,
		request.url
	)

	const res = NextResponse.redirect(redirectUrl)

	return res
}
