import { mediaApi } from "@api/media"

export const config = {
  key:
    process.env.NODE_ENV === "production"
      ? "nQE2uD1C2A1B1C2B2lsE-11G-10H-9xuC-21yptA2nhbA2B6C4B3F4B2A2C3G2D1=="
      : null,
  height: 500,
  placeholderText: "Напечатайте что-нибудь",
  countCharacters: true,
  toolbarSticky: false,
  paragraphFormat: {
    N: "Normal",
    H2: "Heading 2",
    H3: "Heading 3",
    H4: "Heading 4",
    H5: "Heading 5",
    H6: "Heading 6",
  },
  toolbarButtons: {
    moreText: {
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikeThrough",
        "subscript",
        "superscript",
        "fontSize",
        "textColor",
        "backgroundColor",
        "inlineClass",
        "inlineStyle",
        "clearFormatting",
      ],
      align: "left",
      buttonsVisible: 2,
    },
    moreParagraph: {
      buttons: [
        "alignLeft",
        "alignCenter",
        "formatOLSimple",
        "alignRight",
        "alignJustify",
        "formatOL",
        "formatUL",
        "paragraphFormat",
        "paragraphStyle",
        "lineHeight",
        "outdent",
        "indent",
        "quote",
      ],
      align: "left",
      buttonsVisible: 2,
    },
    moreRich: {
      buttons: [
        "insertLink",
        "insertImage",
        "insertVideo",
        "insertTable",
        "specialCharacters",
        "embedly",
        "insertHR",
      ],
      align: "left",
      buttonsVisible: 2,
    },
    moreMisc: {
      buttons: ["undo", "redo", "fullscreen", "selectAll", "html", "help"],
      align: "right",
      buttonsVisible: 2,
    },
  },
  quickInsertButtons: ["image", "ul", "table"],
  imageManagerDeleteURL: "/admin/api/v1/media",
  imageManagerDeleteMethod: "DELETE",
  imageManagerLoadURL: "/admin/api/v1/media",
  imageManagerLoadParams: {
    type: "image",
    editor: "true",
    page: 1,
    page_size: 50,
  },
  imageManagerToggleTags: false,
  imageManagerDeleteParams: "",
  videoAllowedTypes: ["mp4", "avi"],
  imageUploadURL: "/admin/api/v1/media",
  imageUploadParams: {
    type: "image",
  },
  events: {
    "image.uploaded": function (response) {
      const { url, srcset } = JSON.parse(response)
      this.image.insert(url, false, null, this.image.get(), srcset)
      return false
    },
    "video.beforeUpload": function (fileList: FileList) {
      const uploadVideo = async () => {
        const data = {
          file: fileList[0],
          type: "video",
        }
        const response = await mediaApi.create(data)

        const video = `<video controls="controls"><source src="${response.data.url}" /></video>`

        this.video.insert(video)
        this.popups.hideAll()
      }

      uploadVideo()

      return false
    },
  },
}
