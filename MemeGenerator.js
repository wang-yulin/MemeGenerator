import React, {Component} from 'react'

class MemeGenerator extends Component {
    constructor() {
        super()
        this.state = {
            topText:'',
            bottomText:'',
            randomImg: "http://i.imgflip.com/1bij.jpg",
            imgUrls: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const updateImgs = response.data.memes
                this.setState({ imgUrls: updateImgs })
            })
    }
    
    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        })
    }
    
    handleSubmit(event) {
        event.preventDefault()
        const randomNum = Math.floor(Math.random() * this.state.imgUrls.length)
        const imgUrl = this.state.imgUrls[randomNum].url
        this.setState({randomImg: imgUrl})
    }
    
    render() {
        return(
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input 
                        name="topText" 
                        value={this.state.topText} 
                        onChange={this.handleChange} 
                    />
                    <input 
                        name="bottomText" 
                        value={this.state.bottomText} 
                        onChange={this.handleChange} 
                    />
                    <button>Gen</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator