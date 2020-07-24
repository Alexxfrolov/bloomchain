import React from "react"
import FroalaEditor from "react-froala-wysiwyg"
import "froala-editor/js/plugins/paragraph_format.min.js"
import "froala-editor/js/plugins/lists.min.js"
import "froala-editor/js/plugins/align.min.js"
import "froala-editor/js/plugins/font_size.min.js"
import "froala-editor/js/plugins/colors.min.js"
// import "froala-editor/js/plugins/image.min.js"
import "froala-editor/js/plugins/table.min.js"
import "froala-editor/js/plugins/url.min.js"
import "froala-editor/js/plugins/video.min.js"
import "froala-editor/js/plugins/quick_insert.min.js"
import "froala-editor/js/plugins/paragraph_format.min.js"
import "froala-editor/js/plugins/special_characters.min.js"
import "froala-editor/js/plugins/quote.min.js"
import "froala-editor/js/plugins/line_height.min.js"
import "froala-editor/js/plugins/code_view.min.js"
import "froala-editor/js/plugins/fullscreen.min.js"
import "froala-editor/js/third_party/embedly.min.js"
import "froala-editor/js/plugins/line_breaker.min.js"
import "froala-editor/js/plugins/char_counter.min.js"
import "froala-editor/js/languages/ru.js"
import "froala-editor/css/froala_editor.pkgd.min.css"
import "froala-editor/css/third_party/embedly.min.css"

import "./plugins/link"
import "./plugins/image"
import "froala-editor/js/plugins/image_manager.min.js"

import { config } from "./config"

type EditorProps = {
  options?: typeof config
  content: string
  onChange: (value: string) => void
}

export function RichEditor(props: EditorProps) {
  const { options = config, content, onChange } = props

  return (
    <FroalaEditor
      tag="textarea"
      config={options}
      model={content}
      onModelChange={onChange}
    />
  )
}
