/**
 * Linear interpolation between two hex colors.
 * @param {string} colorA - e.g., '#FFF0F5'
 * @param {string} colorB - e.g., '#FDE8F0'
 * @param {number} t - Ratio between 0.0 and 1.0
 * @returns {string} - Interpolated color as an rgba string
 */
export function interpolateColor(colorA, colorB, t) {
  // Clamp t between 0 and 1
  t = Math.max(0, Math.min(1, t));

  // Parse hex to rgb
  const parseHex = (hex) => {
    let cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(char => char + char).join('');
    }
    return [
      parseInt(cleanHex.substring(0, 2), 16),
      parseInt(cleanHex.substring(2, 4), 16),
      parseInt(cleanHex.substring(4, 6), 16)
    ];
  };

  const rgbA = parseHex(colorA);
  const rgbB = parseHex(colorB);

  // Linear interpolation for each channel
  const r = Math.round(rgbA[0] + (rgbB[0] - rgbA[0]) * t);
  const g = Math.round(rgbA[1] + (rgbB[1] - rgbA[1]) * t);
  const b = Math.round(rgbA[2] + (rgbB[2] - rgbA[2]) * t);

  return `rgba(${r}, ${g}, ${b}, 1)`;
}
