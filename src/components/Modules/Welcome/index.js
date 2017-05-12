import React from 'react';

const Welcome = ({goToNextQuote}) => {
  return (
    <div>
      Welcome to Quoter.me
      <br />
      <button onClick={goToNextQuote}>Найти рандомную цитату</button>
    </div>
  )
}

export default Welcome;