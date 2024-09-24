import User from './users.mjs';

const users = [
  { name: 'John Doe' }, 
  { name: 'Ann Lol' }
];

export default () => {
  return Promise.all(users.map(u => {
    return User.findOne({ name: u.name })
      .then(user => {
        if (user) {
          console.log('User is added before', user);
          return;
        }

        console.log('Adding user');
        const userEntry = new User({
          name: u.name,
          age: 20
        });
      
        return userEntry.save()
          .then(user => console.log('User has been added', user))
          .catch(err => {
            console.error('Cannot add user', err);
            throw err;
          });
      })
      .catch(err => {
        console.error('Error searching user', err);
        throw err;
      })
    }));
}