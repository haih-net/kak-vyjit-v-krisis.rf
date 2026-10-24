export interface ContentPageData {
  readonly path: string
  readonly title: string
  readonly description: string
  readonly image: {
    readonly src: string
    readonly srcSet: string
    readonly alt: string
  }
}
