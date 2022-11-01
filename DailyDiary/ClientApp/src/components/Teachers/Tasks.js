import React, { Component } from "react";
import { NavLink } from 'react-router-dom'
import { connect } from "react-redux";
import '../../styles/Navigations/TaskLink.css'
import { Host } from "../Host"

import GeneralNavigationBar from "../Navigations/GeneralNavigationBar";
// import setUserCredentials from '../../redux/action_creators/SetUserCredentials';
import GeneralHeader from "../Headers/GeneralHeader";

class Tasks extends Component {
    constructor(props) {
        super(props)

        this.state = {
            svg: <></>
        }
    }
    componentDidMount() {
        this.setState({
            svg:
                <svg width="91" height="91" viewBox="0 0 91 91" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="91" height="91" fill="#F5F5F5" />
                    <g id="Task_Teacher" clipPath="url(#clip0_70_2830)">
                        <rect width="1440" height="791" transform="translate(-269 -251)" fill="white" />
                        <g id="Group 47">
                            <g id="Rectangle 82" filter="url(#filter0_d_70_2830)">
                                <rect x="-134" y="-90" width="360" height="260" rx="16" fill="white" />
                            </g>
                            <g id="Card" filter="url(#filter1_d_70_2830)">
                                <g id="bx:home-heart">
                                    <path id="Vector (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M48.4211 45.8527L45.5043 48.7302L42.5738 45.852C41.2316 44.5268 39.4214 43.7838 37.5352 43.7838C35.6491 43.7838 33.8388 44.5268 32.4966 45.852L32.4713 45.8769C31.8164 46.5069 31.2953 47.2625 30.9394 48.0987C30.5835 48.9349 30.4001 49.8343 30.4001 50.7431C30.4001 51.6519 30.5835 52.5513 30.9394 53.3875C31.2953 54.2237 31.8163 54.9794 32.4712 55.6095L32.4916 55.6291L45.5 68.4047L58.5288 55.6093C59.1837 54.9793 59.7048 54.2237 60.0607 53.3875C60.4165 52.5513 60.6 51.6519 60.6 50.7431C60.6 49.8343 60.4165 48.9349 60.0607 48.0987C59.7048 47.2625 59.1838 46.5068 58.5289 45.8767L58.5035 45.8524C57.1605 44.5268 55.3496 43.7834 53.4626 43.7834C51.5756 43.7834 49.7641 44.5271 48.4211 45.8527ZM45.5 72.2501L30.5691 57.5866C29.6481 56.7006 28.9154 55.6378 28.4149 54.4619C27.9145 53.2859 27.6565 52.0211 27.6565 50.7431C27.6565 49.4651 27.9145 48.2002 28.4149 47.0243C28.9154 45.8484 29.6481 44.7856 30.5691 43.8996C32.4248 42.0675 34.9275 41.0402 37.5352 41.0402C40.1429 41.0402 42.6457 42.0675 44.5014 43.8996L45.5 44.8804L46.4942 43.8996C48.3507 42.0672 50.8542 41.0398 53.4626 41.0398C56.0711 41.0398 58.5745 42.0672 60.431 43.8996C61.352 44.7856 62.0847 45.8484 62.5851 47.0243C63.0856 48.2002 63.3436 49.4651 63.3436 50.7431C63.3436 52.0211 63.0856 53.2859 62.5851 54.4619C62.0847 55.6378 61.352 56.7006 60.431 57.5866L45.5 72.2501Z" fill="black" />
                                    <path id="Vector (Stroke)_2" fillRule="evenodd" clipRule="evenodd" d="M48.652 2.22296C48.2384 1.80858 47.747 1.47983 47.2062 1.25553C46.6653 1.03122 46.0855 0.915771 45.5 0.915771C44.9145 0.915771 44.3347 1.03122 43.7938 1.25553C43.253 1.47983 42.7616 1.80858 42.3479 2.22296L2.22294 42.348C1.59963 42.9715 1.17517 43.7658 1.00322 44.6305C0.831271 45.4952 0.91956 46.3915 1.25692 47.206C1.59428 48.0205 2.16557 48.7168 2.89857 49.2067C3.63156 49.6966 4.49335 49.9581 5.37499 49.9583H9.83332V81.1667C9.83332 86.0842 13.8324 90.0833 18.75 90.0833H72.25C77.1675 90.0833 81.1667 86.0842 81.1667 81.1667V49.9583H85.625C86.5066 49.9581 87.3684 49.6966 88.1014 49.2067C88.8344 48.7168 89.4057 48.0205 89.743 47.206C90.0804 46.3915 90.1687 45.4952 89.9968 44.6305C89.8248 43.7658 89.4004 42.9715 88.777 42.348L48.652 2.22296ZM86.8367 44.2877L46.712 4.16297C46.5532 4.00384 46.3628 3.87596 46.1552 3.78983C45.9475 3.7037 45.7248 3.65936 45.5 3.65936C45.2751 3.65936 45.0525 3.7037 44.8448 3.78983C44.6371 3.87596 44.4485 4.00219 44.2896 4.16132L4.16325 44.2877C4.16315 44.2878 4.16335 44.2876 4.16325 44.2877C3.92367 44.5274 3.76023 44.8331 3.69412 45.1656C3.62799 45.4982 3.66195 45.8429 3.7917 46.1562C3.92146 46.4694 4.14119 46.7372 4.4231 46.9256C4.70486 47.114 5.0361 47.2146 5.37499 47.2147C5.37518 47.2147 5.37479 47.2147 5.37499 47.2147H12.5769V81.1667C12.5769 84.569 15.3477 87.3397 18.75 87.3397H72.25C75.6523 87.3397 78.4231 84.569 78.4231 81.1667V47.2147H85.6244C85.6246 47.2147 85.6242 47.2147 85.6244 47.2147C85.9633 47.2146 86.2951 47.114 86.5769 46.9256C86.8588 46.7372 87.0785 46.4694 87.2083 46.1562C87.338 45.8429 87.372 45.4981 87.3058 45.1656C87.2397 44.8331 87.0763 44.5274 86.8367 44.2877C86.8368 44.2878 86.8366 44.2876 86.8367 44.2877ZM74.9986 83.9103H16.0064V37.2971L45.5 7.80352L74.9936 37.2971L74.9986 83.9103ZM72.25 38.4335L72.2544 81.1667H18.75V38.4335L45.5 11.6835L72.25 38.4335Z" fill="black" />
                                </g>
                            </g>
                        </g>
                    </g>
                    <defs>
                        <filter id="filter0_d_70_2830" x="-138" y="-90" width="368" height="268" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feOffset dy="4" />
                            <feGaussianBlur stdDeviation="2" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_70_2830" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_70_2830" result="shape" />
                        </filter>
                        <filter id="filter1_d_70_2830" x="-165" y="-69" width="421" height="244" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                            <feFlood floodOpacity="0" result="BackgroundImageFix" />
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                            <feMorphology radius="2" operator="erode" in="SourceAlpha" result="effect1_dropShadow_70_2830" />
                            <feOffset dy="4" />
                            <feGaussianBlur stdDeviation="2" />
                            <feColorMatrix type="matrix" values="0 0 0 0 0.4 0 0 0 0 0.439216 0 0 0 0 0.501961 0 0 0 0.16 0" />
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_70_2830" />
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_70_2830" result="shape" />
                        </filter>
                        <clipPath id="clip0_70_2830">
                            <rect width="1440" height="791" fill="white" transform="translate(-269 -251)" />
                        </clipPath>
                    </defs>
                </svg>
        })
    }
    render() {
        return (
            <>
                <GeneralHeader></GeneralHeader>

                <div className="flex-container">
                    <div className="navigationSide">
                        <GeneralNavigationBar menuItemToSelect={1} role={this.props.credentials.roles} />
                    </div>
                    <div className="generalSide">
                        <div className="d-flex flex-row justify-content-between m-2 p-2">
                            <div>
                                Завдання
                            </div>
                            <div>
                                <select>
                                    <option>Мої предмети</option>
                                </select>
                            </div>
                        </div>
                        <div className="links-container">
                            {/* <div className="task-link"> */}
                            <div>
                                <NavLink to="/teacher-page/home-tasks" className="task-link">
                                    <span >Домашні завдання</span>
                                    {this.state.svg}
                                </NavLink>
                            </div>
                            {/* <a href="/teacher-page/home-tasks"> Домашні завдання</a> */}
                            {/* </div> */}
                            <div>
                                <NavLink to="/teacher-page/home-tasks" className="task-link">
                                    <span>Класні завдання</span>
                                    {this.state.svg}
                                </NavLink>
                                {/* <a href="/teacher-page/home-tasks"> Класні завдання</a> */}
                            </div>
                            <div>
                                <NavLink to="/teacher-page/home-tasks" className="task-link">
                                    <span>Контрольні роботи</span>
                                    {this.state.svg}
                                </NavLink>
                                {/* <a href="/teacher-page/home-tasks"> Контрольні роботи</a> */}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

function mapStateToProps(state) {
    console.log("mapStateToProps ")
    console.log(state)

    return {
        credentials: state.currentUser.credentials,
    }
}

export default connect(mapStateToProps)(Tasks);
