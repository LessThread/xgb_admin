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
            nav_id: 0,
            show: null,
            pageNum: 1,
            pageSize: 10,
            accdat: null,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() { //获取sideMenu和第一个数组的信息。
        fetch(``)
    }


    show() {
        if (this.state.nav_id !== 0) {
            return this.state.accdat.map((item, index) => {
                return (
                    <div key={index} style={{}}>
                        {item.title}
                        <div>{this.state.pageNum}</div>
                    </div>
                )
            })
        }
        else {
            return (
                <div>
                    waiting
                </div>
            )
        }
    }


    handleClick($id) {
        this.state.nav_id = $id;
        this.setState({
            nav_id: $id
        })

        console.log(this.state.id);

        if ($id !== 0) {
            fetch(`http://120.48.17.78:8080/api/Article/getByPage?nav_id=` + this.state.nav_id + `&pageNum=` + this.state.pageNum + `&pageSize=` + this.state.pageSize, setting)
                .then(function (response) {
                    return response.json();
                })
                .then((rest) => {
                    console.log("@")
                    console.log(rest)
                    this.setState({
                        accdat: rest.data.res
                    },
                        () => {
                            console.log(this.state.accdat)
                            // this.show()
                        })
                })
        }
    }


    render() {

        return (
            <div>
                <BreadcrumbCustom first="资源管理" />

                <div>

                    <div id="sad">
                        <button onClick={() => this.handleClick(86)}>交流园地</button>
                    </div>
                    <div>
                        <div>理论学习</div>
                    </div>
                    <div>
                        <div>学工资讯</div>
                    </div>
                    <div>
                        <div>专题快报</div>
                    </div>
                    <div>
                        <div>一院一品</div>
                    </div>
                    <div>
                        <div>通知公告</div>
                    </div>
                </div>

                TEST
                <div id="showinf">
                    id:{this.state.nav_id}
                </div>
                <div>
                    {this.show()}
                </div>

            </div >
        )
    }
}

export default Src;