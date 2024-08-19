import { Backend } from "./Backend";


export class Kingfish{

    public async start(){
        await Backend.connect();

        await Backend.getStudents2("AOWD")

        await Backend.getevent();

        await Backend.getevent1();

    }
}