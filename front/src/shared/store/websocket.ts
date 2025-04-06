import { create } from 'zustand'

interface Websocket {
	idRoom: string | null
	myColor: 'b' | 'w' | null
	playerBlackId: number | null
	playerWhiteId: number | null
	websocket: WebSocket | null
	setIdRoom: (state: string) => void
	setMyColor: (state: 'b' | 'w') => void
	setPlayerBlackId: (state: number) => void
	setPlayerWhiteId: (state: number) => void
	setWebsocket: (state: WebSocket) => void
}

export const useWebsocket = create<Websocket>((set) => ({
	idRoom: null,
	websocket: null,
	myColor: null,
	playerWhiteId: null,
	playerBlackId: null,
	setMyColor: (state) => set(() => ({ myColor: state })),
	setPlayerWhiteId: (state) => set(() => ({ playerWhiteId: state })),
	setPlayerBlackId: (state) => set(() => ({ playerBlackId: state })),
	setIdRoom: (state) => set(() => ({ idRoom: state })),
	setWebsocket: (state) => set(() => ({ websocket: state }))
}))

export const myColor = () => {
	const idUser = localStorage.getItem('idUser')
	if (idUser === useWebsocket.getState().playerBlackId) {
		useWebsocket.getState().setMyColor('b')
	} else if (idUser === useWebsocket.getState().playerWhiteId) {
		useWebsocket.getState().setMyColor('w')
	}
}
