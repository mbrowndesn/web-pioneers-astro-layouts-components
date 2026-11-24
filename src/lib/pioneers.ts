import { getCollection } from 'astro:content';

// Sort by last name, e.g. "Tim Berners-Lee" → "Berners-Lee"
const lastName = (title: string) => title.trim().split(/\s+/).pop() ?? title;

export async function getSortedPioneers() {
	return (await getCollection('pioneers')).sort((a, b) =>
		lastName(a.data.title).localeCompare(lastName(b.data.title))
	);
}
