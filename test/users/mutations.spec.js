const jwt = require('jwt-simple'),
  config = require('../../config'),
  userFactory = require('../factories/user'),
  { mutate } = require('../server.spec'),
  { createUser, login } = require('./graphql'),
  { checkPassword, encryptPassword } = require('../../app/helpers'),
  { secret_key } = config.common.jwt;

describe('users', () => {
  describe('mutations', () => {
    it('should create an user successfuly', () =>
      userFactory.attributes().then(user =>
        mutate(createUser(user)).then(res => {
          const { firstName, lastName, email, password, username, id } = res.data.createUser;
          expect(firstName).toEqual(user.firstName);
          expect(lastName).toEqual(user.lastName);
          expect(email).toEqual(user.email);
          expect(checkPassword(user.password, password)).toBe(true);
          expect(username).toEqual(user.username);
          expect(id).toBeDefined();
        })
      ));

    it('should return the token', async () => {
      await userFactory.create({ password: encryptPassword('ubuntu2018') }).then(user =>
        mutate(login({ username: user.username, password: 'ubuntu2018' })).then(res => {
          const data = res.data.login;
          expect(data).toHaveProperty('accessToken');
          expect(jwt.decode(data.accessToken, secret_key).username).toStrictEqual(user.username);
        })
      );
    });

    it('incorrect username', async () => {
      await userFactory.create({ password: encryptPassword('ubuntu2018') }).then(user =>
        mutate(login({ username: 'testjabh', password: user.password })).then(res => {
          expect(res.data).toHaveProperty('login', null);
          expect(res.errors[0]).toHaveProperty('message', 'Error: The username provided is incorrect');
        })
      );
    });

    it('incorrect password', async () => {
      await userFactory.create({ password: encryptPassword('ubuntu2018') }).then(user =>
        mutate(login({ username: user.username, password: user.password })).then(res => {
          expect(res.data).toHaveProperty('login', null);
          expect(res.errors[0]).toHaveProperty('message', 'Error: The password provided is incorrect');
        })
      );
    });
  });
});
