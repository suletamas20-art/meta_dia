
import './LoadingConstellation.css'

function LoadingConstellation() {
  return (
    <div
      className="constellation-loader"
      role="status"
      aria-label="Jelenet betöltése"
    >
      <svg
        className="constellation-loader__art"
        viewBox="0 0 240 240"
        aria-hidden="true"
      >
        <circle className="constellation-loader__orbit constellation-loader__orbit--one" cx="120" cy="120" r="76" />
        <circle className="constellation-loader__orbit constellation-loader__orbit--two" cx="120" cy="120" r="57" />

        <g className="constellation-loader__lines">
          <path d="M73 91 L108 59 L151 79 L169 119 L143 157 L99 169 L65 133 Z" />
          <path d="M108 59 L99 169 M73 91 L143 157 M151 79 L65 133" />
          <path d="M120 16 L120 44 M120 196 L120 224 M16 120 L44 120 M196 120 L224 120" />
        </g>

        <g className="constellation-loader__stars">
          <circle cx="73" cy="91" r="3" />
          <circle cx="108" cy="59" r="4" />
          <circle cx="151" cy="79" r="3" />
          <circle cx="169" cy="119" r="4" />
          <circle cx="143" cy="157" r="3" />
          <circle cx="99" cy="169" r="4" />
          <circle cx="65" cy="133" r="3" />
          <circle cx="120" cy="120" r="2.5" />
        </g>

        <g className="constellation-loader__sparkles">
          <path d="M120 34 L124 44 L120 54 L116 44 Z" />
          <path d="M120 186 L124 196 L120 206 L116 196 Z" />
          <path d="M34 120 L44 116 L54 120 L44 124 Z" />
          <path d="M186 120 L196 116 L206 120 L196 124 Z" />
        </g>
      </svg>
    </div>
  )


export default LoadingConstellation
