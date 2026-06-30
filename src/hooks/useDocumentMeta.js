import { useEffect } from 'react'

export function useDocumentMeta(title, description) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = title

    const metaDescription = document.querySelector('meta[name="description"]')
    const previousDescription = metaDescription?.getAttribute('content')
    if (metaDescription && description) {
      metaDescription.setAttribute('content', description)
    }

    const ogTitle = document.querySelector('meta[property="og:title"]')
    const previousOgTitle = ogTitle?.getAttribute('content')
    if (ogTitle) ogTitle.setAttribute('content', title)

    const ogDescription = document.querySelector('meta[property="og:description"]')
    const previousOgDescription = ogDescription?.getAttribute('content')
    if (ogDescription && description) ogDescription.setAttribute('content', description)

    return () => {
      document.title = previousTitle
      if (metaDescription && previousDescription) metaDescription.setAttribute('content', previousDescription)
      if (ogTitle && previousOgTitle) ogTitle.setAttribute('content', previousOgTitle)
      if (ogDescription && previousOgDescription) ogDescription.setAttribute('content', previousOgDescription)
    }
  }, [title, description])
}
