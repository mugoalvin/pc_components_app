export function makeKeyUserFriendly(text: string): string {
	return text
		.replaceAll('_', ' ')
		.split(' ')
		.map(word => 
			word.slice(0, 1).toUpperCase() + word.slice(1)
		).join(' ')
}