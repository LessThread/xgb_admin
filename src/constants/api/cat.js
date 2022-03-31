export const getCategory = () => {
    return {
        apiPath: `getAllCategory`,//`admin/category`,
        request: {
            method: 'GET',
            mode: 'no-cors',

        }
    }
}