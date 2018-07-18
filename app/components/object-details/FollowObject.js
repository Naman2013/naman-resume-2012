/***********************************
* V4 Follow Object 
* Button Component that can toggles 
* user's state of following a specific object
***********************************/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetchFollowObject from '../../services/objects/follow-object';



class FollowObject extends Component {
	constructor() {
		super();
		this.state = {
			followingFlag: false, //if user is now following the object
			canFollowFlag: false,	// ‘True’ if the user can choose to follow the object
			showFollowPromptFlag:	false,	// Should a follow/stop following control be displayed?
			followPrompt: '' //	Text for the follow/stop following control
		};
	}

	componentDidMount() {
    const {
      user,
			objectId,
			prompt
		} = this.props;

		this.setState({followPrompt: prompt});
	}

	toggleFollow = (e) => {		
		e.preventDefault();
    const {
      objectId,
      user,
		} = this.props;
		
		fetchFollowObject({
			at: user.at,
			token: user.token,
			cid: user.cid,
			objectId,
		}).then((res) => {
			if (!res.data.apiError) {
				this.setState({
					followingFlag: res.data.followingFlag,
					canFollowFlag: res.data.canFollowFlag,
					showFollowPromptFlag:	res.data.showFollowPromptFlag,
					followPrompt: res.data.followPrompt
				});
			}
		})
	};


	render() {
		return (
			<button className="follow-btn" onClick={this.toggleFollow}>{this.state.followPrompt}
			<style jsx>{`
				.follow-btn {
					position: absolute;
					padding: 10px 5px;
					border: 1px solid white;
					font-size: 14px;
					width: 160px;
					text-align: center;
					left: 5%;
					bottom: 10%;
					cursor: pointer;
					background-color: #3C4A55;
					text-transform: uppercase;
				}
			`}</style>
			</button>	
		);
	}

}

export default FollowObject;