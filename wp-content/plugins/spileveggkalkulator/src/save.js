/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save() {
	return (
		<div { ...useBlockProps.save() }>
			<div className="spilevegg-calculator">
				<div className="calculator-inputs">
					<div className="wall-dimensions" style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #eee' }}>
						<div className="input-group" >
							<label htmlFor="wallWidthInput">Vegg bredde (cm):</label>
							<input type="number" id="wallWidthInput" defaultValue="400" value={400}/>
						</div>

						<div className="input-group" >
							<label htmlFor="wallHeightInput">Vegg høyde (cm):</label>
							<input type="number" id="wallHeightInput" defaultValue="240" value={240} />
						</div>
					</div>

					<div className="input-group">
						<label htmlFor="slatSpacingInput">Mellomrom mellom spiler (mm):</label>
						<span className='range-input-group'><input type="range" id="slatSpacingInput" defaultValue="15" value={15} min={0} max={100} step="1" />
						<span id="slatSpacing"></span></span>
					</div>

					<div className="input-group">
						<label htmlFor="slatWidthInput">Spilebredde (mm):</label>
						<span className='range-input-group'><input type="range" id="slatWidthInput" defaultValue="48" value={48} min={1} max={200} step="1" />
						<span id="slatWidth"></span></span>
					</div>
				</div>

				<div className="calculator-results">
					<div className="result-group">
						<label>Antall spiler:</label>
						<span id="calculatedSlatCount">0</span>
					</div>

					<div className="result-group">
						<label>Total lengde/løpemeter (m):</label>
						<span id="calculatedTotalLength">0</span>
					</div>
				</div>

				<div className="slat-visualization" style={{ 
					height: '200px', 
					border: '1px solid #ddd',
					borderRadius: '4px',
					marginTop: '2rem',
					position: 'relative',
					overflow: 'hidden',
					background: '#f8f9fa'
				}}>
					<div id="slatContainer" style={{
						height: '100%',
						display: 'flex',
						alignItems: 'stretch',
						padding: '20px'
					}}></div>
				</div>

			</div>
		</div>
	);
}
