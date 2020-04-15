import React, { useEffect, useRef } from 'react';

const useDidUpdateEffect = (func, deps) => {
    const didUpdate = useRef(false);

    useEffect(() => {
        if (!didUpdate.current) {
         didUpdate.current = true;
         return
        }
        else{
            func();
        }

        return () => {
            didUpdate.current = false;     
        }
    }, deps);
}

export default useDidUpdateEffect;