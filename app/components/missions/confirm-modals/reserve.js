import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { WithContext as ReactTags } from 'react-tag-input';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from '../mission-modals.scss';


function mapDispatchToProps(dispatch) {
  return {
  };
}

function mapStateToProps({ missions }) {
  return { missions };
}

@connect(mapStateToProps, mapDispatchToProps)


export default class ReserveConfirm extends React.Component {

  constructor(props) {
    super(props)
    this.onImageProcessingChange = this.onImageProcessingChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleAddition = this.handleAddition.bind(this)
    this.handleChangeObject = this.handleChangeObject.bind(this)
  }

  componentWillMount() {
    this.setState({
      image_processing: 'generic',
      objective: '',
      tags: [
        {id: 1, text: "galaxy"},
        {id: 2, text: "andromeda"},
        {id: 3, text: "canary islands"},
        {id: 4, text: "m31"},
        {id: 5, text: "deep space"}
      ]
    });
  }

  handleChangeObject(event) {
    this.setState({objective: event.target.value});
  }

  handleDelete(){
      console.log('del');
  }

  handleAddition(){
    console.log('add');
  }

  handleDrag(){
    console.log('drag');
  }

  onImageProcessingChange(event){
    this.setState({image_processing: event.target.value});
  }

  onSubmit(){
    console.log(this.state);
  }

  render () {
    let suggestions = ["mars", "jupiter", "moon", "saturn"];
    return (
      <Modal show={this.props.mission.isConfirmationOpen} className="missionModal reserveMissionModal">
        <div className="title-bar">
          <h3>Please complete your reservation form within 04:47</h3>
        </div>
        <Modal.Header>
          <h1>You’re reserving the Canary Islands 1 Telescope to see:</h1>
          <img className={styles.cardIcon} src="assets/icons/Jupiter.svg" />
          <h2>Andromeda Galaxy (M31)</h2>
        </Modal.Header>

        <Modal.Body>
          <div className="mission-schedule">
            <h4>Mission Details:</h4>
            <p>Thursday, October 18th 10:05pm EST, 7:05pm PST, 3:05 UTC</p>
          </div>

          <div className="share-objectives">
            <h4>SHARE YOUR MISSION OBJECTIVES:</h4>
            <textarea placeholder="It’s optional, but would you consider succinctly describing your thoughts on the mission? Anything goes, tweet style."
              value={this.state.objective}
              onChange={this.handleChangeObject}></textarea>
          </div>

          <div className="mission-tags">
            <h4>MISSION TAGS:</h4>
              <ReactTags tags={this.state.tags}
                  suggestions={suggestions}
                  handleDelete={this.handleDelete}
                  handleAddition={this.handleAddition}
                  handleDrag={this.handleDrag} />
          </div>

          <div className="mission-image-options">
            <h4>IMAGE PROCESSING:</h4>
            <label htmlFor="generic">
              <input type="radio" name="image" id="generic" value="generic" checked={this.state.image_processing == "generic"} onChange={ this.onImageProcessingChange } />
              Generic
            </label>
            <label htmlFor="fits">
              <input type="radio" name="image" id="fits" value="fits" checked={ this.state.image_processing == "fits"} onChange={ this.onImageProcessingChange } />
              FITS
            </label>
            <label htmlFor="notsure">
              <input type="radio" name="image" id="notsure" value="notsure" checked={ this.state.image_processing == "notsure"} onChange={ this.onImageProcessingChange } />
              Not Sure
            </label>
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button className="btn-primary" onClick={this.props.closeModal}>Sorry, Cancel this.</Button>
          <Button className="btn-primary" onClick={this.onSubmit}>Absolutely!</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
