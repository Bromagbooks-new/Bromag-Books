import Styled from "styled-components";

//image imports
import { CardBg } from "../../../assets/images";

const Wrapper = Styled.main`
.page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}


select {
    width: 200px;
}

.form-select:focus {
    box-shadow: none;
}

.dates {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-wrap: wrap;
    column-gap: 5px;
}

.date {
    display: flex;
    align-items: center;
    background-color: #fff;
    border-radius: 10px;
    padding: 5px 10px;
    label {
        font-size: 14px;
        margin: 0px 10px 0px 0px;
    }
}

.date-input {
    box-shadow: inset 0px 2px 6px #00000040; 
    border-radius: 50px;
    font-size: 10px;
}

.search-btn {
    background-color: #00418D;
    padding: 10px 20px;
    margin-left: 5px;
    border-style: none;
    border-radius: 10px;
    color: #fff;
    font-size: 12px;
}

.search-btn:hover {
    border-style: none;
    background-color: #7EB9FF;
}

.form-select {
    margin-top: 10px;
}

.card-deck {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    column-gap: 15px;
    row-gap: 15px;
    margin: 20px 0px;
}

.card {
    width: calc(33% - 10px); /* Make cards more flexible */
    text-align: center;
    margin: 10px 0px;
}

.quicklink-btn {
    width: 174px;
    background-color: transparent;
    border: 1px solid #2B8DFF;
    border-radius: 50px;
    color: #373737;
}

.quicklink-btn-active {
    color: #fff;
    background-color: #66ACFF;
    border-style: none;
    border-radius: 50px;
}

.card-body {
    padding: 10px;
}

.card-title {
    margin-bottom: 0px;
    font-size: 16px;
    font-weight: 700;
}

.card:hover {
    color: #fff;
    border-color: #ffffff;
}


/* sales card */
.sales-card-deck {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0px 0px;
    gap: 10px; 
}

.container {
    padding-top: 0px;
}

.sales-card {
    background: #fff;
    color: #fff;
    padding: 15px;
    width: calc(25% - 10px);
    border-style: none;
    border-radius: 15px;
    margin: 0;
    h2 {
        margin: 0px;
    }
}

.sales-card-title {
    font-size: 21.47px;
    margin-bottom: 15px;
    font-weight: 600;
}

.card-bg {
    width: 250px;
    height: 80px;
    background: url(${CardBg});
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    bottom: 0;
    right: 0;
}

/* Chart container */
.chart-container {
    width: 100%;
    max-width: 1000px;
    margin: 20px auto;
    background-color: #e0f0ff;
    border-radius: 1rem;
    padding: 1rem;
    height: 400px;
}
`;

export default Wrapper;


