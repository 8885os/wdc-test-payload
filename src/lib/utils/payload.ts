export async function getPageBySlug(slug: string, opts: { draft?: boolean }) {
	const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/pages?depth=1&draft=${opts.draft ? 'true' : 'false'}&where[slug][equals]=${slug}`

	const res = await fetch(url, {
		headers: { 'Content-Type': 'application/json' },
		cache: 'no-store', // ensures fresh data
	})

	if (!res.ok) {
		console.error(`Failed to fetch page for slug "${slug}"`, await res.text())
		return null
	}

	const data = await res.json()
	return data?.docs?.[0] || null
}

export async function getWorkBySlug(slug: string, opts: { draft?: boolean }) {
	const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/work?depth=1&draft=${opts.draft ? 'true' : 'false'}&where[slug][equals]=${slug}`

	const res = await fetch(url, {
		headers: { 'Content-Type': 'application/json' },
		cache: 'no-store', // disable caching for live preview
	})

	if (!res.ok) {
		console.error(
			`Failed to fetch work item for slug "${slug}"`,
			await res.text()
		)
		return null
	}

	const data = await res.json()
	return data?.docs?.[0] || null
}
