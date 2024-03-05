const BASE_URL = 'http://localhost:8080'; 
//10.0.2.16
const fetchData = async (endpoint) => {
  try {
    console.log(`${BASE_URL}${endpoint}`);
    const response = await fetch(`${BASE_URL}${endpoint}`,{ method: 'POST'});
    console.log(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data);
    console.log(`${BASE_URL}${endpoint}`);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; 
  }
};

export default fetchData;

const getUserByUsername = async (user) => {
  try {
    await fetch(`http://10.0.2.2:8080/users/${user}`)
    .then( async (response) => {
      let data = await response.json();
      if(data.status === 200){
        console.log(data)
      }else{
        if(data.status===404)
       console.log("user doesent exist")
      }

    })
    .catch((err) => {
        console.log(err);
    })
    
  } catch (error) {
    console.error(error);
  }
};