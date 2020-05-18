export const camelize = function(string) {
	return string
		.split(' ')
		.map(function(word) {
			return word.charAt(0).toUpperCase() + word.slice(1)
		})
		.join('')
}
