import { useEffect, useRef, useState } from "react";
import axios from "./axios";

export const useAxios = (url: string, method: string, payload: any = null) => {
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);
    const controllerRef = useRef(new AbortController());
    const cancel = () => {
        controllerRef.current.abort();
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.request({
                    data: payload,
                    signal: controllerRef.current.signal,
                    method,
                    url,
                });

                setData(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoaded(true);
            }
        })();
    }, []);

    return { cancel, data, error, loaded };
};