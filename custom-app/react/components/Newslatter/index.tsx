import React from 'react';

import Container from './style.css';

const Newslatter = () => {
    return (
        <>

            <div className={Container.blocoInput}>
                <div>
                    <p>
                        Quer ganhar <strong> 5% OFF</strong> <br />na <strong> primeira compra?</strong>
                    </p>

                    <p>É só fazer o seu cadastro na FastObra!</p>
                </div>
                <div >
                    <form action="" className={Container.formNewslatter}>
                        <input type="text" name="" id="" placeholder='Digite o seu nome' className={Container.input} />
                        <input type="email" name="" id="" placeholder='Digite seu e-mail' className={Container.input} />
                        <input type="date" name="" id="" className={Container.inputDate} />
                        <button className={Container.inputSubmit} type="submit">cadastrar</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Newslatter;