/**
 * Created by hao.cheng on 2017/4/23.
 */
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
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() { //获取sideMenu和第一个数组的信息。
        fetch(`http://120.48.17.78:8080/api/Article/getByPage?nav_id=` + this.state.nav_id + `&pageNum=` + this.state.pageNum + `&pageSize=` + this.state.pageSize, setting)
            .then(function (response) {
                return response.json();
            })
            .then((res) => {
                console.log("@")
                console.log(res)
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
                console.log(res)
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
                    <div style={{ display: `flex`, }}>
                        <input type="checkbox" className='checkbox' />
                        <p className='inP'>{index}</p>
                        <h3>{item.title}</h3>
                    </div>
                )
            })
        }
    }



    render() {

        return (
            <div >
                <BreadcrumbCustom first="资源管理" />

                <div id="root">

                    <div id="left">
                        <div>
                            <div id="sad">
                                <button onClick={() => this.handleClick(87)}>交流园地</button>
                            </div>
                            <div>
                                <button onClick={() => this.handleClick(86)}>理论学习</button>
                            </div>
                            <div>
                                <button onClick={() => this.handleClick(89)}>学工资讯</button>
                            </div>
                            <div>
                                <button onClick={() => this.handleClick(83)}>专题快报</button>
                            </div>
                            <div>
                                <button onClick={() => this.handleClick(84)}>一院一品</button>
                            </div>
                            <div>
                                <button onClick={() => this.handleClick(85)}>通知公告</button>
                            </div>
                        </div>

                        <div id="operate">
                            <div>
                                <button>移动</button>
                                <button>删除</button>
                            </div>

                            <div>
                                <h3>移动到</h3>
                            </div>
                        </div>
                    </div>

                </div>


                <div id="showinf2">
                    <div>
                        {this.show()}
                    </div>
                </div>


            </div >
        )
    }
}

export default Src;