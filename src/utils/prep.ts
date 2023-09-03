import { MimeType, Origin, Prep } from "@type/prep"

export function getPrepOrigin(prep: string): keyof typeof Origin | void {
  switch (prep) {
    case Prep.HTML:
    case Prep.MARKDOWN:
    case Prep.PUG:
      return "HTML"
    case Prep.CSS:
    case Prep.SASS:
    case Prep.SCSS:
    case Prep.LESS:
    case Prep.STYLUS:
      return "CSS"
    case Prep.JAVASCRIPT:
    case Prep.TYPESCRIPT:
    case Prep.COFFEESCRIPT:
    case Prep.JSX:
    case Prep.VUE2:
    case Prep.VUE3:
      return "JAVASCRIPT"
    default: {
      return
    }
  }
}

export function getOriginByMimeType(mimeType: string): keyof typeof Prep | void {
  switch(mimeType) {
    case MimeType.HTML:
    case MimeType.MARKDOWN:
    case MimeType.PUG:
      return "HTML"
    case MimeType.CSS:
    case MimeType.SASS:
    case MimeType.SCSS:
    case MimeType.LESS:
    case MimeType.STYLUS:
      return "CSS"
    case MimeType.JAVASCRIPT:
    case MimeType.TYPESCRIPT:
    case MimeType.COFFEESCRIPT:
    case MimeType.JSX:
    case MimeType.VUE2:
    case MimeType.VUE3:
     return "JAVASCRIPT"
    default: {
      return
    }
  }
}