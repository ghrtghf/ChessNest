import { create } from 'zustand'

interface CustomBoard {
	colorDarkTile: string
	colorLightTile: string
	tileSize: string
	setColorDarkTile: (colorDarkTile: string) => void
	setColorLightTile: (colorLightTile: string) => void
	setTileSize: (tileSize: string) => void
}

export const useCustomBoard = create<CustomBoard>((set) => ({
	// 70
	tileSize: '70',
	colorLightTile: '#ecd4b1',
	colorDarkTile: '#b68565',
	setColorDarkTile: (colorDarkTile) => set({ colorDarkTile }),
	setColorLightTile: (colorLightTile) => set({ colorLightTile }),
	setTileSize: (tileSize) => set({ tileSize })
}))
