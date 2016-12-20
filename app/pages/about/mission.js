import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
// import style from './static.scss';

class Mission extends Component {

    render() {
        return (

            <article className="static-page">
                <header className="static">

                    <h1 className="big-board">
                        <div className="text-xlarge">Our Mission:</div>
                        <div className="text-regular margin-top-large margin-bottom-small">Everyone Should Have access to</div>
                        <div className="text-xxlarge">The Wonders of </div>
                        <div className="text-ginormous">Space</div>
                    </h1>

                </header>

                <i className="sigil">
                    <img src="/assets/chrome/Siggle-Slooh.svg" width="100" height="100" className="center-center"/>
                </i>

                <section className="row-col margin-bottom-xxlarge">

                    <article className="col-2third">
                        <p>
                            Curabitur lobortis id lorem id bibendum. Ut id consectetur ma wgna. Quisque volutpat augue enim, pulvinar sw nibh lacinia at. Vestibulum nec erat ut mi solliciteudin porttitor id sit amet risus. Nam tempus vel odio vitae aliquam. In imperdiet ereios id lacus vestib dwere wewulum vestibulum. Suspendisse fermentum sem sagittis ante veewe wn ienatis egestas quis vel justo. Maecenas semper suscipit nunc, sed aliqiuam sapien lorem convallis eu. Nulla ut turpis in diam dapibus consequat.
                        </p>

                        <blockquote>
                            Pulvinar lobo nibh lacinia a temu Vesti bulum nec erat ut mi sollicit port titor id sit amet risus lorem.
                        </blockquote>

                        <p>Maecenas semper Curabitur lobortis id lorem id bibendum. Ut idfer consectetur lrene curabitur lobortis id lorem id bibendum. Ut iderw consectetur magna. Quisque volutpat augue enim, pulvinar lobortis nibh lacinia at. Vestibulum nec erat ut mi solliciteudin porttitor id sit amet risus. Nam tempus vel odio vitae aliquam. In imperdiet ereios id lacus vestibulum vestibulum. Suspendisse fermentum sem sagittis ante ven ienatis egestas quis vel justo liaecenas sempe.</p>
                        <p>
                            Curabitur lobortis id lorem id bibendum. Ut id consectetur ma wgna. Quisque volutpat augue enim, pulvinar sw nibh lacinia at. Vestibulum nec erat ut mi solliciteudin porttitor id sit amet risus. Nam tempus vel odio vitae aliquam. In imperdiet ereios id lacus vestib dwere wewulum vestibulum. Suspendisse fermentum sem sagittis ante veewe wn ienatis egestas quis vel justo. Maecenas semper suscipit nunc, sed aliqiuam sapien lorem convallis eu. Nulla ut turpis in diam dapibus consequat.
                        </p>
                        <p>Maecenas semper Curabitur lobortis id lorem id bibendum. Ut idfer consectetur lrene curabitur lobortis id lorem id bibendum. Ut iderw consectetur magna. Quisque volutpat augue enim, pulvinar lobortis nibh lacinia at. Vestibulum nec erat ut mi solliciteudin porttitor id sit amet risus. Nam tempus vel odio vitae aliquam. In imperdiet ereios id lacus vestibulum vestibulum. Suspendisse fermentum sem sagittis ante ven ienatis egestas quis vel justo liaecenas sempe.</p>
                        <p>
                            Curabitur lobortis id lorem id bibendum. Ut id consectetur ma wgna. Quisque volutpat augue enim, pulvinar sw nibh lacinia at. Vestibulum nec erat ut mi solliciteudin porttitor id sit amet risus. Nam tempus vel odio vitae aliquam. In imperdiet ereios id lacus vestib dwere wewulum vestibulum. Suspendisse fermentum sem sagittis ante veewe wn ienatis egestas quis vel justo. Maecenas semper suscipit nunc, sed aliqiuam sapien lorem convallis eu. Nulla ut turpis in diam dapibus consequat.
                        </p>
                    </article>
                    <aside className="col-third">

                        <figure className="">
                            <img src="" width="270" height="317" />
                                <figcaption>
                                    <div className="name">Michael Paolucci</div>
                                    <div className="title">Founder &amp; CEO</div>
                                </figcaption>
                        </figure>

                        <div className="margin-top-med center-center" style={{width: 270}}>
                            <img src="/assets/chrome/signiture-michael.svg" width="200"/>
                        </div>

                    </aside>

                </section>

                <footer className="page">

                    <header className="row-col margin-bottom-xlarge margin-top-xxlarge">
                        <i className="pull-left margin-bottom-med margin-right-med">
                            <img src="./assets/icons/icon-SLT-live.svg" width="60"/>
                        </i>
                        <h1 className="white">Syndicate Live Telescope Coverage</h1>
                        <div className="white text-large">Join our media list and we will provide you with updates on events which include embed codes.</div>
                    </header>

                    <article className="row-col">
                        <p className="col-2third">Since 2003 our live coverage of celestial events has been watched by hundreds of millions of viewers worldwide as eclipses, transits, comets, asteroids and other celestial phenomena unfold in real-time and high definition, while Slooh hosts Bob Berman and Paul Cox interview expert guests. Our coverage has been syndicated to media outlets such as NBC, ABC, CNN, Fox News, National Geographic, Wired, The Weather Channel, the Google Doodle, and was recently covered in The New York Times.</p>

                        <figure className="col-third">
                            <video></video>
                        </figure>
                    </article>

                    <footer className="row-col">
                        <article className="white padding-tb-reg border-dark-top border-dark-bottom">
                            <Link to="about/contact"  className="btn-primary margin-right-large">Contact Us</Link>
                            To join our media list, please send a request to press@slooh.com or call 877-427-5664 x3.

                        </article>
                    </footer>

                </footer>
            </article>

    );
}}

export default Mission;