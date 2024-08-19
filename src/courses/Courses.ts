import { Session } from "futureforms";



export class Courses{
   
        private static session:Session = null;
        public static async connect(){
            Courses.session = new Session();
            let success:boolean = await Courses.session.connect("hr","hr");
            console.log("connected "+success);  
        }
        
}