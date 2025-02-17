// hooks
import { useEffect } from "react";

const useDelayEffect = (callback, delay, dependencies) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            callback();
        }, delay);

        return () => clearTimeout(timer);
    }, [delay, ...dependencies]);
};

export default useDelayEffect;
