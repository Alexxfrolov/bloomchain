import { mediaApi } from "@api/media"

export const config = {
  height: 385,
  language: "ru",
  placeholderText: "Напечатайте что-нибудь",
  countCharacters: true,
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
        "insertLink",
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
        "paragraphFormat",
        "quote",
        "alignLeft",
        "alignCenter",
        "alignRight",
        "formatUL",
      ],
      align: "left",
      buttonsVisible: 2,
    },
    moreRich: {
      buttons: ["alert", "insertTable", "insertImage", "insertVideo"],
      align: "left",
      buttonsVisible: 3,
    },
    moreMisc: {
      buttons: ["embedly", "undo", "redo"],
      align: "right",
      buttonsVisible: 3,
    },
  },
  quickInsertButtons: ["image", "video", "table", "ul", "quote"],
  imageManagerDeleteURL: "/admin/api/v1/media",
  imageManagerDeleteMethod: "DELETE",
  imageManagerLoadURL: "/admin/api/v1/media",
  imageManagerLoadParams: { type: "image", editor: "true" },
  imageManagerToggleTags: false,
  imageManagerDeleteParams: "",
  videoAllowedTypes: ["mp4", "avi"],
  events: {
    "image.beforeUpload": function (fileList: FileList) {
      const uploadImage = async () => {
        const image = {
          file: fileList[0],
          type: "image",
        }
        const response = await mediaApi.create(image)

        this.image.insert(response.data.url, false, null, this.image.get())
        this.popups.hideAll()
      }

      uploadImage()

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
