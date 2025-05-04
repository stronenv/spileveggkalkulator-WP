/******/ (() => { // webpackBootstrap
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* Defaults */
const defaults = {
  wallWidth: 200,
  // cm
  wallHeight: 240,
  // cm
  slatSpacing: 30,
  // mm
  slatWidth: 48 // mm
};

/* Elements / wrappers */
const wallWidthWrapper = document.getElementById("wallWidth"),
  wallHeightWrapper = document.getElementById("wallHeight"),
  slatSpacingWrapper = document.getElementById("slatSpacing"),
  slatWidthWrapper = document.getElementById("slatWidth"),
  calculatedSlatCountWrapper = document.getElementById("calculatedSlatCount"),
  calculatedTotalLengthWrapper = document.getElementById("calculatedTotalLength"),
  wallWidthInput = document.getElementById("wallWidthInput"),
  wallHeightInput = document.getElementById("wallHeightInput"),
  slatSpacingInput = document.getElementById("slatSpacingInput"),
  slatWidthInput = document.getElementById("slatWidthInput"),
  slatContainer = document.getElementById("slatContainer");

/* set starting values */
slatSpacingWrapper.textContent = defaults.slatSpacing;
slatWidthWrapper.textContent = defaults.slatWidth;
window.addEventListener("load", event => {
  calculateAndUpdate();
});

/* Listen to changes */
wallWidthInput.addEventListener("input", handleChange);
wallHeightInput.addEventListener("input", handleChange);
slatSpacingInput.addEventListener("input", handleChange);
slatWidthInput.addEventListener("input", handleChange);

/* Calculate values */
function calculateSlatCount(wallWidth, slatWidth, slatSpacing) {
  // Convert wall width from cm to mm for consistent units
  const wallWidthMm = wallWidth * 10;
  // Number of slats needed horizontally
  const effectiveWidth = slatWidth + slatSpacing; // Total width taken by one slat including spacing (already in mm)
  const slatCount = Math.ceil(wallWidthMm / effectiveWidth);
  if (Number.isNaN(slatCount)) {
    return 0;
  }
  return slatCount;
}
function calculateTotalLength(wallHeight, slatCount) {
  // Total length of slats needed in meters
  const totalLengthCm = wallHeight * slatCount * 1.1; // 10% waste factor
  const totalLengthMeters = totalLengthCm / 100; // Convert to meters

  if (Number.isNaN(totalLengthMeters)) {
    return 0;
  }
  return totalLengthMeters.toFixed(1); // Round to 1 decimal place
}
function updateVisualization(slatCount, slatWidth, slatSpacing) {
  // Clear existing slats
  slatContainer.innerHTML = '';

  // Calculate relative widths for visualization
  const containerWidth = slatContainer.offsetWidth - 40; // Account for padding
  const totalWidth = slatCount * (slatWidth + slatSpacing);
  const scaleFactor = containerWidth / totalWidth;

  // Create slats
  for (let i = 0; i < slatCount; i++) {
    const slat = document.createElement('div');
    slat.style.cssText = `
			height: 100%;
			width: ${slatWidth * scaleFactor}px;
			margin-right: ${slatSpacing * scaleFactor}px;
			background-color: #8b4513;
			border-radius: 2px;
			box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
		`;
    slatContainer.appendChild(slat);
  }
}

/* Handle input change and recalculate */
function handleChange() {
  calculateAndUpdate();
}
function calculateAndUpdate() {
  const wallWidth = parseFloat(wallWidthInput.value),
    wallHeight = parseFloat(wallHeightInput.value),
    slatSpacing = parseFloat(slatSpacingInput.value),
    slatWidth = parseFloat(slatWidthInput.value);
  slatSpacingWrapper.textContent = slatSpacing + " mm";
  slatWidthWrapper.textContent = slatWidth + " mm";
  const slatCount = calculateSlatCount(wallWidth, slatWidth, slatSpacing);
  const totalLength = calculateTotalLength(wallHeight, slatCount);
  calculatedSlatCountWrapper.textContent = slatCount;
  calculatedTotalLengthWrapper.textContent = totalLength;

  // Update visualization
  updateVisualization(slatCount, slatWidth, slatSpacing);
}
/******/ })()
;
//# sourceMappingURL=view.js.map