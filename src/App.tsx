
import { useEffect, useState, type AnimationEvent } from 'react'
import { getScreenBySlug } from './lib/contentful'
import Screen from './components/Screen'
import LoadingConstellation from './components/LoadingConstellation'
import type { SceneData, ScenePhase } from './types/scene'
import './App.css'

const INITIAL_SLUG = '0t'

function getBackgroundUrl(scene: SceneData): string | undefined {
  const imageUrl = scene.backgroundImage?.fields?.file?.url

  if (!imageUrl) return undefined

  return imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl
}

function preloadBackground(scene: SceneData): Promise<void> {
  const url = getBackgroundUrl(scene)

  if (!url) return Promise.resolve()

  return new Promise((resolve) => {
    const image = new Image()
    image.onload = () => resolve()
    image.onerror = () => resolve()
    image.src = url

    if (image.complete) resolve()
  })
}

function App() {
  const [scene, setScene] = useState<SceneData | null>(null)
  const [phase, setPhase] = useState<ScenePhase>('initial')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryKey, setRetryKey] = useState(0)

  const [incomingScene, setIncomingScene] = useState<SceneData | null>(null)
  const [loadingNext, setLoadingNext] = useState(false)
  const [transitionError, setTransitionError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadInitialScene() {
      setLoading(true)
      setError(null)

      try {
        const result = await getScreenBySlug(INITIAL_SLUG)

        if (!result) {
          throw new Error(
            `Nem található kezdőjelenet ezzel a sluggal: ${INITIAL_SLUG}`,
          )
        }

        const nextScene = result.fields as unknown as SceneData
        await preloadBackground(nextScene)

        if (!cancelled) {
          setScene(nextScene)
          setPhase('initial')
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : 'Ismeretlen hiba történt a jelenet betöltésekor.',
          )
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void loadInitialScene()

    return () => {
      cancelled = true
    }
  }, [retryKey])

  async function handleSelectOption(nextSlug: string) {
    if (loadingNext || incomingScene) return

    setLoadingNext(true)
    setTransitionError(null)

    try {
      const result = await getScreenBySlug(nextSlug)

      if (!result) {
        throw new Error(`Nem található jelenet ezzel a sluggal: ${nextSlug}`)
      }

      const nextScene = result.fields as unknown as SceneData

      // Az új háttérkép betöltése a fade előtt.
      await preloadBackground(nextScene)

      setIncomingScene(nextScene)
    } catch (err) {
      setTransitionError(
        err instanceof Error
          ? err.message
          : 'Nem sikerült betölteni a következő jelenetet.',
      )
      setLoadingNext(false)
    }
  }

  function handleTransitionEnd(event: AnimationEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget || !incomingScene) return

    setScene(incomingScene)
    setIncomingScene(null)
    setPhase('initial')
    setLoadingNext(false)
    setTransitionError(null)
  }

  function handleRetry() {
    setRetryKey((current) => current + 1)
  }

  return (
    <main className="metadia">
      <section className="scene">
        {loading && <LoadingConstellation />}

        {!loading && error && (
          <div className="scene-message scene-error" role="alert">
            <h1>Nem sikerült betölteni a jelenetet.</h1>
            <p>{error}</p>
            <button className="retry-button" onClick={handleRetry}>
              Újrapróbálás
            </button>
          </div>
        )}

        {!loading && scene && (
          <>
            <div
              className={`scene-layer ${
                incomingScene
                  ? 'scene-layer--outgoing'
                  : 'scene-layer--current'
              }`}
            >
              <Screen
                scene={scene}
                phase={phase}
                onStartReading={() => setPhase('reading')}
                onContinueReading={() => setPhase('choices')}
                onSelectOption={handleSelectOption}
              />
            </div>

            {incomingScene && (
              <div
                className="scene-layer scene-layer--incoming"
                onAnimationEnd={handleTransitionEnd}
              >
                <Screen
                  scene={incomingScene}
                  phase="initial"
                  onStartReading={() => setPhase('reading')}
                  onContinueReading={() => setPhase('choices')}
                  onSelectOption={handleSelectOption}
                />
              </div>
            )}

            {transitionError && (
              <div className="scene-transition-error" role="alert">
                <p>{transitionError}</p>
                <button onClick={() => setTransitionError(null)}>
                  Bezárás
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  )
}

export default App
