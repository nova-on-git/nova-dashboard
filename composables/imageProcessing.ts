import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"
import imageCompression from "browser-image-compression"

// const { $storage } = useNuxtApp()

export async function compressImage(file: File, compressionDecimal: number = 0.75) {
    const options = {
        maxSizeMB: (file.size / 1024 / 1024) * compressionDecimal,
        maxWidthOrHeight: undefined,
        useWebWorker: true,
        initialQuality: compressionDecimal,
    }

    try {
        const compressedImage = await imageCompression(file, options)

        return compressedImage
    } catch (error) {
        console.error("Error compressing image", error)
    }
}

export async function saveFileToStorage($storage, fileObj: File, preview = false) {
    const file = fileObj
    const previewWidth = preview ? 300 : null
    const previewHeight = preview ? null : null
    const fullSizeWidth = null
    const fullSizeHeight = null

    let blob

    if (preview) {
        blob = await resizeImage(file, previewWidth, previewHeight)
    } else {
        blob = await resizeImage(file, fullSizeWidth, fullSizeHeight)
    }

    const resizedFile = new File([blob], file.name, { type: file.type })
    const fileName = resizedFile.name

    const randomNumber = getRandomNumber(32)

    const filePath = preview ? `images/previews/${randomNumber}` : `images/${randomNumber}`
    const fileRef = storageRef($storage, filePath)

    const snapshot = await uploadBytes(fileRef, resizedFile)
    const url = await getDownloadURL(snapshot.ref)

    console.log(`${preview ? "Preview" : "Full-size"} URL Created:`, url)

    return url
}

export function resizeImage(file: File, targetWidth = null, targetHeight = null) {
    return new Promise((resolve, reject) => {
        const img = new Image()
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")

        img.onload = function () {
            let width = img.width
            let height = img.height

            // If targetWidth or targetHeight is null, calculate the new size based on aspect ratio
            if (targetWidth && !targetHeight) {
                const aspectRatio = width / height
                height = targetWidth / aspectRatio
                width = targetWidth
            } else if (!targetWidth && targetHeight) {
                const aspectRatio = width / height
                width = targetHeight * aspectRatio
                height = targetHeight
            } else if (targetWidth && targetHeight) {
                width = targetWidth
                height = targetHeight
            }

            // Set canvas dimensions
            canvas.width = width
            canvas.height = height

            // Draw image on canvas
            ctx.drawImage(img, 0, 0, width, height)

            // Convert canvas to blob
            canvas.toBlob((blob) => {
                resolve(blob)
            }, file.type)
        }

        img.onerror = reject

        const reader = new FileReader()
        reader.onload = function (e) {
            img.src = e.target.result
        }
        reader.onerror = reject
        reader.readAsDataURL(file)
    })
}

export async function processImage($storage, imageObj: ProductImage) {
    let imageObject = {
        preview: imageObj.preview || "",
        fullSize: imageObj.fullSize || "",
    }

    if (!imageObj.preview) {
        imageObject.preview = await saveFileToStorage($storage, imageObj.file, true)
    }

    if (!imageObj.fullSize) {
        imageObject.fullSize = await saveFileToStorage($storage, imageObj.file, false)
    }

    return imageObject
}
