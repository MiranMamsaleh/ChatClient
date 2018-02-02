export class User {
    constructor(
        public _id: string = "",
        public username: string = "",
        public lastSeen: string = "",
        public onlineState: boolean = false,
        public status: string = ""
    ) { }
}
