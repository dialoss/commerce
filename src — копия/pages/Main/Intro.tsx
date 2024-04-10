import React from 'react';
// @ts-ignore
import selfImg from './assets/img-self.jpg';
import './Intro.scss';
import Pay from "../../components/Pay";

const Intro = () => {
    return (
        <div className="intro">
            <div className="intro__inner">
                <div className="intro__img-wrapper">
                    <img className="intro__img-self " src={selfImg} alt=""/>
                </div>
                <div className="intro__block">
                    <h1 className="intro__title fw-bold">Приветствую!</h1>
                    <p className="intro__text">
                        Предлагаю Вашему вниманию свои разработки в SolidWorks, 3D детали и отдельные узлы различного
                        астрооборудования, экваториальные монтировки, а также другие детали для астрофото, переходники,
                        кольца и прочее с фотографиями "живых" деталей, изготовленных в металле.
                    </p>
                    <br/>
                    <p className="intro__text">
                        Кто заинтересуется, сможет повторить самостоятельно, скачав 3D модель (кроме монтировок!)
                        или заказать изготовление нужной детали, нажав кнопку <b>Изготовить в металле</b> на
                        странице выбранной 3D модели.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Intro;