import { useState } from "react";

export default function useArray(maxLenght = null) {
  const [array, setArray] = useState([]);

  function ensureMaxLenght(array = []) {
    if (maxLenght && maxLenght < array.length) {
      array.shift();
    }
  }

  function push(newElement) {
    let newArray = [...array, newElement];
    ensureMaxLenght(newArray);
    setArray(newArray);
  }

  function pop(index) {
    const newArray = array.filter((v, i) => i !== index);
    console.log(newArray);
    setArray(newArray);
  }

  function reset() {
    setArray([]);
  }

  return { array, push, pop, reset };
}
