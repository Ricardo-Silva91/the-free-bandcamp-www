const acceptedStatus = ['ready', 'loading', 'error'];

export default {
    state: () => ({
        latestAlbums: [],
        albums: [],
        vinylAlbums: [],
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
        setVinylAlbums(state, vinylAlbums) {
            state.vinylAlbums = vinylAlbums;
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

                commit('setLatestAlbums', json.map((album) => ({ ...album, tags: JSON.parse(album.tags) })));
                commit( 'setStatus', 'ready' );
                
            } catch (error) {
                commit( 'setStatus', 'error' );
            }            
        },
        async getLatestVinylAlbumsFromRemote( { commit } ){
            commit( 'setStatus', 'loading' );
            
            try {
                const result = await fetch('/api/getVinylRows');
                const json = await result.json();

                console.log({ json });

                commit('setVinylAlbums', json.map((album) => ({ ...album, tags: JSON.parse(album.tags) })));
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
        vinylAlbums (state) {
            return state.vinylAlbums;
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
