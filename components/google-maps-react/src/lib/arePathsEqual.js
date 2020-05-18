/**
 * Compares two path arrays of LatLng objects.
 */

export const arePathsEqual = function(pathA, pathB) {
	if (pathA === pathB) {
		return true
	}

	if (!Array.isArray(pathA) || !Array.isArray(pathB)) {
		return false
	}

	if (pathA.length !== pathB.length) {
		return false
	}

	for (const [i, element] of pathA.entries()) {
		if (element === pathB[i]) {
			continue
		}

		if (!isValidLatLng(element) || !isValidLatLng(pathB[i])) {
			return false
		}

		if (pathB[i].lat !== element.lat || pathB[i].lng !== element.lng) {
			return false
		}
	}

	return true
}

/**
 * Helper that checks whether an array consists of objects
 * with lat and lng properties
 * @param {object} elem the element to check
 * @returns {boolean} whether or not it's valid
 */
const isValidLatLng = function(element) {
	return (
		element !== null &&
		typeof element === 'object' &&
		element.hasOwnProperty('lat') &&
		element.hasOwnProperty('lng')
	)
}
