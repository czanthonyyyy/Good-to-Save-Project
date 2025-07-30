class FooterComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const baseUrl = this.getAttribute('base-url') || '';
        
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                }

                footer {
                    padding-top: 9rem;
                    padding-bottom: 4.2rem;
                    font-size: 1.5rem;
                    line-height: 2.7rem;
                    color: rgba(255, 255, 255, 0.25);
                    background: #141515;
                }

                footer a,
                footer a:visited {
                    color: #39b54a;
                }

                footer a:hover,
                footer a:focus {
                    color: white;
                }

                footer h4 {
                    color: white;
                    font-size: 1.5rem;
                    padding-bottom: 2.4rem;
                    margin-bottom: 2.4rem;
                    position: relative;
                }

                footer h4::before {
                    content: "";
                    display: block;
                    width: 120px;
                    height: 1px;
                    background-color: rgba(255, 255, 255, 0.05);
                    position: absolute;
                    left: 0;
                    bottom: 0;
                }

                footer ul {
                    list-style: none;
                    margin: 0;
                }

                footer ul li {
                    padding-left: 0;
                }

                footer ul a,
                footer ul a:visited {
                    color: rgba(255, 255, 255, 0.25);
                }

                .footer-main {
                    padding-bottom: 0;
                }

                .row {
                    width: 94%;
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    flex-wrap: wrap;
                }

                .col-three {
                    -ms-flex: 0 0 25%;
                    flex: 0 0 25%;
                    max-width: 25%;
                    padding: 0 15px;
                }

                .col-two {
                    -ms-flex: 0 0 16.66667%;
                    flex: 0 0 16.66667%;
                    max-width: 16.66667%;
                    padding: 0 15px;
                }

                .col-four {
                    -ms-flex: 0 0 33.33333%;
                    flex: 0 0 33.33333%;
                    max-width: 33.33333%;
                    padding: 0 15px;
                }

                .col-twelve {
                    -ms-flex: 0 0 100%;
                    flex: 0 0 100%;
                    max-width: 100%;
                    padding: 0 15px;
                }

                .footer-logo {
                    display: block;
                    margin: 0 0 5.4rem 0;
                    padding: 0;
                    outline: 0;
                    border: none;
                    width: 70px;
                    height: 80px;
                    font: 0/0 a;
                    text-shadow: none;
                    color: transparent;
                    transition: all 0.5s ease-in-out;
                }

                .footer-social-list {
                    font-size: 1.8rem;
                    margin-top: -1.5rem;
                    margin-bottom: 3rem;
                    list-style: none;
                    padding: 0;
                }

                .footer-social-list li {
                    display: inline-block;
                    margin-right: 8px;
                }

                .footer-social-list li:last-child {
                    margin-right: 0;
                }

                .footer-site-links .list-links {
                    margin-bottom: 3rem;
                }

                .list-links {
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }

                .list-links li {
                    padding: 0;
                    margin: 0 0 12px 0;
                }

                .list-links a {
                    color: rgba(255, 255, 255, 0.25);
                    font-size: 1.5rem;
                    line-height: 2.7rem;
                    text-decoration: none;
                    transition: all 0.3s ease-in-out;
                }

                .list-links a:hover {
                    color: #39b54a;
                }

                .footer-subscribe .subscribe-form {
                    margin: 0;
                    padding: 0;
                    position: relative;
                }

                .subscribe-form .email {
                    width: 100%;
                    padding: 1.5rem 2rem;
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    color: rgba(255, 255, 255, 0.6);
                    background: rgba(0, 0, 0, 0.1);
                    font-size: 1.5rem;
                    line-height: 2.7rem;
                    margin-bottom: 1.2rem;
                    box-sizing: border-box;
                }

                .subscribe-form input[type="email"]:focus {
                    border-color: #39b54a;
                    outline: none;
                }

                .subscribe-form input[type="submit"] {
                    padding: 1.5rem 2.4rem;
                    border: 2px solid #39b54a;
                    color: #39b54a;
                    background: transparent;
                    font-size: 1.1rem;
                    text-transform: uppercase;
                    letter-spacing: .3rem;
                    cursor: pointer;
                    transition: all 0.3s ease-in-out;
                }

                .subscribe-form input[type="submit"]:hover {
                    background: #39b54a;
                    color: #FFFFFF;
                }

                .footer-bottom {
                    margin-top: 6.6rem;
                    text-align: center;
                }

                .footer-bottom .copyright {
                    color: rgba(255, 255, 255, 0.25);
                    font-size: 1.2rem;
                }

                .footer-bottom .copyright span {
                    display: inline-block;
                }

                .footer-bottom .copyright span::after {
                    content: "|";
                    display: inline-block;
                    padding: 0 1rem 0 1.2rem;
                    color: rgba(255, 255, 255, 0.1);
                }

                .footer-bottom .copyright span:last-child::after {
                    display: none;
                }

                #go-top {
                    position: fixed;
                    bottom: 30px;
                    right: 30px;
                    z-index: 600;
                    display: block;
                }

                #go-top a,
                #go-top a:visited {
                    text-decoration: none;
                    border: 0 none;
                    display: block;
                    height: 60px;
                    width: 60px;
                    line-height: 60px;
                    text-align: center;
                    background: #39b54a;
                    color: white;
                    text-align: center;
                    text-transform: uppercase;
                    font-size: 1.1rem;
                    letter-spacing: .3rem;
                    border-radius: 3px;
                    transition: all 0.3s ease-in-out;
                }

                #go-top a:hover {
                    background: #2e9338;
                    transform: translateY(-3px);
                }

                /* Responsive */
                @media only screen and (max-width: 1024px) {
                    .col-three { 
                        flex: 0 0 50%;
                        max-width: 50%; 
                    }
                    .col-two { 
                        flex: 0 0 50%;
                        max-width: 50%; 
                    }
                    .col-four { 
                        flex: 0 0 100%;
                        max-width: 100%; 
                        margin-top: 4rem;
                    }
                }

                @media only screen and (max-width: 768px) {
                    footer {
                        padding-top: 6rem;
                        padding-bottom: 3rem;
                    }
                    
                    .col-three,
                    .col-two,
                    .col-four { 
                        flex: 0 0 100%;
                        max-width: 100%; 
                        margin-bottom: 4rem;
                    }
                    
                    .row { 
                        width: 90%; 
                    }
                    
                    .footer-bottom {
                        margin-top: 4rem;
                    }
                }
            </style>
            
            <footer>
                <div class="footer-main">
                    <div class="row">
                        <div class="col-three md-1-3 tab-full footer-info">
                            <div class="footer-logo"></div>
                            <p>
                                Good to Save isn't just a project. It's a movement towards sustainability, economic empowerment,
                                and social responsibility. Make a difference with Good to Save and be part of the solution to
                                food waste and hunger.
                            </p>
                            <ul class="footer-social-list">
                                <li>
                                    <a href="#"><i class="fa fa-facebook-square"></i></a>
                                </li>
                                <li>
                                    <a href="#"><i class="fa-brands fa-x-twitter"></i></a>
                                </li>
                                <li>
                                    <a href="#"><i class="fa fa-behance"></i></a>
                                </li>
                                <li>
                                    <a href="#"><i class="fa fa-dribbble"></i></a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/good_to_save_?igsh=NGg3MDNubml0b3Nr"><i
                                            class="fa fa-instagram"></i></a>
                                </li>
                            </ul>
                        </div>

                        <div class="col-three md-1-3 tab-1-2 mob-full footer-contact">
                            <h4>Contact</h4>
                            <p>
                                1600 Amphitheatre Parkway<br>
                                Mountain View, CA <br>
                                94043 US<br>
                            </p>
                            <p>
                                admins@goodtosave.org.pa <br>
                                Phone: (+507) 6410 0422 <br>
                                Fax: (+507) 555 0100
                            </p>
                        </div>

                        <div class="col-two md-1-3 tab-1-2 mob-full footer-site-links">
                            <h4>Site Links</h4>
                            <ul class="list-links">
                                <li><a href="${baseUrl}index.html#home">Home</a></li>
                                <li><a href="${baseUrl}index.html#about">About Us</a></li>
                                <li><a href="#">Blog</a></li>
                                <li><a href="#">FAQ</a></li>
                                <li><a href="#">Terms</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                            </ul>
                        </div>

                        <div class="col-four md-1-2 tab-full footer-subscribe">
                            <h4>Our Newsletter</h4>
                            <p>
                                Subscribe to our newsletter and get the latest news, updates, and offers.
                            </p>
                            <div class="subscribe-form">
                                <form id="mc-form" class="group" novalidate="true">
                                    <input type="email" value="" name="EMAIL" class="email" id="mc-email"
                                        placeholder="Email Address" required="">
                                    <input type="submit" name="subscribe" value="Send">
                                    <label for="mc-email" class="subscribe-message"></label>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="footer-bottom">
                    <div class="row">
                        <div class="col-twelve">
                            <div class="copyright">
                                <span>© Copyright Good to Save 2024.</span>
                                <span>Developed by Anthony J. Cruz</span>
                            </div>
                            <div id="go-top">
                                <a class="smoothscroll" title="Back to Top" href="#top">
                                    <i class="fa fa-chevron-up" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        `;
    }
}

// Registrar el web component
customElements.define('gts-footer', FooterComponent);