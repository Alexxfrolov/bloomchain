import React from "react"
import FroalaEditor from "react-froala-wysiwyg"
import "froala-editor/js/plugins/paragraph_format.min.js"
import "froala-editor/js/plugins/lists.min.js"
import "froala-editor/js/plugins/align.min.js"
import "froala-editor/js/plugins/font_size.min.js"
import "froala-editor/js/plugins/colors.min.js"
import "froala-editor/js/plugins/link.min.js"
import "froala-editor/js/plugins/image.min.js"
import "froala-editor/js/plugins/table.min.js"
import "froala-editor/js/plugins/url.min.js"
import "froala-editor/js/plugins/quote.min.js"
import "froala-editor/js/plugins/video.min.js"
import "froala-editor/js/plugins/quick_insert.min.js"
import "froala-editor/js/plugins/image_manager.min.js"
import "froala-editor/js/plugins/fullscreen.min.js"
import "froala-editor/js/third_party/embedly.min.js"
import "froala-editor/js/languages/ru.js"
import "froala-editor/css/froala_editor.pkgd.min.css"

import { config } from "./config"

type EditorProps = {
  options?: typeof config
  value: string
  onChange: (value: string) => void
}

export const Editor = ({ options = config, value, onChange }: EditorProps) => (
  <FroalaEditor
    tag="textarea"
    config={options}
    model={value}
    onModelChange={onChange}
  />
)
