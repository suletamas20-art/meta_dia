
import type { SceneData, ScenePhase } from '../types/scene'
import './Screen.css'

type ScreenProps = {
  scene: SceneData
  phase: ScenePhase
  onStartReading: () => void
  onContinueReading: () => void
  onSelectOption: (slug: string) => void
}

function Screen({
  scene,
  phase,
  onStartReading,
  onContinueReading,
  onSelectOption,
}: ScreenProps) {
  const imageUrl = scene.backgroundImage?.fields?.file?.url

  const backgroundUrl = imageUrl
    ? imageUrl.startsWith('//')
      ? `https:${imageUrl}`
      : imageUrl
    : undefined

  return (
    <section className="screen">
      <div
        className="screen-background"
        style={
          backgroundUrl
            ? { backgroundImage: `url("${backgroundUrl}")` }
            : undefined
        }
      />

      <div className="screen-overlay" />

      {/* Kezdőképernyő fekete takarása */}
      <div
        className={`screen-start-shade ${
          phase === 'initial' ? 'screen-start-shade--visible' : ''
        }`}
        aria-hidden="true"
      />

      <div className={`screen-content screen-content--${phase}`}>
        {phase === 'initial' && (
          <button
            className="screen-start"
            onClick={onStartReading}
          >
            Folytatni akarom a történetet
          </button>
        )}

        {phase === 'reading' && (
          <button
            className="screen-reading"
            onClick={onContinueReading}
            aria-label="Tovább a választási lehetőségekhez"
          >
            {scene.description && (
              <span className="screen-description">
                {scene.description}
              </span>
            )}
          </button>
        )}

        {phase === 'choices' && (
          <nav
            className="screen-options"
            aria-label="Történet folytatása"
          >
            {scene.options?.options?.map((option) => (
              <button
                className="screen-option"
                key={option.slug}
                onClick={() => onSelectOption(option.slug)}
              >
                {option.title}
              </button>
            ))}
          </nav>
        )}
      </div>
    </section>
  )
}

export default Screen
