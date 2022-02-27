import { useCounter } from "../components/useCounter";
import Header from "../components/organisms/header";

export default function App() {
  const { count, increment, decrement } = useCounter(10);

  const incrementDouble = () => {
    increment();
    increment();
  };

  const decrementDouble = () => {
    decrement();
    decrement();
  };

  return (
    <div className="App">
      <Header
        description="ピストバイク初心者 パーツやトリック、カスタムのことなら【Fixed Style】"
      />
      <h1>Count: {count}</h1>
      <button onClick={incrementDouble}>2 増やす</button>
      <button onClick={decrementDouble}>2 減らす</button>
    </div>
  );
}