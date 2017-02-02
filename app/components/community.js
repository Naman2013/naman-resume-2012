var React = require('react');
var ReactDOM = require('react-dom');

var CommunityTypeComponent = React.createClass({
  render: function() {
    // use React.Children.map here instead of props to optimize data retrieval

    var children = React.Children.map(
      this.props.children,
      function(child) {
        return <li>{child}</li>;
      }
    );
    return <ul>{children}</ul>;
  }
});

var CommunityContentTypes = [
  <a href="#" key="type-images">Images</a>,
  <a href="#" key="type-science">Science</a>,
  <a href="#" key="type-artistic">Artistic</a>,
  <a href="#" key="type-spiritual">Spiritual</a>,
  <a href="#" key="type-technical">Technical</a>
];


//ajax for community module
var LatestObject = React.createClass({
  getInitialState: function() {
    return {
      title: '',
      content: ''
    };
  },

  componentDidMount: function() {


this.serverRequest = fetch(this.props.source, {mode: 'no-cors'})
  .then(function(result) {
    return result.json()
  }).then(function(json) {
     var lastPost = json.posts[0];
      this.setState({
        title: lastPost.title,
        content: lastPost.content,
        contentType: lastPost.tags[0].slug
      });
      var contentType =  this.state.contentType.split("-")[0];
    }.bind(this))
   },




  componentWillUnmount: function() {
    this.serverRequest.abort();
  },


  render: function() {
     var rawMarkup = (this.state.content.toString());
    return (
      <div>
        {this.state.title}

        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});



ReactDOM.render(
 <CommunityTypeComponent>

    {CommunityContentTypes}

  </CommunityTypeComponent>,
  document.getElementById('community-module')
);



ReactDOM.render(
  <LatestObject source="http://sloohgalaxytst.wpengine.com/api/get_category_posts/?slug=jupiter" />,
  document.getElementById('community-data'));
