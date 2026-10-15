
import { useEffect, useState } from 'react'
import { getScreenBySlug } from './lib/contentful'
import './App.css'

type SceneOption = {
  slug: string
  title: string
}

type SceneData = {
  title?: string
  slug?: string
  description?: string
  backgroundImage?: {
    fields?: {
      file?: {
        url?: string
      }
    }
  }
  music?: string
  options?: {
    options?: SceneOption[]
  }
}

function App() {
  const [slug, setSlug] = useState('0N5')
  const [scene, setScene] = useState<SceneData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadScene() {
      setLoading(true)
      setError(null)
      setScene(null)

      try {
        const result = await getScreenBySlug(slug)

        if (!result) {
          throw new Error(`Nem található jelenet ezzel a sluggal: ${slug}`)
        }

        if (!cancelled) {
          setScene(result.fields as unknown as SceneData)
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
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void loadScene()

    return () => {
      cancelled = true
    }
  }, [slug])

  const imageUrl = scene?.backgroundImage?.fields?.file?.url
  const backgroundUrl = imageUrl
    ? imageUrl.startsWith('//')
      ? `https:${imageUrl}`
      : imageUrl
    : undefined

  return (
    <main className="metadia">
      <header className="topbar">
        <a
          className="brand"
          href="/"
          aria-label="Metadia kezdőlap"
          onClick={(event) => {
            event.preventDefault()
            setSlug('0N5')
          }}
        >
          <span className="brand-mark">M</span>
          <span>METADIA</span>
        </a>

        <span className="status">
          <span className="status-dot" />
          Contentful kapcsolat
        </span>
      </header>

      <section className="scene">
        {loading && (
          <div className="scene-message" role="status">
            Jelenet betöltése…
          </div>
        )}

        {!loading && error && (
          <div className="scene-message scene-error" role="alert">
            <h1>Nem sikerült betölteni a jelenetet.</h1>
            <p>{error}</p>
            <button
              className="retry-button"
              onClick={() => setSlug((current) => current)}
            >
              Újrapróbálás
            </button>
          </div>
        )}

        {!loading && !error && scene && (
          <>
            <div
              className="scene-background"
              style={
                backgroundUrl
                  ? { backgroundImage: `url("${backgroundUrl}")` }
                  : undefined
              }
            />

            <div className="scene-overlay" />

            <article className="scene-content">
              <p className="eyebrow">METADIA · {scene.slug}</p>
              <h1>{scene.title || scene.slug}</h1>

              {scene.description && (
                <p className="scene-description">{scene.description}</p>
              )}

              {scene.options?.options &&
                scene.options.options.length > 0 && (
                  <nav
                    className="scene-options"
                    aria-label="Történet folytatása"
                  >
                    {scene.options.options.map((option) => (
                      <button
                        className="scene-option"
                        key={option.slug}
                        onClick={() => setSlug(option.slug)}
                      >
                        <span>{option.title}</span>
                        <span aria-hidden="true">↗</span>
                      </button>
                    ))}
                  </nav>
                )}

              <p className="scene-footer">
                JELENET · {scene.slug}
              </p>
            </article>
          </>
        )}
      </section>
    </main>
  )
}

export default App
