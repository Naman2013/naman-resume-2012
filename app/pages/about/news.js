import React, {Component, PropTypes} from 'react';
// import style from './about.scss';

class News extends Component {
    render() {
        return (
            <section className="row-col margin-bottom-xxlarge">

                <article className="margin-bottom-large">

                    <figure className="article">
                        <img src="../assets/images/photos/stellar-community.jpg" />
                            <figcaption><cite>[Citation]</cite></figcaption>
                    </figure>

                    <header className="article-title-info">

                        <h1 className="clearfix margin-bottom-large">[This is the very long title to this story, which goes on and on…]</h1>

                        <aside className="byline">
                            <div className="headshot"></div>
                            <cite className="author">[Author's Name]</cite> <cite className="publication">[publication]</cite>
                            <cite className="location">[City, State, coutry]. Member since [Year]</cite>
                        </aside>

                        <aside className="social-media">
                            <span className="flame"><i><img src="../assets/icons/flame.png" /></i> <strong>[###]</strong>/[###]</span>
                            <span className="like"><i><img src="../assets/icons/heart.svg" /><span className="number">###</span></i> Like</span>
                            <span className="share"><i><img src="../assets/icons/share.svg" /></i> Share</span>
                        </aside>

                    </header>

                    <article className="col-wide">

                        <aside className="date-section"> Posted on
                            <date>[Date]</date> in <a href="">[Section Name]</a>
                        </aside>
                        <p>
                            Curabitur lobortis id lorem id bibendum. Ut id consectetur ma wgna. Quisque volutpat augue enim, pulvinar sw nibh lacinia at. Vestibulum nec erat ut mi solliciteudin porttitor id sit amet risus. Nam tempus vel odio vitae aliquam. In imperdiet ereios id lacus vestib dwere wewulum vestibulum. Suspendisse fermentum sem sagittis ante veewe wn ienatis egestas quis vel justo. Maecenas semper suscipit nunc, sed aliqiuam sapien lorem convallis eu. Nulla ut turpis in diam dapibus consequat. </p>

                        <blockquote>
                            [Pulvinar lobo nibh lacinia a temu Vesti bulum nec erat ut mi sollicit port titor id sit amet risus lorem.]
                            <cite className="attribution">[Citation]</cite>

                        </blockquote>

                        <p>[Maecenas semper Curabitur lobortis id lorem id bibendum. Ut idfer consectetur lrene curabitur lobortis id lorem id bibendum. Ut iderw consectetur magna. Quisque volutpat augue enim, pulvinar lobortis nibh lacinia at. Vestibulum nec erat ut mi solliciteudin porttitor id sit amet risus. Nam tempus vel odio vitae aliquam. In imperdiet ereios id lacus vestibulum vestibulum. Suspendisse fermentum sem sagittis ante ven ienatis egestas quis vel justo liaecenas sempe.}</p>
                        <p>
                            [Curabitur lobortis id lorem id bibendum. Ut id consectetur ma wgna. Quisque volutpat augue enim, pulvinar sw nibh lacinia at. Vestibulum nec erat ut mi solliciteudin porttitor id sit amet risus. Nam tempus vel odio vitae aliquam. In imperdiet ereios id lacus vestib dwere wewulum vestibulum. Suspendisse fermentum sem sagittis ante veewe wn ienatis egestas quis vel justo. Maecenas semper suscipit nunc, sed aliqiuam sapien lorem convallis eu. Nulla ut turpis in diam dapibus consequat.]
                        </p>
                        <p>[Maecenas semper Curabitur lobortis id lorem id bibendum. Ut idfer consectetur lrene curabitur lobortis id lorem id bibendum. Ut iderw consectetur magna. Quisque volutpat augue enim, pulvinar lobortis nibh lacinia at. Vestibulum nec erat ut mi solliciteudin porttitor id sit amet risus. Nam tempus vel odio vitae aliquam. In imperdiet ereios id lacus vestibulum vestibulum. Suspendisse fermentum sem sagittis ante ven ienatis egestas quis vel justo liaecenas sempe.]</p>
                        <p>
                            [Curabitur lobortis id lorem id bibendum. Ut id consectetur ma wgna. Quisque volutpat augue enim, pulvinar sw nibh lacinia at. Vestibulum nec erat ut mi solliciteudin porttitor id sit amet risus. Nam tempus vel odio vitae aliquam. In imperdiet ereios id lacus vestib dwere wewulum vestibulum. Suspendisse fermentum sem sagittis ante veewe wn ienatis egestas quis vel justo. Maecenas semper suscipit nunc, sed aliqiuam sapien lorem convallis eu. Nulla ut turpis in diam dapibus consequat.]
                        </p>

                        <p>[Maecenas semper Curabitur lobortis id lorem id bibendum. Ut idfer consectetur lrene curabitur lobortis id lorem id bibendum. Ut iderw consectetur magna. Quisque volutpat augue enim, pulvinar lobortis nibh lacinia at. Vestibulum nec erat ut mi solliciteudin porttitor id sit amet risus. Nam tempus vel odio vitae aliquam. In imperdiet ereios id lacus vestibulum vestibulum. Suspendisse fermentum sem sagittis ante ven ienatis egestas quis vel justo liaecenas sempe.]</p>
                        <p>
                            [Curabitur lobortis id lorem id bibendum. Ut id consectetur ma wgna. Quisque volutpat augue enim, pulvinar sw nibh lacinia at. Vestibulum nec erat ut mi solliciteudin porttitor id sit amet risus. Nam tempus vel odio vitae aliquam. In imperdiet ereios id lacus vestib dwere wewulum vestibulum. Suspendisse fermentum sem sagittis ante veewe wn ienatis egestas quis vel justo. Maecenas semper suscipit nunc, sed aliqiuam sapien lorem convallis eu. Nulla ut turpis in diam dapibus consequat.]
                        </p>
                    </article>

                    <aside className="tags clearfix margin-bottom-large">
                        <h2>Tags:</h2>
                        <a href="" className="tag">Tag 1</a>
                        <a href="" className="tag">Tag 2</a>
                        <a href="" className="tag">Tag 3</a>
                        <a href="" className="tag">Tag 4</a>
                        <a href="" className="tag">Tag 5</a>
                    </aside>

                    <aside className="comments clearfix">
                        <h2>Comments: </h2>
                    </aside>

                </article>
            </section>
    );
}}

export default News;