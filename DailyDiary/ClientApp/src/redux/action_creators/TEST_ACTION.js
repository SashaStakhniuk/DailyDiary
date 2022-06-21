export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const GetApiData = "GetApiData";

export const incrementCount = () => {
  return {
    type: INCREMENT
  }
};
  
export const decrementCount = () => {
  return {
    type: DECREMENT
  }
};

 export const getApiData=(id)=> async (dispatch)=>{
    const response = await fetch (`https://jsonplaceholder.typicode.com/todos/${id}`);
    let datas="";
    if (response.ok === true){
      datas = await response.json();
      console.log(datas)
    }
    else{
      console.log("Bad request")
    }
    dispatch({
      type: GetApiData,
      payload:datas
    });
  }