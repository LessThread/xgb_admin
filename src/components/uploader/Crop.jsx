import React, { Component } from "react";
import Cropper from "react-cropper";
import PropTypes from "prop-types";
import "../../style/cropper.scss";
import "cropperjs/dist/cropper.css";
import { uploadPic } from "../../constants/api/upload";
import { fetchApi } from "../../callApi";

export default class CropperModal extends Component {
  static propTypes = {
    uploadedImageFile: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      src: null,
      link: null,
      fox: null,
    };
  }

  componentDidMount() {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      const dataURL = e.target.result;
      this.setState({ src: dataURL });
    };

    fileReader.readAsDataURL(this.props.uploadedImageFile);
  }

  handleSubmit = () => {
    if (!this.state.submitting) {

      console.log(this.state.fox);
      // TODO: 这里可以尝试修改上传图片的尺寸
      this.cropper.getCroppedCanvas().toBlob((blob) => {

        // 创造提交表单数据对象
        const formData = new FormData();
        // 添加要上传的文件
        let filename = this.props.uploadedImageFile.name;
        formData.append("file", blob, filename);
        let simg;


        //let test = this.myCropper.getCroppedCanvas().toDataURL('image/jpeg')
        //..........................
        let cr = this.state.src
        function dataURLtoFile(cr, filename) {
          var arr = cr.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          simg = new File([u8arr], filename, { type: mime })
          return simg;
        }


        //base64图片数据
        var $dataurl = this.cropper.getCroppedCanvas().toDataURL()
        //this.state.src;

        //上传到服务器
        var arr = $dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        var obj = new Blob([u8arr], { type: mime });
        var fd = new FormData();
        fd.append("file", obj, "image.png");
        this.setState({ fox: fd });


        //保存图片到本地 

        (function (t) {
          var dlLink = t || document.createElement("a");
          if (!t) {
            dlLink.id = 'dlLink';
            dlLink.download = '文件名';
            document.body.appendChild(dlLink);
          }
          dlLink.href = $dataurl;
          dlLink.click();
        })(document.querySelector("#dlLink"));

        // 显示为网页图片
        // <img id="testImg" src="" />
        // document.querySelector("#testImg").src = dataurl;
        document.querySelector("#testImg").src = $dataurl;



        //..........................

        //let fx = this.myCropper.getCanvasData()
        let fx = this.state.src;
        console.log("$$$$$$$" + $dataurl + "#####" + fd)






        // let url = `http://120.48.17.78:8080/api/uploadFile`;

        // const settings = {
        //   method: "POST",
        //   body: fx,
        //   id: "fileUploas",
        //   // headers: {
        //   //   Content: 'application/x-www-form-urlencoded'
        //   // },
        //   enctype: "multipart/form-data"
        // };

        // // 提示开始上传
        // this.setState({ submitting: true });
        // // console.log(url, settings)
        // // 上传图片


        // fetch(url, settings)
        //   .then((res) => res.json())
        //   .then((data) => {
        //     // console.log("aaa")
        //     // console.log(data.data.path)
        //     sessionStorage.setItem("imgUrl", data.data.path);
        //     this.props.getLink(data.data.path);
        //     // if(this.props.)
        //     // this.setState({
        //     //     link: data.data.path
        //     // })
        //   });





        // 把选中裁切好的的图片传出去

        // 关闭弹窗

        //..............................................

        //..............................................
        this.props.onClose();
      });
    }
  };

  handleSend = () => {
    var fox = this.cropper.getCroppedCanvas().toDataURL('image/jpeg')
    console.log(fox);
    this.props.handleSend(fox)
  }

  render() {
    return (
      <div className="class-cropper-modal">
        <div className="modal-panel">
          <div className="cropper-container-container">
            <div className="cropper-container">
              <Cropper
                src={this.state.src}
                className="cropper"
                ref={(cropper) => (this.cropper = cropper)}
                // Cropper.js options
                viewMode={1}
                zoomable={1}
                width={this.props.wid}
                height={this.props.hei}
                aspectRatio={this.props.wid / this.props.hei} // 固定为1:1  可以自己设置比例, 默认情况为自由比例
                guides={1}
                preview=".cropper-preview"
              />
            </div>
            <div className="preview-container">
              <div className="cropper-preview" />
            </div>
          </div>
          <div className="button-row">

            {/* <div className="submit-button" onClick={this.handleSubmit}>
              提交
            </div> */}

            <div>
              <button onClick={this.handleSend}>send msg to my father</button>
            </div>

          </div>
        </div >
      </div >
    );
  }
}
