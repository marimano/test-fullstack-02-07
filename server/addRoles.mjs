import User from './users.mjs';
import Role from './roles.mjs';

const roles = [
  { role: 'Admin' }, 
  { role: 'User' }
];

const rolesUsersMap = {
  'Admin': 'John Doe',
  'User': 'Ann Lol'
};

export default () => {
  return Promise.all(roles.map(r => {
    return Role.findOne({ role: r.role })
      .then(dbRole => {
        if (dbRole) {
          console.log('Role is added before', dbRole);
          return;
        }

        console.log('Adding role');
        const roleEntry = new Role({
          role: r.role
        });
      
        return roleEntry.save()
          .then(r => {
            console.log('Role has been added', r);
            return User.findOne({ name: rolesUsersMap[r.role] })
              .then(u => {
                u.roleId = r._id;
                return u.save();
              })
          })
          .catch(err => {
            console.error('Cannot add role', err);
            throw err;
          });
      })
      .catch(err => {
        console.error('Error searching role', err);
        throw err;
      })
    }));
}