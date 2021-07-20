import { useToggle } from 'ahooks';

const UseToggle = () => {
  const [state, { toggle }] = useToggle();

  return (
    <div>
      <p>Current Boolean: {String(state)}</p>
      <p>
        <button onClick={() => toggle()}>Toggle</button>
      </p>
    </div>
  );
};

export default UseToggle;
