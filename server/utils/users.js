class Users{

    constructor(){
        this.users = [];
    }

    addUser(id, name, room) {
        const user = {id, name, room};
        this.users.push(user);

        return user;
    }

    getUser(id){
        return this.users.filter(user => user.id === id)[0];
    }

    getUsersList(room) {
        const users = this.users.filter(user => user.room === room);
        return users.map(user => user.name);
    }

    removeUser(id){
        const user = this.getUser(id);

        if(user){
            this.users.filter(user => user.id !== id);
        }
        
        return user;
        
    }

}

module.exports = {Users}