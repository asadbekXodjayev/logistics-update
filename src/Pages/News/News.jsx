import React from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../../Context.jsx';
import NewsComponent, { NewsSkeleton } from '../../components/NewsComponent/NewsComponent.jsx';
import PageHero from '../../components/PageHero/PageHero.jsx';
import PageTransition from '../../components/Motion/PageTransition.jsx';
import { Stagger, StaggerItem } from '../../components/Motion/Reveal.jsx';
import { scaleIn } from '../../lib/motion.js';
import '../Pages.css';
import './News.css';

const SKELETON_COUNT = 6;

const News = () => {
    const { array, loading, error } = useBlog();
    const items = array?.filter((el) => el?.description !== 'Pumps-zegor') ?? [];

    return (
        <PageTransition>
            <div className="news-page">
                <PageHero
                    eyebrow="Our Fleet"
                    title={<>Trucks <em>&amp; News</em></>}
                    subtitle="Meet the equipment moving your freight and stay up to date with the latest from our team on the road."
                />

                <section className="news-body">
                    {loading ? (
                        <div className="news-grid">
                            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                                <NewsSkeleton key={i} />
                            ))}
                        </div>
                    ) : error ? (
                        <div className="news-empty">
                            <p>We couldn't load the fleet right now. Please try again shortly.</p>
                        </div>
                    ) : items.length > 0 ? (
                        <Stagger className="news-grid" stagger={0.08} amount={0.05}>
                            {items.map((el) => (
                                <StaggerItem key={el?._id} variants={scaleIn}>
                                    <NewsComponent el={el} />
                                </StaggerItem>
                            ))}
                        </Stagger>
                    ) : (
                        <p className="news-empty">No items to display right now.</p>
                    )}

                    <div className="news-cta">
                        <Link to="/quote" className="news-cta__btn">
                            Request a Quote
                            <span className="news-cta__btn-arrow">→</span>
                        </Link>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};

export default News;
