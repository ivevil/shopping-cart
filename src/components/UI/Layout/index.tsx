import React from "react";

type LayoutProps = {
    children: React.ReactNode;
    theme: 'light' | 'dark';
    onToggleTheme: () => void;
};

const Layout: React.FC<LayoutProps> = ({ children, theme, onToggleTheme }: LayoutProps) => {
    return (
        <main>
            <section className="cart">
                <div className="theme-switcher">
                    <span className="theme-switcher__label">Theme</span>
                    <button
                        type="button"
                        className={`theme-toggle ${theme === 'dark' ? 'theme-toggle--dark' : ''}`}
                        onClick={onToggleTheme}
                        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        aria-pressed={theme === 'dark'}
                    >
                        <span className="theme-toggle__track">
                            <span className="theme-toggle__thumb" />
                        </span>
                    </button>
                </div>
                <div className="cart__selection-wrapper">
                    {children}
                </div>
            </section>
        </main>
    )
}

export { Layout }