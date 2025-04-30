// src/component/Content/PortfolioDeepDive/PortfolioDeepDive.js
import React, { useState, useEffect } from 'react';
import './portfolio.component.css';
import { RoughNotation } from "react-rough-notation";
import { links } from '../../../share/utils/constant'; // Get repo link if added
import { useSharedState } from '../../../context/app-context'; // To match theme

// Simple counter animation hook (optional, for fun)
const useAnimatedCounter = (target, duration = 1500) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = parseInt(target);
        if (start === end) return;

        let startTime = null;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [target, duration]);

    return count;
}

const Portfolio = () => {
    const { isDarkTheme } = useSharedState();
    // --- Fun Stats with a dash of reality and humor ---
    const linesOfCode = useAnimatedCounter(8426, 2000);       // Real codebase size + future growth
    const debuggingSessions = useAnimatedCounter(247, 1800);   // Hours spent debugging
    const stackOverflowVisits = useAnimatedCounter(184, 2000); // Times resisted copy-paste
    const gitCommits = useAnimatedCounter(156, 1800);         // Actual commits made
    const coffeeConsumed = useAnimatedCounter(312, 2200);     // Cups of motivation
    const midnightCommits = useAnimatedCounter(42, 2000);     // Late night coding sessions

    return (
        <section className="portfolio-deep-dive">
            <h2 className="section-heading">
                <RoughNotation type="underline" show={true} color={isDarkTheme ? "#76ABAE" : "#A7BEDC"} strokeWidth={3} order="1">
                    Project Spotlight: This Portfolio
                </RoughNotation>
            </h2>
            <p className="intro-text">
                You're looking at it! This portfolio wasn't just built to showcase my skills; it *is* a showcase.
                It's my digital playground for experimenting with React, animations, and trying not to break CSS too badly.
                {links.portfolioRepoLink && (
                     <>
                        {' '}Want to peek under the hood? Check out the <a href={links.portfolioRepoLink} target="_blank" rel="noopener noreferrer">source code on GitHub</a>.
                     </>
                )}
            </p>

            <div className="details-grid">
                <div className="detail-card tech-stack">
                    <h3>Tech Stack & Tools</h3>
                    <ul>
                        <li><RoughNotation type="box" show={true} color="#61DAFB" order="2" padding={[2, 5]}>React.js</RoughNotation> (Hooks, Context API for state)</li>
                        <li><RoughNotation type="box" show={true} color="#E34F26" order="3" padding={[2, 5]}>CSS3</RoughNotation> (Flexbox, Grid, Custom Properties, Animations)</li>
                        <li><RoughNotation type="box" show={true} color="orange" order="4" padding={[2, 5]}>React Router</RoughNotation> (for navigation)</li>
                        <li><RoughNotation type="box" show={true} color="green" order="5" padding={[2, 5]}>Lenis</RoughNotation> (for that buttery smooth scroll)</li>
                        <li><RoughNotation type="box" show={true} color="#fde2e4" order="6" padding={[2, 5]}>React Rough Notation</RoughNotation> (for the sketchy highlights)</li>
                         <li>Various custom fonts for ✨ aesthetics ✨</li>
                    </ul>
                </div>
                
                <div className="detail-card features">
                    <h3>Key Features & Experiments</h3>
                    <p>Some things I had fun building/implementing here:</p>
                    <ul>
                        <li><strong>Theme Toggle:</strong> A simple light/dark mode switch using React Context and CSS variables.</li>
                        <li><strong>Dynamic Backgrounds:</strong> The 'Work' section changes background color based on scroll position – a little visual flair using scroll listeners.</li>
                        <li><strong>Interactive Animations:</strong> From the header text flip to the skill visualizations and scroll-triggered effects.</li>
                        <li><strong>Responsiveness:</strong> Adapting the layout for different screen sizes (always a fun challenge!).</li>
                        <li><strong>Easter Egg:</strong> Try the Konami Code (↑ ↑ ↓ ↓ ← → ← → B A) for a surprise! 😉</li>
                    </ul>
                </div>

                 <div className="detail-card challenges">
                    <h3>Challenges & Learnings</h3>
                    <p>No project is without its hurdles! Main ones here:</p>
                    <ul>
                       <li>Fine-tuning scroll-linked animations for smooth performance across browsers.</li>
                       <li>Ensuring accessibility alongside creative visual elements.</li>
                       <li>Resisting the urge to add *just one more* animation library.</li>
                    </ul>
                 </div>

                 <div className="detail-card fun-stats">
                     <h3>Behind the Scenes Stats</h3>
                     <div className="stat-item">
                         <span className="stat-number">{linesOfCode.toLocaleString()}</span>
                         <span className="stat-label">Lines of Code (and Counting)</span>
                     </div>
                     <div className="stat-item">
                         <span className="stat-number">{gitCommits.toLocaleString()}</span>
                         <span className="stat-label">Git Commits (Each with a Story)</span>
                     </div>
                     <div className="stat-item">
                         <span className="stat-number">{debuggingSessions.toLocaleString()}</span>
                         <span className="stat-label">Hours of Problem-Solving</span>
                     </div>
                     <div className="stat-item">
                         <span className="stat-number">{stackOverflowVisits.toLocaleString()}</span>
                         <span className="stat-label">Stack Overflow Visits Avoided</span>
                     </div>
                     <div className="stat-item">
                         <span className="stat-number">{coffeeConsumed.toLocaleString()}</span>
                         <span className="stat-label">Cups of Code Fuel ☕</span>
                     </div>
                     <div className="stat-item">
                         <span className="stat-number">{midnightCommits.toLocaleString()}</span>
                         <span className="stat-label">Midnight Eureka Moments 💡</span>
                     </div>
                 </div>
            </div>
        </section>
    );
};

export default Portfolio;