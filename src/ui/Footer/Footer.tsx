//@ts-nocheck
import React from 'react';
import './Footer.scss';
import {Container} from "../Container";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__wrapper">
                <Container>
                    <div className="footer__inner">
                        <div className="footer__info">
                            <p className="footer__text footer__text--accent">
                                Фоменко Андрей
                            </p>
                            <p className="footer__text">
                                Home Mount Making
                            </p>
                            <p className="footer__text">
                                fomenko75@mail.ru
                            </p>
                        </div>
                        <div className="footer__info">
                            <div className="footer__counter">
                                <p className="footer__text footer__total">
                                    {0}
                                </p>
                                <p className="footer__text footer__current">
                                    {0}
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </footer>
    );
};

export default Footer;