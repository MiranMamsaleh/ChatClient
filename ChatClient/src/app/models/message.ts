import { User } from './user';
export class Message {
    constructor(
        public _id: string = "",
        public creator: string = "",
        public message: string = "",
        public timestamp: string = ""
    ) { }
}
