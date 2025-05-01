import { useSelector, useDispatch } from 'react-redux';

const Lab4 = () => {
  const counter = useSelector((state) => state.counter); 
  const dispatch = useDispatch();

  const increment = () => {
    dispatch({ type: 'INCREMENT' });
  };

  const decrement = () => {
    dispatch({ type: 'DECREMENT' });
  };

  return (
    <div>
      <h2>Счётчик: {counter}</h2>
      <button onClick={increment}>Увеличить</button>
      <button onClick={decrement}>Уменьшить</button>
    </div>
  );
};

export default Lab4;
