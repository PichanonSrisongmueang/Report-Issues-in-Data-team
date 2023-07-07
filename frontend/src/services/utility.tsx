import { string } from "zod";

const apiUrl = "http://localhost:8080";

const convertType = (data: string | number | undefined | null) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val
}

const convertTypeString = (data: number | undefined | null) => {
    let val = typeof data !== "string" ? String(data) : data;
    return val
}
export {apiUrl, convertType,convertTypeString}