import React from 'react';

let style = {
    div: {
        position: "relative",
        top: "15%",
        fontSize: "20px",
        fontFamily: "cursive",
        fontWeight: "700",
        display: "block",
        textAlign: "center",
    },
    img: {

    }
}

export default ({ num = 1 }) => (
    <div style={style.div}>
        <div style={{ fontSize: "150px" }}>
            <i className="fa fa-plug" aria-hidden="true"></i>
        </div>
        <div>
            Error On Site ):-
        <br />
            Please Try Again Or Contact Server Owner
    </div>
    </div>
);
    // <div style={style.div}>
    //     <img src={require(`../../../../assets/img/error/${num}.png`)} sty={style.img} />
    // </div>