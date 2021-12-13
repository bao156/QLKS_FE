
function getName(name) {
  alert(name);
}

class CacCac extends React.Component{
  constructor(props){
    super(props);
    this.Welcome = this.Welcome.bind(this);
    this.state = { kk: 10 };
    this.state = { index: 1 };
  }
  Welcome() {
    alert(123456);
  }
  incrementCount() {
    this.setState({
      // Important: read `state` instead of `this.state` when updating.
      return {kk: this.state.kk + 1}
    });
  }

  render(){
    return (
      <div>
      <h1 className = "maudo"> {this.props.ten} kêu {this.props.tieng}</h1>
      <p>{this.props.children}</p>
      <p>Giá trị {this.state.kk}</p>
      <button onClick={()=>{getName(this.state.website)}}>Click zo</button>
      <button onClick={() => {
        this.setState({
          index: this.state.index + 1
        })
      }}>Thêm số lượng</button>
      </div>
    )};
  };

  class Lon extends React.Component{
    render(){
      return (
        <h1 className = "maudo"> Gau </h1>
      )};
    };



    ReactDOM.render(
      <div>
      <CacCac ten="Cho" tieng="gau gau">Ngu ngốc đáng ghét</CacCac>
      <CacCac ten="Mèo" tieng="meo meo">Ngu ngốc đáng ghét</CacCac>
      </div>
      ,document.getElementById('root'));
