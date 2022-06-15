const acceptedStatus = ['ready', 'loading', 'error'];

export default {
    state: () => ({
        latestAlbums: [],
        albums: [],
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
    },
    actions: {
        async getLatestAlbumsFromRemote( { commit } ){
            commit( 'setStatus', 'loading' );
            
            try {
                const result = await fetch('/api/getPages?page=latest');
                const json = await result.json();

                commit('setLatestAlbums', json.data.map((album) => ({
                    ...album.data,
                    art_url: album.data.art_url.replace('_7.', '_10.'),

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
    },
    getters: {
        latestAlbums (state) {
            return state.latestAlbums;
        },
        albumsByPage: (state) => (page) => {
            return state.albums.find((albumsPage) => albumsPage.page === page);
        },
        albumsStatus (state) {
            return state.status;
        }
    }
  };
