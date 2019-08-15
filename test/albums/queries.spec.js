const nock = require('nock');

const { query } = require('../server.spec');
const { getAlbum, getAlbums } = require('./graphql');
const albumsFactory = require('../factories/album');
const albumMocks = require('../mocks/albums');

describe('albums', () => {
  describe('queries', () => {
    it('should get an album', () => {
      const id = 1;
      albumMocks.getAlbum(id, albumsFactory.responseAlbumOK);
      albumMocks.getPhotos(id);
      return query(getAlbum(id)).then(response => {
        expect(response.data).toHaveProperty('album', expect.any(Object));
        const { album } = response.data;
        expect(album.id).toEqual(albumsFactory.oneAlbum.id.toString());
        expect(album.title).toEqual(albumsFactory.oneAlbum.title);
        expect(album.artist).toEqual(albumsFactory.oneAlbum.userId);
        expect(album).toHaveProperty('photos', expect.any(Array));
      });
    });

    it('should fail to get an album by api error', () => {
      const id = 1;
      albumMocks.getAlbumsApiError(id);
      return query(getAlbum(id)).then(response => {
        expect(response).toHaveProperty('errors', expect.any(Array));
        expect(response.errors[0]).toHaveProperty('message', 'Cannot fetch album from external api');
      });
    });

    it('should get the list of albums', () => {
      nock.cleanAll();
      albumMocks.getAlbums();
      albumMocks.getPhotosFiveTimes();
      return query(getAlbums({})).then(response => {
        expect(response.data).toHaveProperty('albums', expect.any(Array));
        const { albums } = response.data;
        expect(albums.length).toBe(4);
      });
    });

    it('should get the list of albums paginated', () => {
      nock.cleanAll();
      albumMocks.getAlbums();
      albumMocks.getPhotosTwoTimes();
      return query(getAlbums({ offset: 1, limit: 2 })).then(response => {
        expect(response.data).toHaveProperty('albums', expect.any(Array));
        const { albums } = response.data;
        expect(albums.length).toBe(2);
      });
    });
  });
});
