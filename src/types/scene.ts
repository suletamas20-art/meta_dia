
export type SceneOption = {
  slug: string
  title: string
}

export type ScenePhase =
  | 'initial'
  | 'reading'
  | 'choices'
  | 'transition'

export type SceneData = {
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
  voice?: string
  animation?: string
  timeLimit?: number
  timeoutScreen?: string
  options?: {
    options?: SceneOption[]
  }
}
