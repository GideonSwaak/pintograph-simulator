export function getForegroundTextColor(rgbColor) {
    // Extract the RGB values from the rgb() representation
    const rgbValues = rgbColor.match(/\d+/g);
    const r = parseInt(rgbValues[0], 10);
    const g = parseInt(rgbValues[1], 10);
    const b = parseInt(rgbValues[2], 10);

    // Calculate the relative luminance of the color
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return "white" if the color is dark, "black" if it's light
    return luminance > 0.5 ? "black" : "white";
}