export function extractFilenameFromUrl(url: string): string | null {
	const fileName = url.substring(url.lastIndexOf('/') + 1)
	return fileName || null
}
