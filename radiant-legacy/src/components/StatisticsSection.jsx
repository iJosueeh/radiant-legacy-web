import React, { useState, useEffect, useRef } from 'react'
import estadisticaImg from '../assets/images/estadistica.webp'

const CountUp = ({ end }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let current = 0;
        const increment = end / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, 20);
        return () => clearInterval(timer);
    }, [end]);

    return <>{count}</>;
}

const StatisticsSection = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) setIsVisible(true);
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={sectionRef} className="statistics-section text-center text-white" style={{ backgroundImage: `url(${estadisticaImg})`, }}>
            <div className="container py-4">
                <div className="row justify-content-center gap-4">

                    <div className="col-6 col-md-3">
                        <i className="bi bi-hand-thumbs-up"></i>
                        <h3>{isVisible ? <CountUp end={500} /> : 0}+</h3>
                        <p>Clientes Satisfechos</p>
                    </div>

                    <div className="col-6 col-md-3">
                        <i className="bi bi-gem"></i>
                        <h3>{isVisible ? <CountUp end={1000} /> : 0}+</h3>
                        <p>Joyas Vendidas</p>
                    </div>

                    <div className="col-6 col-md-3">
                        <i className="bi bi-stars"></i>
                        <h3>{isVisible ? <CountUp end={98} /> : 0}%</h3>
                        <p>Reseñas Positivas</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default StatisticsSection
