import { Cursor, Session, Table,Record, Filter, Filters, FilterGroup, Query } from 'futureforms';


export class Backend{
    private static session:Session = null;
    public static async connect(){
        Backend.session = new Session();
        let success:boolean = await Backend.session.connect("hr","hr");
        console.log("connected "+success);  
    }

    public static async getStudents(event_name:string){
        let filter:Filter = Filters.Equals("event_name" , event_name);
        let table:Table = new Table(Backend.session,"CoursestudentsDS");
        let cursor:Cursor = await table.select("*",new FilterGroup(filter));
        while(await cursor.next()){
            let record:Record = cursor.fetch();
            console.log(record.get("first_names")+" "+ record.get("last_name"));
        }
        
        
    }

    public static async getStudents2(event_name:string){
        let filter:Filter = Filters.Equals("event_name" , event_name);
        let table:Table = new Table(Backend.session,"CoursestudentsDS");
        let query:Query =  table.createQuery("*",new FilterGroup(filter));
        //we get all rows at once when we set it 0
        query.setArrayFetch(0);       
        let cursor:Cursor = await query.execute("AOWD #01");
        while(await cursor.next()){
            let record:Record = cursor.fetch();
            console.log(record.get("first_names")+" "+ record.get("last_name"));
        }
        cursor.close();
    }

    public static async getevent(){
        // let filter1:Filter = Filters.Equals("event_name" , event_name);
        // let filter2:Filter = Filters.Equals("start_date" , start_date);
        // let arrayfilter:Filter[] = [filter1 , filter2];
        let rows:number = 0
        let table:Table = new Table(Backend.session,"eventsDS");
        let query:Query =  table.createQuery("*");
        //we get all rows at once when we set it 0
        let event = document.querySelector("#event");
        let cursor:Cursor = await query.execute();
        while(await cursor.next()){
            let record:Record = cursor.fetch();
            // // console.log(record.get("event_name")
            let td = event.querySelector("td")
            td.innerText = (record.get("event_name")+ " "+record.get("max_amount_instructors"))
            rows++;
            console.log(cursor.fetch()+"");
            }
            cursor.close();

        }


        public static async getevent1(){
            //to create table for backend table eventsDS
            let table:Table = new Table(Backend.session,"eventsDS");
            //for querying the table in order to get/select columns
            let query:Query =  table.createQuery("*");
            //to execute the query
            let cursor:Cursor = await query.execute();
            let eventTable:HTMLTableElement = document.querySelector("#event");
    
            if(eventTable) {
                while(await cursor.next()) {
                    let record: Record = cursor.fetch();
                    let eventName: string = record.get("event_name")
                    let eventDate =  record.get("start_date")

                    if (eventName && eventDate) {
                        let dateOnly = new Date(eventDate).toISOString().split('T')[0];

                        //Insert new row in table
                        let newRow: HTMLTableRowElement = eventTable.insertRow();
    
                        // Insert event name cell
                        let eventNameCell: HTMLTableCellElement = newRow.insertCell();
                        eventNameCell.innerHTML = eventName;
    
                        // Insert event date cell
                        let eventDateCell: HTMLTableCellElement = newRow.insertCell();
                        eventDateCell.innerHTML = dateOnly; 
                    }
                    }
                }
                cursor.close();
        }        
    }


   

            
        
    
    
  
        
    
    
    

    

    

