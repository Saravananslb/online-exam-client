import Cookies from 'universal-cookie';
import axios from 'axios';

export const cookie = new Cookies();
axios.defaults.baseURL = 'http://localhost:8000/api/v1';

export const signUpUser = async(user) => {
    return await axios.post('/auth/signup', user, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const signInUser = async(user) => {
    return await axios.post('/auth/signin', user, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const validateUser = async() => {
    return await axios.get(`/auth/validate`, {
        headers: {
            'Content-Type': 'application/json',
            authorization: cookie.get('Authorization')
        }
    });
}

export const addAnswers = async(body) => {
    return await axios.post(`/exams/answer`, body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.get('Authorization')
        }
    });
}


export const getQuestions = async(examId="") => {
    return await axios.get(`/exams/questions?examId=${examId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.get('Authorization')
        }
    });
}

export const getResults = async(examId="") => {
    return await axios.get(`/exams/results?examId=${examId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.get('Authorization')
        }
    });
}

export const addQuestions = async(body) => {
    return await axios.post(`/exams/questions`, body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.get('Authorization')
        }
    });
}

