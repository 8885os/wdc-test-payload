import './globals.css'
import './animations.css'
import { PAGE_QUERY } from '@/lib/utils/queries'
import { Page } from '@/lib/utils/pageTypes'
import Hero from '@/components/Hero'

// Define the expected data structure (optional, for clarity or TypeScript)

interface GraphQLResponse {
	Pages: {
		docs: Page[]
	}
}

export default async function Home() {
	// Ensure NEXT_PUBLIC_BASE_URL is defined
	if (!process.env.NEXT_PUBLIC_BASE_URL) {
		console.error('NEXT_PUBLIC_BASE_URL is not defined')
		return (
			<div>
				<h1>Error</h1>
				<p>Server configuration error. Please contact the administrator.</p>
			</div>
		)
	}

	let data: GraphQLResponse | null = null

	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/graphql`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					// Uncomment if authentication is needed:
					// 'Authorization': `Bearer ${process.env.API_TOKEN}`,
				},
				body: JSON.stringify({
					query: PAGE_QUERY,
				}),
				// Optional: Disable caching for fresh data
				// cache: 'no-store',
				// Or use revalidation for ISR
				// next: { revalidate: 60 }, // Revalidate every 60 seconds
			}
		)

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}

		const result = await response.json()

		if (result.errors) {
			throw new Error(`GraphQL error: ${JSON.stringify(result.errors)}`)
		}

		data = result.data
	} catch (error) {
		console.error('Error fetching GraphQL data:', error)
		return (
			<div>
				<h1>Error</h1>
				<p>Failed to load pages. Please try again later.</p>
			</div>
		)
	}
	const page = data?.Pages.docs.find((page) => page.slug === 'home')

	//{/* <Hero key={index} layout={layout} /> */}
	// Render the fetched data
	return (
		<div>
			{data?.Pages.docs.find((page) => page.slug === 'home') ? (
				<div>
					{data?.Pages.docs
						.find((page) => page.slug === 'home')
						?.layout?.map(
							(layout, index) =>
								layout.__typename === 'PageHero' && (
									<Hero key={index} layout={layout} />
								)
						)}
				</div>
			) : (
				<div>
					<h1>404</h1>
					<p>Page not found</p>
				</div>
			)}
		</div>
	)
}
