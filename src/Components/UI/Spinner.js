import Spinner from 'react-bootstrap/Spinner';

function Loader() {
  return (
    <>
    <div style={{background:'rgb(169,169,169,0.5)',position:'fixed',top:0,bottom:0,left:0,right:0}}>
    <Spinner animation="border" style={{width:'200px',height:'200px',position:'fixed',top:"45%",left:"45%"}}/>
    </div>
    </>
  );
}

export default Loader;