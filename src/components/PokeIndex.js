import React, { Component, Fragment } from 'react'
import axios from 'axios'

import PokeCard from './PokeCard'

class PokeIndex extends Component {
  state = {}

  getPokemonData = data => {
    Promise.all(data.map(i => axios.get(i.url)))
      .then(res => this.setState({ pokemon: res.map(i => i.data) }))
      .catch(err => console.log(err))
  }

  componentDidMount() {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=402')
      .then(res => this.getPokemonData(res.data.results))
      .catch(err => console.log(err))
  }

  render() {
    const { pokemon } = this.state
    return (
      <Fragment>
        <div className="container">
          {!pokemon ?
            <div className="load" />
            :
            pokemon.map((poke, index) => <PokeCard key={poke.name} {...poke} index={index} />)
          }
        </div>
      </Fragment>
    )
  }

}

export default PokeIndex
