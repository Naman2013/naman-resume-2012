import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AstronomerQuestionListItem from './ask-astronomer-question-list-item';
import { fetchAstronomerQuestionList } from '../../modules/ask-astronomer-question-list/actions';
import { black, darkBlueGray, white, turqoise } from '../../styles/variables/colors';
import { secondaryFont } from '../../styles/variables/fonts';

const {
  arrayOf,
  bool,
  func,
  number,
  shape,
  string,
} = PropTypes;

const mapStateToProps = ({
  astronomerQuestionList,
}) => ({
  astronomerQuestionList,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    fetchAstronomerQuestionList,
  }, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class AstronomerQuestionList extends Component {
  static defaultProps = {
    asrronomerQuestionList: {},
  }

  static propTypes = {
    actions: shape({
      fetchAstronomerQuestionList: func.isRequired,
    }),
    astronomerQuestionList: shape({}),
  }

  constructor(props) {
    super(props)

    props.actions.fetchAstronomerQuestionList({
      answerState: 'unanswered'
    });
  }

  render() {
    const {
      astronomerQuestionList,
    } = this.props;

    return (
      <div className="ask-astronomer-question-list">
        <div>
          <h3>Activity Feed: This Just In, Just For You</h3>
          <h4>Questions from the community</h4>
        </div>
        <div># new questions! Earn gravity by mentoring in the Slooh community</div>
        <div>
          {astronomerQuestionList.threads.map(question => <AstronomerQuestionListItem {...question} key={question.threadId} />)}
        </div>
        <style jsx>{`


        `}</style>
      </div>
    )
  }
}

export default AstronomerQuestionList;
