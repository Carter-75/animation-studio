import React from 'react';

const Footer = ({ style }: { style?: React.CSSProperties }) => {
    return (
        <footer className="footer" style={style}>
            <div className="content has-text-centered">
                <p className='has-text-white'>
                    <strong>Animation Portfolio</strong> by Carter.
                </p>
            </div>
        </footer>
    );
};

export default Footer; 