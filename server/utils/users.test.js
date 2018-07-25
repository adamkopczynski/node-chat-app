const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'John',
            room: 'Node'
        },{
            id: '2',
            name: 'Mike',
            room: 'React'
        },{
            id: '3',
            name: 'Jen',
            room: 'Angular'
        }]
    })

    it('should add new user', () => {
        const user = {
            id: '123',
            name: 'test',
            room: 'test'
        };

        const res = users.addUser(user.id, user.name, user.room);

        expect(res).toEqual(user);
    })

    it('should return list of users name in React room', () => {
        const names = users.getUsersList('React');

        expect(names.length).toBe(1);
        expect(names).toEqual(['Mike']);
    })

    it('should remove user', () => {
        expect(users.removeUser('1').name).toBe('John');
    })

    it('should not remove user', () => {
        expect(users.removeUser(0129)).toBeFalsy();
    })

    it('should find user', () => {
        expect(users.getUser('1').name).toBe('John');
    })

    it('should not find user', () => {
        expect(users.getUser(0129)).toBeFalsy();
    })
})