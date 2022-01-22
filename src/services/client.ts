import React from "react";
import axios from "axios";

const api = axios.create({
    baseURL: 'https://ip-fast.com/api'
})

export default api;