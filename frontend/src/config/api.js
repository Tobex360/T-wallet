const getApiUrl = () =>{
    if(import.meta.env.PROD){
        return 'https://t-wallet-mt4t.onrender.com';
    }
    return 'http://localhost:5000';
};

export const API_URL = getApiUrl();
