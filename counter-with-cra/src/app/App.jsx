import React from 'react';
import './App.css';
import {
  CounterFunction,
  CounterClass,
  Button,
  LifeCycle,
} from '../components';

import { API_ENDPOINT } from '../components/LifeCycle/LifeCycle';

function renderComponents(isVisible) {
  if (isVisible) {
    return (
      <>
        <h2>함수 컴포넌트</h2>
        <CounterFunction count={2} />
        <h2>클래스 컴포넌트</h2>
        <CounterClass step={3} />
        <h2>버튼 컴포넌트</h2>
        <Button />
      </>
    );
  } else {
    return null;
  }
}

function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [data, setData] = React.useState('');
  // 여기서 data는 문자라고 가정

  // 사이드 이펙트 처리하는 hook 활용해보자!
  React.useEffect(()=>{
    // useEffect에서는 동기만 작성해야함! async 사용할 수 없음.
    // 중괄호 안에서는 사용할 수 있지만 callback 함수 자체를 async 함수로 만들 수 없음.
    async function fetchData() {
      try {
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();

        setData(data.results);
      } catch(error){
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();

    // console.log('componentDidMount');
  }, [])
  // 여기서 []빈 배열을 넣지 않는다면 상태가 업데이트 될 때 마다 계속해서 리 렌더링이 됨
  // 계속된다면 성능 부분에서 저하될 수 있음. 그래서 기본으로 빈 배열을 넣어줌!!



  
  // 상태 변수(state variable)
  const [isVisibleComponents, updateIsVisibleComponents] = React.useState(false);

  // 함수 안에 이벤트 핸들러 작성
  const handleToggleVisible = () => {
    updateIsVisibleComponents(!isVisibleComponents);
  }
  return (
    <div className="App">
      <h2>라이프 사이클</h2>
      <button type="button" onClick={handleToggleVisible}>{isVisibleComponents.toString()}</button>
      <LifeCycle />
      {isVisibleComponents && <LifeCycle />}
      {renderComponents(isVisibleComponents)}
    </div>
  );
}

export default App;
