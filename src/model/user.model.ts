type role = 'Admin' | 'Customer'

export class User {
    constructor(
        public userName: String,
        id : number,
        public email: String,
        public roles: role,
    ){}


}