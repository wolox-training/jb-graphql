const { mutate, apolloServer } = require('../server.spec'),
  { buyAlbum } = require('./graphql'),
  albumsFactory = require('../factories/album'),
  albumMocks = require('../mocks/albums'),
  { createUser } = require('../helpers');

const albumId = 3;

describe('albums', () => {
  describe('buyAlbum', () => {
    it('should return purchased album', () => {
      albumMocks.getAlbum(albumId, albumsFactory.buyAlbum);
      createUser().then(async response => {
        const user = response.data.createUser;
        await apolloServer.setContext({ user });
        mutate(buyAlbum(albumId)).then(res => {
          expect(res.data.buyAlbum.id).toEqual(albumsFactory.buyAlbum.id.toString());
          expect(res.data.buyAlbum.title).toEqual(albumsFactory.buyAlbum.title);
        });
      });
    });

    it('should fail because the token does not exist', () => {
      mutate(buyAlbum(albumId)).then(response => {
        expect(response.errors[0]).toHaveProperty('message', 'unauthorized token');
      });
    });
  });
});
