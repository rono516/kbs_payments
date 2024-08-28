import { useEffect, useState } from "react";
import axios from "axios";
import { error } from "console";

export const appAlgorithmKey = "FOSA";
const baseUrl = 'http://127.0.0.1:8000/api';

export default function useUserInfo() {
    const [userInfo, setUserInfo] = useState(null)
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        const access_token = localStorage.getItem("access_token")

        if (access_token) {
            axios.get(`${baseUrl}/user-info/`, {
                headers: {
                    'Authorization': `Bearer ${access_token}`
                }
            }).then(response => {
                setUserInfo(response.data)
            }).catch(error => {
                console.error(error);
                setErrorMsg('Failed to fetch user info')
            })
        }
    }, []);
    return { userInfo, errorMsg };
}