import React from 'react'

export default function Hero()
{
    const[meme,setMeme]=React.useState(
        {
            topText:"",
            bottomText:"",
            imageUrl:"http://i.imgflip.com/1bij.jpg"
        }
    )
  
    function handleChange(event){
        const {name, value} = event.target
         setMeme( prevValue => {
             return {
                 ...prevValue,
                 [name]: value
             }
         })
    }
    const [memeImg,setMemeImg]=React.useState([])
    React.useEffect(()=>{
        fetch("https://api.imgflip.com/get_memes")
        .then(res=>res.json())
        .then(data=>setMemeImg(data.data.memes))
    },[])
    
    function generateMeme()
    {
     
        const randomNum = Math.floor(Math.random()*memeImg.length)
        const randomUrl = memeImg[randomNum].url
        setMeme( prevMeme =>
            ({
                    ...prevMeme,
                    imageUrl:randomUrl
                
            }))
    }
    return(

        <div className="hero--content">
            <form class="form" onSubmit={(e) => e.preventDefault()}>
            <input type="text" className="form--ip" placeholder="Top Text" name="topText" onChange={handleChange} value={meme.topText}/>
            <input type="text" className="form--ip" placeholder="Bottom Text" name="bottomText" onChange={handleChange} value={meme.bottomText}/>
            <button className="form--button" onClick={generateMeme}>
                Generate Meme
            </button>
            
            </form>
           <div className="meme">
                <img className="hero--img" src={meme.imageUrl} alt="memeImage"/>
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </div>
    )
}