
import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Spin, Select, Button, Table, Tabs, message } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import LocalizedModal from '../ui/Modals';
import { CONFIRM_JUMP, CONFIRM_DELETE } from '../../constants/common';
import { fetchApi } from '../../callApi';
import { ADMIN_nav_list, getNavAllArticle } from '../../constants/api/navi';
import { removeArticle, deleteArticle } from '../../constants/api/source';
import { getCateLists } from '../../constants/api/category';
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';

import './banners/Src.scss';

const { TabPane } = Tabs;
const { Option, OptGroup } = Select;
const success = (content) => {
    message.success(content);
};
const error = (content) => {
    message.error(content);
}

const setting = {
    method: "GET",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    mode: "cors",
    cache: "default",
};


class Src extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nav_id: 87,
            show: null,
            pageNum: 1,
            pageSize: 10,
            accdat: [],
            isFinished: 0,
            traTo: null,
            f5: 0,
            value: [],
            selectVal: null,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        fetch(`http://120.48.17.78:8080/api/Article/getByPage?nav_id=` + this.state.nav_id + `&pageNum=` + this.state.pageNum + `&pageSize=` + this.state.pageSize, setting)
            .then(function (response) {
                return response.json();
            })
            .then((res) => {
                console.log("@")
                // console.log(res)
                this.setState({
                    accdat: res.data.res,
                    isFinished: 1,
                },
                    () => {
                        console.log(this.state.accdat)
                        console.log(this.state.accdat[0])

                    })
            })
    }

    handleClick = (id, num) => {

        num = 1;
        fetch(`http://120.48.17.78:8080/api/Article/getByPage?nav_id=` + id + `&pageNum=` + num + `&pageSize=` + this.state.pageSize, setting)
            .then(function (response) {
                return response.json();
            })
            .then((res) => {
                console.log("@")
                // console.log(res)
                this.setState({
                    accdat: res.data.res,
                    isFinished: 1,
                },
                    () => {
                        console.log(this.state.accdat)
                        console.log(this.state.accdat[0])

                    })
            })

    }

    show = () => {

        console.log("this is show")
        console.log(this.state.accdat)

        if (this.state.isFinished) {
            return this.state.accdat.map((item, index) => {
                return (
                    <div style={{ display: `flex`, justifyContent: `space-between`, margin: `10px`, }}>
                        <div style={{ display: `flex`, justifyContent: `space-between` }}>

                            <div style={{ height: `20px`, margin: `5px`, }}>
                                <br></br>
                                <input type="checkbox" className='checkbox' value={index} name="message" onChange={this.getInp} />
                            </div>

                            <div>
                                <h3 className='inP'></h3>
                                <h3>{index + 1}&emsp;{item.title}</h3>
                                <h4>修改时间:{item.updated_at}</h4>
                            </div>
                        </div>

                        <div>
                            <button className='operateButEdit'>编辑</button>
                        </div>


                    </div>
                )
            })
        }
    }

    getInp = (event) => {
        let item = event.target.value;
        // ...运算符取出参数对象中的所有可遍历属性，拷贝到当前对象之中
        let items = [...this.state.value];
        console.log(items)
        // 查找脚标a
        let index = items.indexOf(item);
        // 如果有就剔除，如果没有就加上
        {
            index === -1 ? items.push(item) : items.splice(index, 1)
        }
        // 更新原有数据
        console.log("before")
        console.log(items)
        console.log(this.state.value)
        this.setState({
            value: items
        });
        console.log("after")
        console.log(items)
        console.log(this.state.value)
    }

    del = () => {
        let url = `http://120.48.17.78:8080/api/Article/multiDelete`
    }

    handleSelectChange(e) {
        let val = e.target.value
        this.setState({
            selectVal: val
        });

    }

    changeSel = () => {
        let sel = this.state.selectVal;
        let lis = this.state.value;
        let url = `http://120.48.17.78:8080/api/Article/updateArticleNav?nav_id=` + sel + `&updataList=` + lis
        fetch(url).then(
            this.setState({
                f5: this.state.f5++,
            })
        )
    }



    render() {

        return (
            <div >
                <BreadcrumbCustom first="资源管理" />
                <div id="root">

                    <div id="left">
                        <div>
                            <div id="sad">
                                <button onClick={() => this.handleClick(87)} className="meau">交流园地</button>
                            </div>
                            <div>
                                <button onClick={() => this.handleClick(86)} className="meau">理论学习</button>
                            </div>
                            <div>
                                <button onClick={() => this.handleClick(89)} className="meau">学工资讯</button>
                            </div>
                            <div>
                                <button onClick={() => this.handleClick(83)} className="meau">专题快报</button>
                            </div>
                            <div>
                                <button onClick={() => this.handleClick(84)} className="meau">一院一品</button>
                            </div>
                            <div>
                                <button onClick={() => this.handleClick(85)} className="meau">通知公告</button>
                            </div>
                        </div>

                        <div id="operate">

                            <div className='operateBox'>
                                <button className='operateBut'>上一页</button>
                                <button className='operateBut'>下一页</button>
                            </div>

                            <div className='operateBox'>
                                <button className='operateBut' onClick={this.changeSel}>移&emsp;动</button>
                                <button className='operateBut' id="del" onClick={this.del}>删&emsp;除</button>
                            </div>


                            <div className='operateBox'>
                                <h3>移动到</h3>
                                <select className='dropdown' onChange={this.handleSelectChange.bind(this)}>
                                    <option value={86} onChange>理论学习</option>
                                    <option value={87}>交流园地</option>
                                    <option value={89}>学工资讯</option>
                                    <option value={83}>专题快报</option>
                                    <option value={84}>一院一品</option>
                                    <option value={85}>通知公告</option>
                                </select>
                            </div>

                        </div>
                    </div>



                    <div id="showinf2">
                        <div>
                            {this.show()}
                        </div>
                    </div>


                </div>

            </div >
        )
    }
}

export default Src;