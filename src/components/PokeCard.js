import React,{ Component } from 'react'
import { Link } from 'react-router-dom'

class PokeCard extends Component {
  state = { hover: false }

  hovered = () => this.setState({ hover: !this.state.hover })

  render() {
    const { hover } = this.state
    return(
      <div className="card" onMouseEnter={this.hovered} onMouseLeave={this.hovered}>
        <Link to={`/${this.props.name}`}>
          <div className="card-number">
            <span>{this.props.name.toUpperCase()}</span>
            <span>#{this.props.index + 1}</span>
          </div>
          <div className="card-image-container">
            <img
              src={!hover ? this.props.sprites.front_default : this.props.sprites.back_default}
            />
          </div>
        </Link>
      </div>
    )
  }
}

export default PokeCard
