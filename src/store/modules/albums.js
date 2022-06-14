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
    },
    getters: {
        latestAlbums (state) {
            return state.latestAlbums;
        },
        albumsStatus (state) {
            return state.status;
        }
    }
  };
