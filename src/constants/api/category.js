export const getCateLists = () => {
    return {
        apiPath: 'getAllCategory',
        request: {
            method: 'GET'
        }
    }
}

//有别的组件在使用
export const getCategory = () => {
    return {
        apiPath: `getAllCategory`,
        request: {
            method: 'GET',
            mode: 'no-cors',
        }
    }
}

export const getAllCat = () => {
    return {
        url: `getAllCategory`,//'admin/allCat',
        request: {
            method: 'GET',
        }
    }
}

export const addCate = (body) => {
    return {
        url: `addCategory`,//'admin/addCat',
        request: {
            body: body,
            method: 'POST',
            id: 1,
            lisType: 1,
            title: "asd",
            headers: {
                'Content-Type': 'application/json',
            },
        }
    }
}

export const updateCate = (body, id) => {
    return {
        url: `updateCategory`,  //`admin/upCat/${id}`,
        request: {
            body: body,
            method: 'POST',
        }
    }
}

export const deleteCate = (id) => {
    return {
        url: `deleteCategory?id=${id}`,//`admin/delCat/${id}`,
        request: {
            method: 'POST'
        }
    }
}
