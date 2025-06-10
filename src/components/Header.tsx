import React from 'react';

const Header = ({ style }: { style?: React.CSSProperties }) => {
    return (
        <header className="header" style={style}>
            <div className="container">
                <h1 className="title is-4 has-text-white">Animation Studio</h1>
            </div>
        </header>
    );
};

export default Header; 