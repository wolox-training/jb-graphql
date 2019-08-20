const { query } = require('../server.spec');
const { getAlbum, getAlbums } = require('./graphql');
const albumsFactory = require('../factories/album');
const albumMocks = require('../mocks/albums');
const albumId = 1;
const albumFourTimes = [1, 2, 3, 4];
const albumTwoTimes = [1, 2];

describe('albums', () => {
  describe('queries', () => {
    it('should get an album', () => {
      albumMocks.getAlbum(albumId, albumsFactory.responseAlbumOK);
      albumMocks.getPhotos(albumId);
      return query(getAlbum(albumId)).then(response => {
        expect(response.data).toHaveProperty('album', expect.any(Object));
        const { album } = response.data;
        expect(album.id).toEqual(albumsFactory.oneAlbum.id.toString());
        expect(album.title).toEqual(albumsFactory.oneAlbum.title);
        expect(album.artist).toEqual(albumsFactory.oneAlbum.userId);
        expect(album).toHaveProperty('photos', expect.any(Array));
      });
    });

    it('should fail to get an album by api error', () => {
      albumMocks.getAlbumsApiError(albumId);
      return query(getAlbum(albumId)).then(response => {
        expect(response).toHaveProperty('errors', expect.any(Array));
        expect(response.errors[0]).toHaveProperty('message', 'Cannot fetch album from external api');
      });
    });

    it('should get the list of albums', () => {
      albumMocks.getAlbums();
      albumMocks.getPhotosFourTimes(albumFourTimes);
      return query(getAlbums({})).then(response => {
        expect(response.data).toHaveProperty('albums', expect.any(Array));
      });
    });

    it('should get the list of paginated and ordered albums', () => {
      albumMocks.getAlbums();
      albumMocks.getPhotosTwoTimes(albumTwoTimes);
      return query(getAlbums({ offset: 0, limit: 2, sortField: 'title', sortOrder: 'ASC' })).then(
        response => {
          expect(response.data).toHaveProperty('albums', expect.any(Array));
          const { albums } = response.data;
          expect(albums.length).toBe(2);
          expect(albums[0].title < albums[1].title).toEqual(true);
        }
      );
    });

    it('should get the list of albums: filtered', () => {
      albumMocks.getAlbums();
      albumMocks.getPhotos(2);
      return query(getAlbums({ fieldFilter: 'title', valueFilter: 'sunt qui excepturi placeat culpa' })).then(
        response => {
          expect(response.data).toHaveProperty('albums', expect.any(Array));
          const { albums } = response.data;
          expect(albums[0]).toHaveProperty('title', expect.stringContaining('excepturi'));
        }
      );
    });
  });
});
