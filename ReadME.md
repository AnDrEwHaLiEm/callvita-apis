<pr>



    There is Two DataBase one for testing and other for app
    To use Test dataBase make  in .env ENV=dataBaseTest 
    To run ts file use npm run dev
    To run app after building use npm run start
    To run test *dataBase will use test database auto* npm run test

    *there is two library i used to use them in my project ESlint and prettier*


    To run ESlint use npm run lint
    To run prettier use npm run prettier 

    *removeHashingFile I used binary search twice although I got the same result I made that because maybe anyone adds anything wrong to the file manually and this will make result different but if I can be sure the database is correct data i will not use it twice*

    EndPoint APIS =>{
        create Task =>{
            POST=>'/task/create'
            body=>{
                id:string    //must be unique
                title:string
                description:string
            }
            response=>{
                status 200
                body=>{
                    id:string
                    title:string
                    description:string
                }
                Or 
                status 400
                body => 'Error when add task' or 'ID is Exist'
            }
        }
        Edit Task =>{
            PUT=>'/task/edit/:id'   //id = task id
            body=>{
                title:string
                description:string
            }
            response=>{
                status 200
                body=>{
                    id:string
                    title:string
                    description:string
                }
                or
                status 400
                body => "Error when Edit task" or "Not Found"
            }
        }

        delete Task =>{
            DELETE=>'/task/delete/:id   //id = task id
            response=>{
                status 200
                body=>{
                    Deleted
                }
                or
                status 400
                body =>"Not Found" or "Error when delete task"
            }
        }

        getALl =>{
            GET=>'/task/getMany'
            response=>{
                status 200
                body=>{
                    [
                        {
                            id:string
                            title:string
                            description:string
                        }
                    ]
                }
                or
                body=> []
            }
        }
        get By Title =>{
            GET =>'/task/get/title/:title'  //title of task May be many of task has same title
            response=>{
                status 200
                body=>{
                    [
                        {
                            id:string
                            title:string
                            description:string
                        }
                    ]
                }
                or
                body=> []
            }

        }
        get By description =>{
            GET =>'/task/get/description/:description'  // same as get by title
            response=>{
                status 200
                body=>{
                    [
                        {
                            id:string
                            title:string
                            description:string
                        }
                    ]
                }
                or
                body=> []
            }

        }
        get By id =>{
            Get => '/task/getOne/:id'    //id that use enter when create task
            body=>{
                id:string
                title:string
                description:string
            }
            or 
            body => "Not Found"
        }
    }
</pr>