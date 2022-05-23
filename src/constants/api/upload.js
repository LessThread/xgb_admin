//上传图片
export const uploadPic = (file) => {
    let formdata = new FormData();
    formdata.append("file", file)
    return {
        apiPath: 'uploadFile',
        request: {
            body: formdata,
            method: "POST",
            id: "fileUpload"
        }
    }
}

//上传附件
export const uploadApp = (file) => {
    let formdata = new FormData();
    formdata.append("file", file)
    return {
        apiPath: 'uploadFile',
        request: {
            body: formdata,
            method: "POST",
            id: "fileUpload"
        }
    }
}

