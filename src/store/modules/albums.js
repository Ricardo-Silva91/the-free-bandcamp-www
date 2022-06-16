const acceptedStatus = ['ready', 'loading', 'error'];

export default {
    state: () => ({
        latestAlbums: [],
        albums: [],
        artist: {},
        status: 'ready',
    }),
    mutations: {
        setStatus(state, newStatus) {
            if (acceptedStatus.includes(newStatus)) {
                state.status = newStatus;
            }
        },
        setLatestAlbums(state, latestAlbums) {
            state.latestAlbums = latestAlbums;
        },
        addAlbumsPage(state, albums) {
            state.albums = [...state.albums, albums];
        },
        addAlbumsArtist(state, { albums, artist }) {
            state.artist = {
                ...state.artist,
                [artist]: albums,
            };
        },
    },
    actions: {
        async getLatestAlbumsFromRemote( { commit } ){
            commit( 'setStatus', 'loading' );
            
            try {
                const result = await fetch('/api/getLatest');
                const json = await result.json();

                console.log({ json });

                commit('setLatestAlbums', json.map((album) => ({
                    ...album,
                    art_url: album.art_url.replace('_7.', '_10.'),

                })));
                commit( 'setStatus', 'ready' );
                
            } catch (error) {
                commit( 'setStatus', 'error' );
            }            
        },
        async getAlbumsFromRemoteByPage( { commit }, page){
            commit( 'setStatus', 'loading' );
            
            try {
                const result = await fetch(`/api/getPages?page=${page}`);
                const json = await result.json();

                commit('addAlbumsPage', {
                    page: page,
                    albums: json.data.map((album) => ({
                        ...album,
                        art_url: album.art_url.replace('_7.', '_10.'),
                    }))
                });
                commit( 'setStatus', 'ready' );
                
            } catch (error) {
                commit( 'setStatus', 'error' );
            }            
        },
        async getAlbumsFromRemoteByArtist( { commit }, artist){
            commit( 'setStatus', 'loading' );
            
            try {
                const result = await fetch(`/api/getArtist?artist=${artist}`);
                const json = await result.json();

                commit('addAlbumsArtist', {
                    artist,
                    albums: json.map((album) => ({
                        ...album,
                        art_url: album.art_url.replace('_7.', '_10.'),
                    }))
                });
                commit( 'setStatus', 'ready' );
                
            } catch (error) {
                commit( 'setStatus', 'error' );
            }            
        },
    },
    getters: {
        latestAlbums (state) {
            return state.latestAlbums;
        },
        albumsByPage: (state) => (page) => {
            return state.albums.find((albumsPage) => albumsPage.page === page);
        },
        albumsByArtist: (state) => (artist) => {
            return state.artist[artist] || [];
        },
        albumsStatus (state) {
            return state.status;
        }
    }
  };
