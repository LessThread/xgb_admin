
export const getBannerInfo = () => {
    return {
        apiPath: `banner/getAll`,//  http://101.42.225.75:8080/api/banner/getAll 
        request: {
            method: "GET",
            mode: 'no-cors',
        }
    }
}

export const addBanner = (pic, title, nav_id, mes_id, rank) => {
    let formdata = new FormData();
    formdata.append("picture", pic);
    formdata.append("title", title);
    formdata.append("nav_id", nav_id);
    formdata.append("mes_id", mes_id);
    formdata.append("rank", rank);
    return {
        apiPath: `banner/update`,
        request: {
            method: "POST",
            mode: 'no-cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: formdata,
        }
    }
}

export const editBanner = (pic, title, nav_id, mes_id, rank, id) => {
    let formdata = new FormData();
    formdata.append("picture", pic);
    formdata.append("title", title);
    formdata.append("nav_id", nav_id);
    formdata.append("mes_id", mes_id);
    formdata.append("rank", rank);
    formdata.append("id", id);
    return {
        apiPath: `banner/update`,
        request: {
            method: "POST",
            mode: 'no-cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: formdata,
        }
    }
}


export const delBanner = (id) => {
    return {
        apiPath: `banner/delete?id=` + id,
        request: {
            method: "POST",
            mode: 'no-cors',
        }
    }
}


export const showMessageList = (id) => {
    return {
        apiPath: `queryMessag?=${id}`,
        request: {
            method: "POST",
            mode: 'no-cors',
        }
    }
}