import React, { Component, PropTypes } from 'react';
import ByUserTag from '../../components/common/by-user-tag/by-user-tag'
import PulsePostDate from '../../components/pulse/pulse-post-date'
import PulsePostImage from '../../components/pulse/pulse-post-image'
import PulsePostTag from '../../components/pulse/pulse-post-tag'
import PulsePostTools from '../../components/pulse/tools/pulse-post-tools'
import styles from './pulse-post.scss';

const PulsePostContent = ({post: { S3Files, tags, title, creationDate, type, typeIconURL, content, avatarURL, displayName, membershipType, memberSince, location, likesCount }}) => {
    
    return (
    
        <div className={styles.PulsePostList}>
        
            <PulsePostImage image={S3Files[0]} imageBy={""}/>
        
            <figure className={styles.PulsePostListInfo}>
                <h2 className={styles.PulsePostListInfoTitle}><div dangerouslySetInnerHTML={{__html: title}}/></h2>
            
                <div className="row">
                    <div className="col-md-6">
                        <ByUserTag theme={"light"} photo={avatarURL} name={displayName} accountType={membershipType}
                                   memberSince={memberSince} location={location}/>
                    </div>
                    <div className="col-md-5 pull-right">
                        <PulsePostTools share={true} />
                    </div>
                </div>
    
                <PulsePostDate date={creationDate} type={type} iconURL={typeIconURL}/>
    
                <figcaption className={styles.PulsePostListInfoDesc}>
                    <div dangerouslySetInnerHTML={{__html: content}} />
                </figcaption>
                
                <PulsePostTag tags={tags}/>
            </figure>
    
        </div>)
    
}


export default PulsePostContent;

