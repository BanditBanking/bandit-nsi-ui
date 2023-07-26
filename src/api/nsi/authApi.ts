import { Moment } from 'moment';
import instance from '../instance'
import { AxiosResponse } from 'axios';

export type LoginDTO = {
    mail: string;
    password: string;
};

export type SessionToken = {
    id: string,
    mail: string,
    token: string,
    expiration: Moment,
    role: string
}

class AuthApi {
    static async authenticateAsync(loginDTO?: LoginDTO) {
        return instance.post<LoginDTO, AxiosResponse<SessionToken>>(`/auth/login`, loginDTO, { withCredentials: true });
    }
}

export default AuthApi;