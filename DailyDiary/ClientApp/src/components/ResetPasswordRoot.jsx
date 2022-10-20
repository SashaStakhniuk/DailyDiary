import React from "react";
import { useState } from "react";
import styled from "styled-components";
import '../styles/ResetPasswordRoot.css'

const ResetPasswordRoot = ({}) => {

    const [isValid, setIsValid] = useState(false)
    return (
        <div className='all-container'>
        <FlexColumn>
            <FlexColumn1>
            <ServiceName1>
                <Text1>Logo</Text1>
                <Text2>Service name</Text2>
            </ServiceName1>
            <Text3>Будь ласка, введіть новий пароль</Text3>
            </FlexColumn1>
            <FlexColumn2>
            <FlexColumn3>
                <FlexColumn4>
                <span calssName="title_input">Новий пароль</span>
                <div className="input__login invalid">
                    <div className="input-container invalid">
                    <input value="********" className="input__password invalid" type="text"/>
                        {isValid == true ? <img className="imageeay invalid"
                            src={`https://file.rendit.io/n/dbNBzD8Tkah8McqOu7Na.svg`}
                        /> : <img className="imageeay invalid"
                                src={`https://file.rendit.io/n/tVB0RF3gQlpQceYlq56H.svg`}
                                />}
                    </div>
                </div>
                </FlexColumn4>
                <FlexColumn4>
                <span calssName="">Підтвердити пароль</span>
                <div className="input__login">
                    <div className="input-container invalid">
                    <input className="input__password" type="text"/>
                    {isValid == true ? <img className="imageeay invalid"
                            src={`https://file.rendit.io/n/dbNBzD8Tkah8McqOu7Na.svg`}
                        /> : <img className="imageeay invalid"
                                src={`https://file.rendit.io/n/tVB0RF3gQlpQceYlq56H.svg`}
                                />}
                    </div>
                </div>
                </FlexColumn4>
            </FlexColumn3>
            <FlexColumn6>
                <div className="btn-container">
                <button className="btn-submit">Змінити пароль</button>
                <span className="back-text">Повернутися до сторінки входу</span>
                </div>
            </FlexColumn6>
            </FlexColumn2>
        </FlexColumn>
        </div>
    );
};

const FlexColumn4 = styled.div`
  gap: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
const Text4 = styled.div`
  font-size: 16px;
  font-family: Inter;
  white-space: nowrap;
`;
const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-style: solid;
  border-color: #e4e4e7;
  border-radius: 16px;
  padding: 15px;
  border-width: 1px;
`;
const FlexRow1 = styled.div`
  width: 488px;
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Text5 = styled.div`
  color: #9fa6b2;
  font-size: 14px;
  font-family: Inter;
  white-space: nowrap;
`;
const Image1 = styled.img`
  width: 16px;
  height: 14.66px;
`;
const ResetPasswordRootRoot = styled.div`
  width: 1440px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  overflow: hidden;
  padding: 326.12px 0px;
`;
const FlexColumn = styled.div`
  gap: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const FlexColumn1 = styled.div`
  gap: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const ServiceName1 = styled.div`
  gap: 12px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;
const Text1 = styled.div`
  width: 32px;
  height: 22px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  color: #fbfbfb;
  font-size: 14px;
  font-family: Open Sans;
  line-height: 22px;
  text-align: center;
  white-space: nowrap;
  border-style: solid;
  border-color: #d1d5db;
  border-radius: 2px;
  padding: 3.5px 4px 3.5px 5px;
  border-width: 1px;
`;
const Text2 = styled.div`
  color: #333333;
  font-size: 20px;
  font-family: Open Sans;
  line-height: 24px;
  text-align: center;
  white-space: nowrap;
  letter-spacing: -0.2px;
`;
const Text3 = styled.div`
  font-size: 20px;
  font-weight: 500;
  font-family: Inter;
  white-space: nowrap;
`;
const FlexColumn2 = styled.div`
  gap: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
const FlexColumn3 = styled.div`
  gap: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;
const FlexColumn6 = styled.div`
  gap: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const FlexColumn7 = styled.div`
  gap: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const BlueBellText = styled.div`
  width: 442px;
  height: 48px;
  gap: 8px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  font-family: Inter;
  white-space: nowrap;
  background-color: #aeb9f1;
  border-radius: 12px;
  padding: 0px 39px;
`;
const Text8 = styled.div`
  color: #f2982a;
  font-size: 16px;
  font-family: Inter;
  text-decoration: underline;
  white-space: nowrap;
`;


export default ResetPasswordRoot