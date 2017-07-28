import React from 'react';
import { Link } from 'react-router';
import './Help.scss';

const COMMUNITY_CONTENT = `
  We've curated a catalog of the most popular objects in the sky which we call the Slooh 500. In the spirit of community, while you are looking at any of these objects through a Slooh telescope, we will share posts about that particular object as made by members of the community. Slooh curates these posts, and true to our mission, welcomes diverse perspectives about what is 'out there', knowing that no one interpretation can ever be definitive. Slooh is open to the spiritual, the artistic, the imaginative, along with the scientific. We will recognize and reward members of the community who make the most popular posts. All posts are freely available to the public, who are invited to participate in the community as well.
`;

const Community = () => (
  <div>
    <div className="help-page-header">
      <h1 className="help-page-title">Community</h1>
      <Link to="about/contact" className="button btn-primary help-page-button">
        Contact Us
      </Link>
    </div>
    <div className="help-page-inner">
      <div className="help-page-section">
        <div className="help-page-paragraph" dangerouslySetInnerHTML={{ __html: COMMUNITY_CONTENT }} />
      </div>
    </div>
  </div>
);

export default Community;
