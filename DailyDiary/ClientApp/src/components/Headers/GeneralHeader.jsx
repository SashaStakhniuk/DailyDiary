import '../../styles/Headers/GeneralHeader.css'
import { connect } from "react-redux";
import React, { Component } from "react";
import { Host } from '../Host';

class GeneralHeader extends Component {
    constructor(props) {
        super(props)
        this.getUserData = this.getUserData.bind(this);
        this.state = {
            userData: [],
        }
    }
    componentDidMount() {
        if (this.props.userData !== undefined) {
            this.setState({
                userData: this.props.userData
            })
        }
        else if (this.props.credentials.userId !== undefined) {
            this.getUserData(this.props.credentials.userId);
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.credentials.userId !== prevProps.credentials.userId) {
            if (this.props.userData !== undefined) {
                this.setState({
                    userData: this.props.userData
                })
            }
            else if (this.props.credentials.userId !== undefined) {
                this.getUserData(this.props.credentials.userId);
            }
        }
    }
    async getUserData(userId) {
        try {
            if (userId === undefined || userId == "") {
                return 0;
            }
            const response = await fetch(`${Host}/api/person/GetByUserId/${userId}`);
            if (response.ok === true) {
                const data = await response.json();
                this.setState({
                    userData: data
                })
            }
            else {
                const data = await response.text();
                window.alert(data);
            }
        }
        catch (e) {
            window.alert(e);
        }

    }
    setTheme = (e) => {
        const theme = e.target.value
        const root = document.querySelector(':root');
        // console.log(root)
        var colors = {};
        // var colorsObj = localStorage.getItem('colors');
        // console.log('colors: ', JSON.parse(colorsObj));

        if (+theme === 0) {
            root.style.setProperty('--white', '#ffffff');
            root.style.setProperty('--background', '#ffffff');
            root.style.setProperty('--headerColor', '#AEB9F1');
            root.style.setProperty('--navMenuColor', '#ffffff');//меню
            root.style.setProperty('--violet', '#AEB9F1');
            root.style.setProperty('--subjectTextColor', '#4F4F4F');
            root.style.setProperty('--selectText', '#A5B0CC');
            root.style.setProperty('--font-color', 'black');
            root.style.setProperty('--orange', '#F2982A');
            root.style.setProperty('--buttonBackground', '#AEB9F1');
            root.style.setProperty('--select-color', '#ffffff');
            root.style.setProperty('--news-items-color', '#f5f5f5');
            colors = {
                'white': '#ffffff',
                'background': '#ffffff',
                'headerColor': '#AEB9F1',
                'navMenuColor': '#ffffff',
                'violet': '#AEB9F1',
                'subjectTextColor': '#4F4F4F',
                'selectText': '#A5B0CC',
                'font-color': 'black',
                'orange': '#F2982A',
                'buttonBackground': '#AEB9F1',
                'select-color': '#ffffff',
                'news-items-color': '#f5f5f5'
            };
        }
        else {
            root.style.setProperty('--white', '#22253B'); //
            root.style.setProperty('--background', '#2b2e4a');//фон
            root.style.setProperty('--headerColor', '#22253B');//хедер
            root.style.setProperty('--navMenuColor', '#22253B');//меню
            root.style.setProperty('--violet', '#a5b0cc');//іконки і кнопочки
            root.style.setProperty('--subjectTextColor', '#AEB9F1');
            root.style.setProperty('--selectText', '#AEB9F1');
            root.style.setProperty('--font-color', '#AEB9F1');
            root.style.setProperty('--orange', '#F765A3');
            root.style.setProperty('--buttonBackground', '#a5b0cc');
            root.style.setProperty('--select-color', '#22253B');
            root.style.setProperty('--news-items-color', '#2b2e4a');
            

            colors = {
                'white': '#22253B',
                'background': '#2b2e4a',
                'headerColor': '#22253B',
                'navMenuColor': '#22253B',
                'violet': '#a5b0cc',
                'subjectTextColor': '#AEB9F1',
                'selectText': '#AEB9F1',
                'font-color': '#AEB9F1',
                'orange': '#F765A3',
                'buttonBackground': '#a5b0cc',
                'select-color': '#22253B',
                'news-items-color': '#2b2e4a'
            };
        }
        localStorage.setItem('colors', JSON.stringify(colors));
    }
    render() {
        return (
            <>
                <header className="header">
                    <div className="header__logo__container">
                        {/* <span className="span">Logo</span>
                        <span className="service__name">Service name</span> */}
                        <svg width="125" height="31" viewBox="0 0 125 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M5.70869 0H0V16.6926L71.8481 16.6927V31H81.7583V28.5815H74.444V16.6927H85.585V31H88.1808V16.6927H93.7807V31H96.3765V18.5676L104.787 31H107.548V16.6927H113.145V31H124.142V28.5815H115.741V23.5305H123.344V21.1341H115.741V16.726H123.876V14.3074H74.4219V9.58201L80.7227 0H77.657L73.1703 7.15788L68.7253 0H65.5252L71.826 9.58201V14.3074H61.1652L57.9615 9.09172C58.9046 8.87431 59.7144 8.4548 60.3741 7.82216C61.2375 7.00868 61.6601 5.94871 61.6601 4.68911C61.6601 3.12226 61.1328 1.89097 60.006 1.10987C58.9333 0.351619 57.5128 0 55.7963 0H50.686V14.3074H44.4L38.2567 0H36.0471L29.8634 14.3074H23.5821V0H20.9863V14.3074H12.0092C12.6861 13.6763 13.2401 12.9039 13.6736 11.9975L13.6748 11.995C14.1968 10.8876 14.4539 9.66866 14.4539 8.34628C14.4539 7.02452 14.197 5.81224 13.6742 4.71846C13.158 3.62399 12.4697 2.73197 11.6034 2.0576C10.762 1.38799 9.83356 0.880698 8.82014 0.537279C7.80789 0.1795 6.76998 0 5.70869 0ZM53.2819 6.98186V2.37421H55.6189C56.8897 2.37421 57.753 2.6036 58.2875 2.98496C58.7909 3.34414 59.0642 3.88246 59.0642 4.68911C59.0642 5.45742 58.7849 5.98905 58.2411 6.35929C57.6628 6.753 56.7873 6.98186 55.5524 6.98186H53.2819ZM2.59585 14.274V2.41854H5.2654C6.34892 2.41854 7.3025 2.59442 8.13447 2.93539L8.14362 2.93894C8.9996 3.27028 9.669 3.7175 10.1698 4.271L10.1739 4.2754C10.6938 4.83637 11.0884 5.46297 11.3606 6.15721C11.6328 6.85134 11.7694 7.57985 11.7694 8.34628C11.7694 9.11271 11.6328 9.84122 11.3606 10.5354C11.0883 11.2299 10.6932 11.8648 10.1718 12.4415C9.66984 12.9824 8.99803 13.4309 8.13908 13.7776C7.30572 14.1051 6.35042 14.274 5.2654 14.274H2.59585ZM39.816 10.1071H34.3982L37.1071 3.5779L39.816 10.1071ZM53.2819 14.3074V9.35607H55.1566L58.0885 14.3074H53.2819ZM32.6659 14.3074L33.3852 12.5699H40.8308L41.5594 14.3074H32.6659ZM104.952 26.6195L98.1692 16.6927H104.952V26.6195Z" fill="#F2F2F2" />
                        </svg>
                    </div>
                    <div className="header__option__container">
                        <div className="item__contanier">
                            <svg className="msg" width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.5 16.875C1.28333 16.875 1.10433 16.8 0.963 16.65C0.821 16.5 0.75 16.325 0.75 16.125C0.75 15.9084 0.821 15.729 0.963 15.587C1.10433 15.4457 1.28333 15.375 1.5 15.375H2.75V8.12505C2.75 6.79172 3.16667 5.59572 4 4.53705C4.83333 3.47905 5.91667 2.80005 7.25 2.50005V1.80005C7.25 1.45005 7.371 1.15405 7.613 0.912049C7.85433 0.670715 8.15 0.550049 8.5 0.550049C8.85 0.550049 9.14567 0.670715 9.387 0.912049C9.629 1.15405 9.75 1.45005 9.75 1.80005V2.50005C11.0833 2.80005 12.1667 3.47905 13 4.53705C13.8333 5.59572 14.25 6.79172 14.25 8.12505V15.375H15.5C15.7167 15.375 15.896 15.4457 16.038 15.587C16.1793 15.729 16.25 15.9084 16.25 16.125C16.25 16.325 16.1793 16.5 16.038 16.65C15.896 16.8 15.7167 16.875 15.5 16.875H1.5ZM8.5 19.8C8 19.8 7.575 19.625 7.225 19.275C6.875 18.925 6.7 18.5 6.7 18H10.3C10.3 18.5 10.125 18.925 9.775 19.275C9.425 19.625 9 19.8 8.5 19.8ZM4.25 15.375H12.75V8.12505C12.75 6.94172 12.3333 5.93738 11.5 5.11205C10.6667 4.28738 9.66667 3.87505 8.5 3.87505C7.33333 3.87505 6.33333 4.28738 5.5 5.11205C4.66667 5.93738 4.25 6.94172 4.25 8.12505V15.375Z" fill="#F2F2F2" />
                            </svg>
                        </div>
                        <svg className="hr" width="2" height="34" viewBox="0 0 2 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="2" height="34" fill="#F2F2F2" />
                        </svg>
                        <div className="item__contanier">
                            <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg" data-bs-toggle="modal" data-bs-target="#settingsModal">
                                <path d="M11.0004 19.5H7.97543C7.75876 19.5 7.5671 19.425 7.40043 19.275C7.23376 19.125 7.13376 18.9333 7.10043 18.7L6.80043 16.45C6.53376 16.3667 6.2631 16.2417 5.98843 16.075C5.7131 15.9083 5.45876 15.7333 5.22543 15.55L3.15043 16.45C2.93376 16.5333 2.72143 16.5417 2.51343 16.475C2.30476 16.4083 2.13376 16.275 2.00043 16.075L0.50043 13.45C0.383763 13.25 0.35043 13.0373 0.40043 12.812C0.45043 12.5873 0.558763 12.4083 0.72543 12.275L2.55043 10.9C2.5171 10.75 2.49643 10.6 2.48843 10.45C2.47976 10.3 2.47543 10.15 2.47543 10C2.47543 9.86667 2.47976 9.725 2.48843 9.575C2.49643 9.425 2.5171 9.26667 2.55043 9.1L0.72543 7.725C0.558763 7.59167 0.45043 7.41267 0.40043 7.188C0.35043 6.96267 0.383763 6.75 0.50043 6.55L2.00043 3.95C2.1171 3.75 2.28376 3.61667 2.50043 3.55C2.7171 3.48333 2.92543 3.49167 3.12543 3.575L5.22543 4.45C5.45876 4.26667 5.7131 4.096 5.98843 3.938C6.2631 3.77933 6.53376 3.65 6.80043 3.55L7.10043 1.3C7.13376 1.06667 7.23376 0.875 7.40043 0.725C7.5671 0.575 7.75876 0.5 7.97543 0.5H11.0004C11.2338 0.5 11.4338 0.575 11.6004 0.725C11.7671 0.875 11.8671 1.06667 11.9004 1.3L12.2004 3.55C12.5004 3.66667 12.7711 3.79567 13.0124 3.937C13.2544 4.079 13.5004 4.25 13.7504 4.45L15.8754 3.575C16.0754 3.49167 16.2798 3.48333 16.4884 3.55C16.6964 3.61667 16.8671 3.75 17.0004 3.95L18.5004 6.55C18.6171 6.75 18.6504 6.96267 18.6004 7.188C18.5504 7.41267 18.4421 7.59167 18.2754 7.725L16.4254 9.125C16.4588 9.29167 16.4754 9.44167 16.4754 9.575V10C16.4754 10.1333 16.4711 10.2707 16.4624 10.412C16.4544 10.554 16.4338 10.7167 16.4004 10.9L18.2254 12.275C18.4088 12.4083 18.5254 12.5873 18.5754 12.812C18.6254 13.0373 18.5838 13.25 18.4504 13.45L16.9504 16.05C16.8338 16.25 16.6671 16.3833 16.4504 16.45C16.2338 16.5167 16.0171 16.5083 15.8004 16.425L13.7504 15.55C13.5004 15.75 13.2464 15.925 12.9884 16.075C12.7298 16.225 12.4671 16.35 12.2004 16.45L11.9004 18.7C11.8671 18.9333 11.7671 19.125 11.6004 19.275C11.4338 19.425 11.2338 19.5 11.0004 19.5V19.5ZM9.50043 13C10.3338 13 11.0421 12.7083 11.6254 12.125C12.2088 11.5417 12.5004 10.8333 12.5004 10C12.5004 9.16667 12.2088 8.45833 11.6254 7.875C11.0421 7.29167 10.3338 7 9.50043 7C8.6671 7 7.95876 7.29167 7.37543 7.875C6.7921 8.45833 6.50043 9.16667 6.50043 10C6.50043 10.8333 6.7921 11.5417 7.37543 12.125C7.95876 12.7083 8.6671 13 9.50043 13ZM9.50043 11.5C9.08376 11.5 8.72976 11.354 8.43843 11.062C8.14643 10.7707 8.00043 10.4167 8.00043 10C8.00043 9.58333 8.14643 9.22933 8.43843 8.938C8.72976 8.646 9.08376 8.5 9.50043 8.5C9.9171 8.5 10.2711 8.646 10.5624 8.938C10.8544 9.22933 11.0004 9.58333 11.0004 10C11.0004 10.4167 10.8544 10.7707 10.5624 11.062C10.2711 11.354 9.9171 11.5 9.50043 11.5ZM8.50043 18H10.4754L10.8254 15.325C11.3421 15.1917 11.8088 15 12.2254 14.75C12.6421 14.5 13.0504 14.1833 13.4504 13.8L15.9254 14.85L16.9254 13.15L14.7504 11.525C14.8338 11.2583 14.8881 11 14.9134 10.75C14.9381 10.5 14.9504 10.25 14.9504 10C14.9504 9.73333 14.9381 9.47933 14.9134 9.238C14.8881 8.996 14.8338 8.75 14.7504 8.5L16.9254 6.85L15.9504 5.15L13.4254 6.2C13.0921 5.85 12.6921 5.53733 12.2254 5.262C11.7588 4.98733 11.2921 4.79167 10.8254 4.675L10.5004 2H8.52543L8.17543 4.675C7.67543 4.79167 7.20876 4.975 6.77543 5.225C6.3421 5.475 5.92543 5.79167 5.52543 6.175L3.05043 5.15L2.07543 6.85L4.22543 8.45C4.1421 8.7 4.08376 8.95 4.05043 9.2C4.0171 9.45 4.00043 9.71667 4.00043 10C4.00043 10.2667 4.0171 10.525 4.05043 10.775C4.08376 11.025 4.1421 11.275 4.22543 11.525L2.07543 13.15L3.05043 14.85L5.52543 13.8C5.90876 14.1833 6.3171 14.5 6.75043 14.75C7.18376 15 7.65876 15.1917 8.17543 15.325L8.50043 18Z" fill="#F2F2F2" />
                            </svg>
                        </div>
                        <svg className="hr" width="2" height="34" viewBox="0 0 2 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="2" height="34" fill="#F2F2F2" />
                        </svg>
                        <div className="item__contanier">
                            <svg className="svg__item svg" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 19.5C8.7 19.5 7.47067 19.25 6.312 18.75C5.154 18.25 4.14567 17.5707 3.287 16.712C2.429 15.854 1.75 14.846 1.25 13.688C0.75 12.5293 0.5 11.3 0.5 10C0.5 8.68333 0.75 7.45 1.25 6.3C1.75 5.15 2.429 4.14567 3.287 3.287C4.14567 2.429 5.154 1.75 6.312 1.25C7.47067 0.75 8.7 0.5 10 0.5C11.3167 0.5 12.55 0.75 13.7 1.25C14.85 1.75 15.854 2.429 16.712 3.287C17.5707 4.14567 18.25 5.15 18.75 6.3C19.25 7.45 19.5 8.68333 19.5 10C19.5 11.3 19.25 12.5293 18.75 13.688C18.25 14.846 17.5707 15.854 16.712 16.712C15.854 17.5707 14.85 18.25 13.7 18.75C12.55 19.25 11.3167 19.5 10 19.5ZM10 17.975C10.5167 17.3083 10.946 16.6293 11.288 15.938C11.6293 15.246 11.9167 14.4917 12.15 13.675H7.85C8.08333 14.5083 8.371 15.2707 8.713 15.962C9.05433 16.654 9.48333 17.325 10 17.975ZM8.075 17.7C7.69167 17.15 7.346 16.525 7.038 15.825C6.72933 15.125 6.49167 14.4083 6.325 13.675H2.925C3.45833 14.7083 4.16667 15.5793 5.05 16.288C5.93333 16.996 6.94167 17.4667 8.075 17.7ZM11.925 17.7C13.0583 17.4667 14.0667 16.996 14.95 16.288C15.8333 15.5793 16.5417 14.7083 17.075 13.675H13.675C13.475 14.4083 13.225 15.129 12.925 15.837C12.625 16.5457 12.2917 17.1667 11.925 17.7ZM2.3 12.175H6.025C5.95833 11.8083 5.90833 11.4457 5.875 11.087C5.84167 10.729 5.825 10.3667 5.825 10C5.825 9.63333 5.84167 9.27067 5.875 8.912C5.90833 8.554 5.95833 8.19167 6.025 7.825H2.3C2.2 8.15833 2.125 8.50833 2.075 8.875C2.025 9.24167 2 9.61667 2 10C2 10.3833 2.025 10.7583 2.075 11.125C2.125 11.4917 2.2 11.8417 2.3 12.175ZM7.525 12.175H12.475C12.5417 11.8083 12.5917 11.45 12.625 11.1C12.6583 10.75 12.675 10.3833 12.675 10C12.675 9.61667 12.6583 9.25 12.625 8.9C12.5917 8.55 12.5417 8.19167 12.475 7.825H7.525C7.45833 8.19167 7.40833 8.55 7.375 8.9C7.34167 9.25 7.325 9.61667 7.325 10C7.325 10.3833 7.34167 10.75 7.375 11.1C7.40833 11.45 7.45833 11.8083 7.525 12.175ZM13.975 12.175H17.7C17.8 11.8417 17.875 11.4917 17.925 11.125C17.975 10.7583 18 10.3833 18 10C18 9.61667 17.975 9.24167 17.925 8.875C17.875 8.50833 17.8 8.15833 17.7 7.825H13.975C14.0417 8.19167 14.0917 8.554 14.125 8.912C14.1583 9.27067 14.175 9.63333 14.175 10C14.175 10.3667 14.1583 10.729 14.125 11.087C14.0917 11.4457 14.0417 11.8083 13.975 12.175ZM13.675 6.325H17.075C16.5417 5.275 15.8377 4.404 14.963 3.712C14.0877 3.02067 13.075 2.54167 11.925 2.275C12.3083 2.85833 12.65 3.49567 12.95 4.187C13.25 4.879 13.4917 5.59167 13.675 6.325ZM7.85 6.325H12.15C11.9167 5.49167 11.621 4.72067 11.263 4.012C10.9043 3.304 10.4833 2.64167 10 2.025C9.51667 2.64167 9.096 3.304 8.738 4.012C8.37933 4.72067 8.08333 5.49167 7.85 6.325ZM2.925 6.325H6.325C6.50833 5.59167 6.75 4.879 7.05 4.187C7.35 3.49567 7.69167 2.85833 8.075 2.275C6.90833 2.54167 5.89167 3.02067 5.025 3.712C4.15833 4.404 3.45833 5.275 2.925 6.325Z" fill="#F2F2F2" />
                            </svg>

                            <svg className="svg" width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.96875 12H0.5V0.578125H6.96875V2.15625H2.375V5.25781H6.67969V6.82812H2.375V10.4141H6.96875V12ZM19.1687 12H16.8641L11.2703 2.88281H11.2C11.2208 3.1901 11.2391 3.51562 11.2547 3.85938C11.2755 4.20312 11.2911 4.55729 11.3016 4.92188C11.3172 5.28646 11.3302 5.65625 11.3406 6.03125V12H9.6375V0.578125H11.9266L17.5125 9.63281H17.5672C17.5568 9.36719 17.5437 9.0625 17.5281 8.71875C17.5125 8.375 17.4969 8.02083 17.4812 7.65625C17.4708 7.28646 17.463 6.92969 17.4578 6.58594V0.578125H19.1687V12Z" fill="#F2F2F2" />
                            </svg>
                        </div>
                        <svg className="hr" width="2" height="34" viewBox="0 0 2 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="2" height="34" fill="#F2F2F2" />
                        </svg>
                        <div className="item__contanier">
                            <svg className="svg__item svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 7.69995C7.03333 7.69995 6.20833 7.35395 5.525 6.66195C4.84167 5.97062 4.5 5.14995 4.5 4.19995C4.5 3.23328 4.84167 2.40828 5.525 1.72495C6.20833 1.04162 7.03333 0.699951 8 0.699951C8.96667 0.699951 9.79167 1.04162 10.475 1.72495C11.1583 2.40828 11.5 3.23328 11.5 4.19995C11.5 5.14995 11.1583 5.97062 10.475 6.66195C9.79167 7.35395 8.96667 7.69995 8 7.69995ZM13.975 15.3H2.025C1.59167 15.3 1.22933 15.1543 0.938 14.863C0.646 14.571 0.5 14.2166 0.5 13.8V13.075C0.5 12.5916 0.633333 12.1416 0.9 11.725C1.16667 11.3083 1.525 10.9833 1.975 10.75C2.95833 10.2666 3.95433 9.90395 4.963 9.66195C5.971 9.42062 6.98333 9.29995 8 9.29995C9.01667 9.29995 10.0293 9.42062 11.038 9.66195C12.046 9.90395 13.0417 10.2666 14.025 10.75C14.475 10.9833 14.8333 11.3083 15.1 11.725C15.3667 12.1416 15.5 12.5916 15.5 13.075V13.8C15.5 14.2166 15.354 14.571 15.062 14.863C14.7707 15.1543 14.4083 15.3 13.975 15.3ZM2 13.8H14V13.075C14 12.875 13.9417 12.6916 13.825 12.525C13.7083 12.3583 13.55 12.2166 13.35 12.1C12.4833 11.6833 11.6043 11.3623 10.713 11.137C9.821 10.9123 8.91667 10.8 8 10.8C7.08333 10.8 6.179 10.9123 5.287 11.137C4.39567 11.3623 3.51667 11.6833 2.65 12.1C2.45 12.2166 2.29167 12.3583 2.175 12.525C2.05833 12.6916 2 12.875 2 13.075V13.8ZM8 6.19995C8.55 6.19995 9.021 6.00395 9.413 5.61195C9.80433 5.22062 10 4.74995 10 4.19995C10 3.64995 9.80433 3.17895 9.413 2.78695C9.021 2.39562 8.55 2.19995 8 2.19995C7.45 2.19995 6.97933 2.39562 6.588 2.78695C6.196 3.17895 6 3.64995 6 4.19995C6 4.74995 6.196 5.22062 6.588 5.61195C6.97933 6.00395 7.45 6.19995 8 6.19995Z" fill="#F2F2F2" />
                            </svg>
                            {this.state.userData.name !== undefined && this.state.userData.lastName !== undefined ?
                                <>
                                    <span className="simple__text def__margin">{this.state.userData.name + " " + this.state.userData.lastName} </span>
                                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M1.16512 1.55582C0.720849 0.891358 1.19712 0 1.99642 0H10.0037C10.8021 0 11.2785 0.889555 10.8361 1.55415L6.84116 7.55509C6.44589 8.14883 5.5739 8.14971 5.17744 7.55676L1.16512 1.55582Z" fill="#F2F2F2" />
                                    </svg>
                                </>
                                :
                                <>
                                    <span className="simple__text def__margin">Customer name</span>
                                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M1.16512 1.55582C0.720849 0.891358 1.19712 0 1.99642 0H10.0037C10.8021 0 11.2785 0.889555 10.8361 1.55415L6.84116 7.55509C6.44589 8.14883 5.5739 8.14971 5.17744 7.55676L1.16512 1.55582Z" fill="#F2F2F2" />
                                    </svg>
                                </>
                            }
                        </div>
                    </div>
                </header>
                <div id="modalSettingsWindow">
                    <div className="modal fade" id="settingsModal" tabIndex="-1" aria-labelledby="settingsModalLabel"  >
                        <div className="modal-dialog">
                            <div className="modal-content generalBackgroundColor">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="settingsModalLabel">Загальні налаштування</h1>
                                    <button type="button" id="closeSettingsModalWindowButton" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>

                                <div className="modal-body modal-body-content">
                                    <div id="theme" className="m-2">
                                        <div>
                                            <label htmlFor="lightTheme">Light theme</label>
                                            <input type="radio" id="lightTheme" name="theme" value="0" onClick={(e) => this.setTheme(e)} />
                                        </div>
                                        <div>
                                            <label htmlFor="darkTheme">Dark theme</label>
                                            <input type="radio" id="darkTheme" name="theme" value="1" onClick={(e) => this.setTheme(e)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    {/* <button type="submit" className="general-button">Відправити</button> */}
                                    {/* <button type="submit" className="btn btn-primary" onClick={() => this.uploadHomework()}>Відправити</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
function mapStateToProps(state) {
    console.log("mapStateToProps ")
    console.log(state)

    return {
        credentials: state.currentUser.credentials,
    }
}
export default connect(mapStateToProps)(GeneralHeader);
// export default GeneralHeader