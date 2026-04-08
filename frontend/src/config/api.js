const getApiUrl = () =>{
    // if(import.meta.env.PROD){
    //     return '//placeholder url'
    // }
    return 'http://localhost:5000';
};

export const API_URL = getApiUrl();
