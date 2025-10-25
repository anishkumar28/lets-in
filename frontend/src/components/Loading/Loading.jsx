import React from 'react';
import { PropagateLoader } from 'react-spinners';
import loadingGif from '../../assets/preloader.gif';
import preLoadGif from '../../assets/prelets.gif';
import bg from "../../assets/loaderbg.jpg"

const Loading = () => {
  return (
    <>
      <div style={{ ...styles.loaderContainer, backgroundColor:"#000814" }}>
        <img 
          src={preLoadGif}
          alt="Loading GIF" 
          style={styles.gif} 
        />
        <PropagateLoader size={15} color={"white"} loading={true} />
      </div>
    </>
  );
};

const styles = {
  loaderContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100vw', 
    height: '100vh',
    backgroundColor: 'white', 
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
  },
  gif: {
    marginBottom: '20px',
    height: '250px',
    width: 'auto',
    backgroundColor: 'none'
  },
};

export default Loading;