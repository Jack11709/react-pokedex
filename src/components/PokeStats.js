import React from 'react'

const PokeStats = props => {

  const titlecase = str => str[0].toUpperCase() + str.substr(1)
  const statsArray = props.stats.map(s => ({...s, stat: titlecase(s.stat.name)}))

  return(
    <div className="stats-container">
      <div className="stats-table">
        <div className="table-head">
          <div className="head-cell">Stat Name</div>
          <div className="head-cell">Base Level</div>
          <div className="head-cell">Effort</div>
        </div>
        <div className="table-body">
          {statsArray.map((row, i) => (
            <div key={i} className="body-row">
              <div className="body-cell">{row.stat}</div>
              <div className="body-cell">{row.base_stat}</div>
              <div className="body-cell">{row.effort}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PokeStats
