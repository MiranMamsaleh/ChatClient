import { User } from './user';
import { Message } from './message';
export class Group {
    constructor(
        public _id: string = "",
        public groupName: string = "",
        public users: string[] = new Array<string>(),
        public admins: string[] = new Array<string>(),
        public messages: Message[] = new Array<Message>()
    ) { }
}
