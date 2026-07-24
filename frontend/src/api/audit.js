import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:8085/api/v1",
});
export async function auditUrl(url) {
    const response = await api.post("/audit", {
        url,
    });
    return response.data;
}
