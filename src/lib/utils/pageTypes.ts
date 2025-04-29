export interface HeroTypes {
	type: 'Hero'
	__typename: string
	heading: string
	subheading: string
	image: { url: string; alt: string }
	button: { label: string; link: string }
}

export interface Page {
	title: string
	slug: string
	layout: HeroTypes[]
}

/* export interface HeaderTypes {
	logo?: { url: string; alt: string }
	navigationItems?: { label: string; link: string }[]
}

export interface SidebarTypes {
	logo: {
		url: string
		alt: string
	}
	socialIcons: {
		image: {
			alt: string
			url: string
		}
	}

} */
