export const config = {
  height: 385,
  language: "ru",
  placeholderText: "",
  paragraphFormat: {
    N: "Normal",
    H1: "Heading 1",
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
      buttons: ["undo", "redo"],
      align: "right",
      buttonsVisible: 2,
    },
  },
  quickInsertButtons: ["image", "video", "table", "ul", "qoute"],
  imageManagerDeleteURL: "/admin/api/v1/media",
  imageManagerDeleteMethod: "DELETE",
  imageManagerLoadURL: "/admin/api/v1/media",
  imageManagerLoadParams: { type: "image", editor: "true" },
  imageManagerToggleTags: false,
  imageManagerDeleteParams: "",
  events: {
    "image.beforeUpload": function(images: FileList) {
      const uploadImage = async () => {
        const image = {
          file: images[0],
          type: "image",
        }
        const { data } = await mediaApi.create(image)

        this.image.insert(data.link, false, null, this.image.get())
        this.popups.hideAll()
      }

      uploadImage()

      return false
    },
    // "imageManager.imagesLoaded": function(data) {
    //   const json = JSON.parse(data)
    //   return json.data.reduce((acc, image) => [...acc, { url: image.link }], [])
    // },
    "imageManager.imageLoaded": function() {
      console.log("imageLoaded")
    },
    "imageManager.beforeDeleteImage": function($img) {
      // Do something before deleting an image from the image manager.
      alert("Image will be deleted.")
    },
    "imageManager.imageDeleted": function(data) {
      // Do something after the image was deleted from the image manager.
      alert("Image has been deleted.")
    },
    "imageManager.error": function(error, response) {
      console.log(arguments)
      // Bad link. One of the returned image links cannot be loaded.
      if (error.code == 10) {
      }

      // Error during request.
      else if (error.code == 11) {
      }

      // Missing imagesLoadURL option.
      else if (error.code == 12) {
      }

      // Parsing response failed.
      else if (error.code == 13) {
        console.log("error")
      }
    },
  },
}
