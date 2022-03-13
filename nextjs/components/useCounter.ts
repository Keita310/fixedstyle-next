import React, { useState } from 'react';

export const useCounter = (init: number = 0) => {

  // countがvueでいうdata変数、setCountaaはcountを変更するための関数
  const [count, setCountaa] = useState(init);

  const increment = () => setCountaa((prevValue) => prevValue + 1);
  const decrement = () => setCountaa((prevValue) => prevValue - 1);

  return { count, increment, decrement };
};