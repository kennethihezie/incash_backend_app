import * as bcrypt from 'bcrypt';


export class Helpers {
    static async hashData(data: string): Promise<string> {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(data, saltOrRounds);
        
        return hash
    }

    static async verifyData(userPass: string, incomingPass: string): Promise<boolean>  {        
        const isMatch = await bcrypt.compare(incomingPass, userPass);
        return isMatch
    }
}