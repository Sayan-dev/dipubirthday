import { makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Background from '../Default/Background';
import "./Home.css";

const useStyles=makeStyles(theme=>({

    text:{
        ...theme.typography.body1
    }

}))
const audio=new Audio("https://dl.dropbox.com/s/c6aq63o2mwuvkui/Happy-Birthday-to-you-Singing-Bell.mp3")

const Home = () => {
    const classes=useStyles()

    const [audioPlay, setState] = useState(false)

    useEffect(() => {
        alert("Touch the cake 🎂 and enjoy the party 🎶🎵🎉🎊");

    }, [])


    function play(){
        setState(true);
        console.log(audio);
        audio.play();
      }
    
    function pause(){
      setState(false);
        audio.pause(); 
      }

    const audioHandler=()=>{
      console.log(audioPlay)

      if(audioPlay){
        pause()
      }
      else {
        play()
      }  
    }




    return (
    <>
    <Background
        image='https://thumbs.gfycat.com/AcrobaticCleverAegeancat-size_restricted.gif'
    
    />
            <div className="home_wish">

Happy Birthday

</div>

<div className="home_cake" onClick={audioHandler}>

<div className="home_plate"></div>

<div className="home_layer"></div>

<div className="home_icing">

   <div className="home_name">

       <p>Our Beloved<br/>Depanwita</p>

   </div>

</div>

<div className="home_candle1">

   <div className="home_flame1"></div>

</div>



<div className="home_candle2">

   <div className="home_flame2"></div>

</div>



<div className="home_candle3">

   <div className="home_flame3"></div>

</div>



<div className="home_candle4">

   <div className="home_flame4"></div>

</div>



<div className="home_candle5">

   <div className="home_flame5"></div>

</div>

</div>



<div className="home_text">

May all your dreams come true and May God crown you with all the success in life. Wishing you many returns of this day. Happy birthday!

</div>





        </>

    );
};

export default Home;