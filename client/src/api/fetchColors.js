import axiosWithAuth from "./axiosWithAuth";
const fetchColors = () => {
    return axiosWithAuth()
        .get("/colors")
        .then((r) => r.data);
}

export default fetchColors;