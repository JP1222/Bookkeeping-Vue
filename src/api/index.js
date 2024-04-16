import http from './http';

// 获取表格数据
export function fetchData(currentPage, pageSize) {
    return http.request({
        url: "/consumptionrecord/all",
        method: 'get',
        params: {
            pageNum: currentPage,
            pageSize
        }
    })
}

export function deleteData(id) {
    return http.request({
        url: "/consumptionrecord",
        method: 'delete',
        params: {
            id
        }
    })
}

export function insertData(time, amount, type) {
    return http.request({
        url: "/consumptionrecord",
        method: 'post',
        data: {
            time,
            amount,
            typeName: type,
            receipt: null,
            id: null
        }
    })
}

export function updateData(time, amount, type) {
    return http.request({
        url: "/consumptionrecord",
        method: 'put',
        data: {
            time,
            amount,
            typeName: type,
            receipt: null,
            id: null
        }
    })
}