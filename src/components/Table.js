import React from 'react'

import './Table.css';

const Table = ({scores, teamsNames}) => {
  const reverseScores = [...scores].reverse();
  return (
    <div className='Card register'>
      <h2 className='title'>Registro</h2>
      <div className="table-register">
        <div className="table-head row">
          <div className="inning">Entrada</div>
          <div className="visitor">{teamsNames.visitor}</div>
          <div className="home">{teamsNames.home}</div>
        </div>
        {
          reverseScores.map( (item, index) => (
            <div className="row-inning row" key={index}>
              <div className="inning">{reverseScores.length - index}</div>
              <div className="visitor">{item.visitor}</div>
              <div className="home">{item.home}</div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Table