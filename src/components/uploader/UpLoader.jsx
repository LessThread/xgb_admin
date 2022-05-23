









import React, { Component } from 'react';
import { Form, Upload, Button, Icon, message, Col, Row, Tooltip } from 'antd';
// import reqwest from "reqwest";

const switchModel = (type) => {
    if (type === "image") {
        return ({
            "url": "http://120.48.17.78:8080/api/uploadFile",
            "text": "上传图片",
        });
    } else if (type === "file") {
        return ({
            "url": "http://120.48.17.78:8080/api/uploadFile",
            "text": "上传附件",
        });
    }
}

class UpLoaderModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            imgPath: null,
            fileList: [],
        }
    }

    componentDidMount = () => {
        console.log(this.props.initialData)
        if (this.props.initialData) {
            let data = this.props.initialData;
            let list = [];
            for (let i = 0; i < data.length; i++) {
                list.push(
                    {
                        uid: i + 1,
                        name: data[i].filename,
                        status: 'done',
                        url: data[i].url,
                    }
                )
            }
        }
    }

    // customImgRequest = (option) => {
    //     //自定义上传方式
    //     const formData = new FormData();
    //     const fileUrl = "https://xuegong.twt.edu.cn/api/uploadPic";
    //     console.log("customImgReq:" + option.file);
    //     formData.append('file', option.file, option.file.name);
    //     console.log(option)
    //     reqwest({
    //         url: fileUrl,
    //         method: 'post',
    //         processData: false,
    //         data: formData,
    //         success: (res) => {
    //             //res为文件上传成功之后返回的信息，res.responseText为接口返回的值
    //             console.log("服务器返回：" + res);
    //             let fileInfo = JSON.parse(res);
    //             if (res) {
    //                 this.setState({
    //                     fileInfo: fileInfo,
    //                     loading: false,
    //                     uploading: false,
    //                     defaultFile: false
    //                 })
    //             }

    //         },
    //         error: () => {
    //             this.setState({
    //                 loading: false,
    //                 uploading: false
    //             })
    //             message.error("文件上传失败！");
    //         },
    //     });
    // }

    beforeImageUpload(file) {
        let isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt8M = file.size / 1024 / 1024 < 8;
        // console.log(file.size)
        if (!isJpgOrPng) {
            message.error('请上传JPG/PNG格式的图片文件!');
        }
        if (!isLt8M) {
            message.error('文件大小请勿超过8MB');
        }
        return isJpgOrPng && isLt8M;
    }

    beforeFileUpload(file) {
        const limit = file.size / 1024 / 1024 < 8;
        if (!limit) {
            message.error('文件大小请勿超过8MB');
        }
        return limit;
    }

    handleChange = info => {

        // console.log(info.file, info.fileList)
        const { getLink } = this.props;
        console.log(info.file.originFileObj)
        if (this.props.type === "image") {
            let flist = [];
            //flist 的第0项用来表示绑定的列表
            flist.push(this.props.bindTo)
            //控制列表长度
            let listLimit = 0 - parseInt(sessionStorage.getItem("listLimit"));
            // console.log(listLimit);
            let fileList = [...info.fileList];
            fileList = fileList.slice(listLimit);
            this.setState({ fileList });

            if (info.file.status !== 'uploading') {
                //文件上传中
                console.log(info.file);
                this.setState({ loading: true });
            }

            if (info.file.status === 'done') {
                console.log(info.fileList);
                this.setState({ loading: false });
                flist.push(info.fileList[0].response.data.path);
                if (info.fileList.length > 0) {
                    for (let i = 1; i < info.fileList.length; i++) {
                        flist.push(info.fileList[i].response.data.path);
                        flist.push(info.fileList[i].response.data.icon);
                    }
                }
                message.success(`图片上传成功：${info.file.name}`);
                if (info.file.response.data.path && getLink) {
                    getLink(flist);
                }
            } else if (info.file.status === 'error') {
                message.error(`图片上传失败：${info.file.name}`);
            }
        } else if (this.props.type === "file") {
            let flist = [];
            //flist 的第0项用来表示绑定的列表
            flist.push(this.props.bindTo)
            //控制列表长度
            let listLimit = 0 - parseInt(sessionStorage.getItem("listLimit"));
            let fileList = [...info.fileList];
            fileList = fileList.slice(listLimit);
            this.setState({ fileList });
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }

            if (info.file.status === 'done') {
                flist.push(info.fileList[0].response.data.path);
                if (info.fileList.length > 0) {
                    for (let i = 1; i < info.fileList.length; i++) {
                        flist.push(info.fileList[i].response.data.path)
                    }
                }
                message.success(`文件上传成功：${info.file.name}`);
                if (info.file.response.data.path && getLink) {
                    getLink(flist);
                }
                console.log(info.fileList);
                // let filelist = JSON.stringify(info.fileList);
            } else if (info.file.status === 'error') {
                message.error(`文件上传失败：${info.file.name}`);
            }
        }
    }









    render() {
        //文件列表长度控制
        if (this.props.numberLimit) {
            sessionStorage.setItem("listLimit", this.props.numberLimit);
        } else {
            sessionStorage.setItem("listLimit", 0);
        }
        // console.log(-sessionStorage.getItem("listLimit"));
        // const { getLink } = this.props;


        const imageReqSettings = {
            name: 'fileUpload',
            accept: "image/png, image/jpeg",
            action: switchModel("image").url,
            beforeUpload: this.beforeImageUpload,
            listType: 'picture',
            onChange: this.handleChange,
            headers: {
                "X-Requested-With": null,
            },
            method: 'post',

        }


        const fileReqSettings = {
            name: 'fileUpload',
            ref: "upload",
            action: switchModel("file").url,
            beforeUpload: this.beforeFileUpload,
            listType: 'text',
            onChange: this.handleChange,
            //id: "fileUpload",
        }

        const { getFieldDecorator } = this.props.form;
        return (
            <Form.Item label={this.props.disLabel ? null : `上传`} >
                {this.props.type === "image" ?
                    <div>
                        {getFieldDecorator(`image${this.props.bindTo}`, {
                            rules: [
                                {
                                    required: this.props.necessary,
                                    message: '请选择一个图片',
                                },
                            ],
                        })(
                            <Row>
                                <Col span={8}>
                                    <Upload {...imageReqSettings}
                                        fileList={this.state.fileList}>
                                        <Tooltip placement="top" title="小于8MB的图片 格式为jpg/png">
                                            <Button><Icon type={this.state.loading ? "loading" : "upload"} />上传图片</Button>
                                        </Tooltip>
                                    </Upload>
                                </Col>
                            </Row>
                        )}
                    </div>
                    : null}
                {this.props.type === "file" ?
                    <div>
                        {getFieldDecorator(`file${this.props.bindTo}`, {
                            rules: [
                                {
                                    required: this.props.necessary,
                                    message: '请选择一个文件',
                                },
                            ],
                        })(
                            <Row>
                                <Col span={8}>
                                    <Upload {...fileReqSettings}
                                        fileList={this.state.fileList}>
                                        <Tooltip placement="top" title="小于8MB的文件 格式不限">
                                            <Button>
                                                <Icon type={this.state.loading ? "loading" : "upload"} />上传附件
                                            </Button>
                                        </Tooltip>
                                    </Upload>
                                </Col>
                            </Row>
                        )}
                    </div>
                    : null}
            </Form.Item>
        )
    }
}

const UpLoader = Form.create({ name: "uploadModel" })(UpLoaderModel);
export default UpLoader;  