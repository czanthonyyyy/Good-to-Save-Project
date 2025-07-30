class HeaderComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const currentPage = this.getAttribute('current-page') || '';
        const baseUrl = this.getAttribute('base-url') || '';
        
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                }
                
                #header {
                    width: 100vw;
                    height: 72px;
                    background-color: #111111;
                    position: fixed;
                    left: 0;
                    top: 0;
                    right: 0;
                    z-index: 501;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0;
                    margin: 0;
                    box-sizing: border-box;
                }

                .header-inner {
                    width: 100%;
                    max-width: 1200px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 40px;
                }

                .header-logo {
                    display: flex;
                    align-items: center;
                    margin-right: 48px;
                }

                .header-logo a {
                    color: #ffffff;
                    text-decoration: none;
                    font-size: 1.8rem;
                    font-weight: 500;
                }

                #header-nav-wrap {
                    display: flex;
                    align-items: center;
                    flex-grow: 1;
                    justify-content: center;
                }

                .header-main-nav {
                    display: flex;
                    align-items: center;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    height: 100%;
                    gap: 48px;
                }

                .header-main-nav li {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    margin: 0;
                    position: relative;
                }

                .header-main-nav li a {
                    color: rgba(255, 255, 255, 0.8);
                    text-decoration: none;
                    font-size: 14px;
                    font-weight: 500;
                    padding: 8px 16px;
                    border-radius: 4px;
                    transition: all 0.3s ease-in-out;
                    position: relative;
                    overflow: hidden;
                }

                .header-main-nav li a::before {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: #39b54a;
                    transition: width 0.3s ease-in-out;
                }

                .header-main-nav li a:hover:not(.current-link) {
                    color: #ffffff;
                    background: rgba(57, 181, 74, 0.1);
                    transform: translateY(-2px);
                }

                .header-main-nav li a:hover:not(.current-link)::before {
                    width: 100%;
                }

                .header-main-nav li a:active {
                    transform: translateY(0px) scale(0.98);
                    transition: transform 0.1s ease-in-out;
                }

                .header-main-nav li.current a,
                .header-main-nav li a.current-link {
                    color: #39b54a !important;
                    background: rgba(57, 181, 74, 0.15) !important;
                    transform: none !important;
                }

                .header-main-nav li.current a::before,
                .header-main-nav li a.current-link::before {
                    width: 100% !important;
                }

                .header-cta {
                    display: flex;
                    align-items: center;
                    margin-left: 32px;
                }

                .header-cta .cta {
                    background-color: transparent;
                    color: #ffffff;
                    padding: 6px 20px;
                    border-radius: 8px;
                    font-size: 13px;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.3s ease-in-out;
                    white-space: nowrap;
                    border: 1.5px solid #39b54a;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    position: relative;
                    overflow: hidden;
                    z-index: 1;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 32px;
                    line-height: 1;
                    margin: 0;
                    backdrop-filter: blur(10px);
                    box-shadow: 0 2px 8px rgba(57, 181, 74, 0.1);
                }

                .header-cta .cta:before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 0;
                    height: 100%;
                    background-color: #39b54a;
                    transition: all 0.3s ease-in-out;
                    z-index: -1;
                }

                .header-cta .cta:hover {
                    color: #ffffff;
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(57, 181, 74, 0.4);
                    border-color: #4caf50;
                }

                .header-cta .cta:hover:before {
                    width: 100%;
                }

                .header-cta .cta:active {
                    transform: translateY(0px);
                    box-shadow: 0 2px 8px rgba(57, 181, 74, 0.2);
                }

                /* Responsive */
                @media only screen and (max-width: 1024px) {
                    .header-main-nav {
                        gap: 32px;
                    }
                    
                    .header-cta {
                        margin-left: 24px;
                    }
                }

                @media only screen and (max-width: 800px) {
                    .header-main-nav {
                        display: none;
                    }
                    
                    .header-inner {
                        padding: 0 20px;
                    }
                    
                    .header-cta {
                        margin-left: 16px;
                    }
                    
                    .header-cta .cta {
                        padding: 5px 16px;
                        font-size: 12px;
                        height: 28px;
                    }
                }

                @media only screen and (max-width: 480px) {
                    .header-inner {
                        padding: 0 16px;
                    }
                    
                    .header-logo a {
                        font-size: 1.6rem;
                    }
                    
                    .header-cta .cta {
                        padding: 4px 12px;
                        font-size: 11px;
                        height: 26px;
                    }
                }
            </style>
            
            <header id="header">
                <div class="header-inner">
                    <div class="header-logo">
                        <a href="${baseUrl}index.html">Good to Save</a>
                    </div>

                    <nav id="header-nav-wrap">
                        <ul class="header-main-nav">
                            <li class="${currentPage === 'home' ? 'current' : ''}">
                                <a class="smoothscroll ${currentPage === 'home' ? 'current-link' : ''}" href="${baseUrl}index.html#home" title="home">Home</a>
                            </li>
                            <li class="${currentPage === 'about' ? 'current' : ''}">
                                <a class="smoothscroll ${currentPage === 'about' ? 'current-link' : ''}" href="${baseUrl}index.html#about" title="about">About</a>
                            </li>
                            <li class="${currentPage === 'pricing' ? 'current' : ''}">
                                <a class="smoothscroll ${currentPage === 'pricing' ? 'current-link' : ''}" href="${baseUrl}index.html#pricing" title="offers">Offers</a>
                            </li>
                            <li class="${currentPage === 'download' ? 'current' : ''}">
                                <a class="smoothscroll ${currentPage === 'download' ? 'current-link' : ''}" href="${baseUrl}index.html#download" title="download">Download</a>
                            </li>
                            <li class="${currentPage === 'catalog' ? 'current' : ''}">
                                <a class="${currentPage === 'catalog' ? 'current-link' : ''}" href="${baseUrl}public/pages/catalog.html" title='catalog'>Catalog</a>
                            </li>
                        </ul>
                    </nav>

                    <div class="header-cta">
                        <a href="${baseUrl}public/pages/log in form.html" title="sign-up" class="cta">Sign Up</a>
                    </div>
                </div>
            </header>
        `;
    }
}

// Registrar el web component
customElements.define('gts-header', HeaderComponent);