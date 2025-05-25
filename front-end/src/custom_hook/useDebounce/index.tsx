import {useState, useEffect} from 'react';
export function useDebounce(keyword: string, delay: number) {
  const [debounceKeyword, setDeounceKeyword] = useState(keyword);
  useEffect(()=>{
    const handlerDelayKeyword = setTimeout(() =>{
        setDeounceKeyword(keyword);
        return ()=>{
            clearTimeout(handlerDelayKeyword);
        }
    },delay);
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword]);
  return debounceKeyword;
}