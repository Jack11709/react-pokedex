import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'

import PokeStats from './PokeStats'

class PokeShow extends Component {
  state = {}

  componentDidMount() {
    this.getData()
    this.timer = setInterval(this.changeImage, 2000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  componentDidUpdate(prevProps) {
    if( prevProps.match.params.id !== this.props.match.params.id) this.getData()
  }

  getData = () => {
    Promise.all([
      axios.get(`https://pokeapi.co/api/v2/pokemon/${this.props.match.params.id}`),
      axios.get(`https://pokeapi.co/api/v2/pokemon-species/${this.props.match.params.id}`)
    ])
      .then(res => {
        const sprites = this.spritesArray(res[0].data.sprites)
        const image = res[0].data.sprites.front_default
        const data = {...res[0].data, sprites}
        this.setState({ data, image, species: res[1].data })
      })
      .catch(err => console.log(err))
  }

  spritesArray = sprites => {
    let spritesArray = []
    for (const key in sprites) {
      if (sprites[key]) {
        spritesArray = [...spritesArray, sprites[key]]
      }
    }
    return spritesArray
  }

  randomImage = images => images[Math.floor(Math.random() * images.length)]

  changeImage = () => {
    const { image, data: { sprites }} = this.state
    let nextImage = this.randomImage(sprites)
    while (image === nextImage) {
      nextImage = this.randomImage(sprites)
    }
    this.setState({ image: nextImage })
  }

  dexEntry = arr => arr.find(f => f.language.name === 'en').flavor_text


  render() {
    const { data, image, species } = this.state
    if (!data) return <div className="load"></div>
    return (
      <div className="show-container">
        <div className="show-header">
          <div className="show-image">
            <img src={image} />
          </div>
          <div className="show-title">
            <h2>#{data.id} {data.name.toUpperCase()}</h2>
          </div>
        </div>
        <div className="show-main">
          <div>
            <i>{`"${this.dexEntry(species.flavor_text_entries)}"`}</i>
          </div>
          <div>
            <p>
              Types: {data.types.map((t,i) => <span key={i}> {t.type.name.toUpperCase()}</span>)}
            </p>
            <p>
              Abilities: {data.abilities.map((t,i) => <span key={i}> {t.ability.name.toUpperCase()}</span>)}
            </p>
            {species.evolves_from_species &&
              <p>Evolves from:
              <Link to={`${species.evolves_from_species.name}`}>{species.evolves_from_species.name.toUpperCase()}
              </Link>
              </p>
            }
            <p>
              Base Experience: {data.base_experience}
            </p>
          </div>
          <PokeStats {...data} />
        </div>
      </div>
    )
  }

}

export default withRouter(PokeShow)
