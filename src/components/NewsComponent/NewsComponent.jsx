import React from 'react';
import './NewsComponent.css';

const NewsComponent = ({ el }) => {
    const date = el?.createdAt ? el.createdAt.slice(0, 10) : '';

    return (
        <article className="nws-card">
            <div className="nws-card__media">
                {el?.image ? (
                    <img src={el.image} alt={el?.name || 'Truck'} className="nws-card__image" loading="lazy" />
                ) : (
                    <div className="nws-card__image nws-card__image--placeholder" aria-hidden="true" />
                )}
                <div className="nws-card__media-grad" />
                <span className="nws-card__tag">Fleet</span>
                {date && (
                    <div className="nws-card__date">
                        <span className="nws-card__date-day">{date.slice(8, 10)}</span>
                        <span className="nws-card__date-month">{date.slice(0, 7)}</span>
                    </div>
                )}
            </div>

            <div className="nws-card__body">
                <h3 className="nws-card__title">{el?.name}</h3>
                <span className="nws-card__bar" />
                <p className="nws-card__desc">{el?.description}</p>
                {date && (
                    <p className="nws-card__meta">
                        <span className="nws-card__meta-dot" />
                        Added {date}
                    </p>
                )}
            </div>
        </article>
    );
};

/** Skeleton placeholder shown while the fleet data is loading. */
export const NewsSkeleton = () => (
    <article className="nws-card nws-card--skeleton" aria-hidden="true">
        <div className="nws-card__media">
            <div className="skeleton nws-skel__media" />
        </div>
        <div className="nws-card__body">
            <div className="skeleton nws-skel__line nws-skel__line--title" />
            <div className="skeleton nws-skel__bar" />
            <div className="skeleton nws-skel__line" />
            <div className="skeleton nws-skel__line" />
            <div className="skeleton nws-skel__line nws-skel__line--short" />
            <div className="skeleton nws-skel__line nws-skel__line--meta" />
        </div>
    </article>
);

export default NewsComponent;
