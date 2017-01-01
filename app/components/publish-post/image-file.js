import React, { Component } from 'react';
import style from './image-file.scss';

class ImageFile extends Component {
  constructor(props) {
    super(props);

    this.state =  {
      src: '',
      loading: false
    }
  }

  componentWillMount() {
    this.update();
  }

  componentWillReceiveProps(nextProps) {
    this.update(nextProps);
  }

  update(props) {
    const reader = new FileReader();

    const { file } = props ? props : this.props;

    reader.readAsDataURL(file);
    reader.onloadstart = () => this.setState({src: '', loading: true});
    reader.onload = e => this.setState({src: e.target.result, loading: false});
  }

  render() {
    return(
      <div className="image-wrapper">
        {this.state.loading ? <div className="loading"></div> : null}
        <img src={this.state.src} alt=""/>
      </div>
    )
  }
}

export default ImageFile;
