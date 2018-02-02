export class Auth {

}

export class RegisterData {
    constructor(
        public username = '',
        public password = '',
        public repassword = ''
    ) {

    }
}

export class LoginData {
    public username = '';
    public password = '';
    constructor() { }
}

export interface Response {
    success: boolean;
    token?: string;
}
