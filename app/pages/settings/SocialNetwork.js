import React from 'react';
import Header from './common/header';

const SocialNetwork = () => (
  <div className="settings social">
    <article>

        <Header
          headerCopy="Edit Social Networks"
        />

        <section className="account-details row-page">

            <h2>Staying in touch with social…</h2>
            <p className="sans-serif">It&apos;s easier to share if you securely store your social media passwords on Slooh.</p>


            <div className="border-top margin-bottom-large row-med">
                <div className="border-bottom">
                    <div className="col-3fifth padding-top-small padding-bottom-small sans-serif">
                        Facebook
                    </div>

                    <div className="col-fifth sans-serif border-left text-center padding-small">
                        <a href="" className="pull-right">Edit</a>
                    </div>
                </div>
                <div className="border-bottom">
                    <div className="col-3fifth padding-top-small padding-bottom-small sans-serif">
                        Twitter
                    </div>

                    <div className="col-fifth sans-serif border-left text-center padding-small">
                        <a href="" className="pull-right">Edit</a>
                    </div>
                </div>
                <div className="border-bottom">
                    <div className="col-3fifth padding-top-small padding-bottom-small sans-serif">
                        Google+
                    </div>

                    <div className="col-fifth sans-serif border-left text-center padding-small">
                        <a href="" className="pull-right">Edit</a>
                    </div>
                </div>
                <div className="border-bottom">
                    <div className="col-3fifth padding-top-small padding-bottom-small sans-serif">
                        Instagram
                    </div>

                    <div className="col-fifth sans-serif border-left text-center padding-small">
                        <a href="" className="pull-right">Edit</a>
                    </div>
                </div>
                <div className="border-bottom">
                    <div className="col-3fifth padding-top-small padding-bottom-small sans-serif">
                        Pintrest
                    </div>

                    <div className="col-fifth sans-serif border-left text-center padding-small">
                        <a href="" className="pull-right">Edit</a>
                    </div>
                </div>
                <div className="border-bottom">
                    <div className="col-3fifth padding-top-small padding-bottom-small sans-serif">
                        Reddit
                    </div>

                    <div className="col-fifth sans-serif border-left text-center padding-small">
                        <a href="" className="pull-right">Edit</a>
                    </div>
                </div>

            </div>


        </section>

    </article>
  </div>
);

export default SocialNetwork;
