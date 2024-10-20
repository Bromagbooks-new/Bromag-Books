import styled from 'styled-components';

const Wrapper = styled.main`

h3 {
    color: #000;
    margin-bottom: 0px;
}
.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
select {
  width: 200px;
}
.form-select:focus {
  box-shadow: none;
}
button {
    padding:10px 20px;
    background-color:#0059C2;
    border-style: none;
    font-size: 14px;
}
.page-header-btn {
    text-decoration: none;
    color: #f3f0ec;
}

.plus-icon {
    margin-right: 10px;
}

Button:hover {
    background-color: #00418E;
    border-style: none;
}
.table-div {
    border: 1px solid #DEE2E6;
    border-radius:15px;
}
.table {
    border: 2px solid #DEE2E6;
    border-radius:15px;
    margin-bottom: 0px;
}
th {
    background-color: #1F303C;
    color: #fff;
    font-weight: 700;
    padding: 12px 10px;
    text-align: center;
    vertical-align: middle;
}
tr {
    text-align: center;
    background-color: #F4FAFF;
}
td {
  max-width: 300px;
  overflow-wrap: break-word;
  padding: 12px 5px;
  vertical-align: middle;
  color: #6A6A6A;
}
.table-btn {
    border-style: none;
    background-color: transparent;
    padding: 0px;
}
.table-btn:hover {
    background-color: transparent;
    border-style: none;
}
.action-icon {
    font-size: 24px;
}
.action-icon:hover {
    color: #e97d7d;
    cursor: pointer;
}

.actions {
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    padding: 10px;
}
.action-list {
    box-shadow: 0 4px 15px 0px #C8E1FF;
}
.actions a {
    padding: 10px 10px;
    background-color: #fff;
    text-decoration: none;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.5s ease;
    font-size: 14px;
}
.link-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 8px rgba(200, 225, 255, 0.7);
    border-radius: 8px;
}

.delete {
    color: #e74c3c;
    font-weight: bolder;
}
.delete:hover {
    color: #e97d7d;
}
.view {
    color: #2B8DFF;
}
.view:hover {
    color: #ff9544;
}
.edit {
    color: #2B8DFF;
}
.edit:hover {
    color: #8a9eaf;
}

.search-and-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
}

.search-div {
    display: flex;
    align-items: center;
    gap: 100px;
}

.search-input-group {
    position: relative;
}

.search-bar {
    border-style: none;
    background: #F4FAFF;
    box-shadow: inset 0px 2px 6px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 10px 15px;
    font-size: 14px;
    color: #6B7280;
    width: 344px;
    height:40px
}

.search-bar:focus {
    outline: none;
}

.search-bar::placeholder {
    font-size: 14px;
    padding: 10px 30px;
}

.search-icon {
    position: absolute;
    top: 12px;
    left: 20px;
    color: #6B7280;
}

.date-picker-group {
    display: flex;
    align-items: center;
    gap: 10px;
}

.date-picker {
    padding: 10px 15px;
    border-radius: 10px;
    border: none;
    background: #F4FAFF;
    box-shadow: inset 0px 2px 6px rgba(0, 0, 0, 0.1);
    color: #6B7280; 
    font-size: 14px;
    width: 150px; 
    text-align: left; 
}

.date-picker:focus {
    outline: none;
}

.search-btn {
    background-color: #5A6C9D; /* Adjusted to match the color in image */
    padding: 10px 15px;
    border-style: none;
    border-radius: 10px;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.search-btn:hover {
    background-color: #4A5680;
}

.pagination-div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px; 
    background-color: #f7f9fc;
    border-radius: 8px;
    border-color:#B7CDDD;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-size: 14px;
    margin-top:30px
}

.pagination-div p {
    margin: 0; /* Remove margin from paragraph */
    color: #6b7280; /* Light gray text color */
}

.pagination-controls {
    display: flex;
    align-items: center; 
    gap: 10px;
}

.pagination-controls button {
    padding: 6px 12px;
    background: #1F303C;
    color: white;
    border: none; 
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease; 
}

.pagination-controls button:hover {
    background-color: #4a5680; 
}

.pagination-controls span {
    font-size: 14px; 
    color: #6b7280; 
}


`;

export default Wrapper;
