import { create } from 'zustand'

export type TypeThemeBoard = 'classic' | 'desert' | 'pink' | 'purple' | 'red' | 'stone'
interface CustomBoard {
	colorDarkTile: string
	colorLightTile: string
	selectedTheme: { board: TypeThemeBoard; figures: string }
	tileSize: string
	setColorDarkTile: (colorDarkTile: string) => void
	setColorLightTile: (colorLightTile: string) => void
	setSelectedTheme: (selectedTheme: { board?: TypeThemeBoard; figures?: string }) => void
	setTileSize: (tileSize: string) => void
}

export const useCustomBoard = create<CustomBoard>((set) => ({
	// 70
	tileSize: '70',
	colorLightTile: '#ecd4b1',
	colorDarkTile: '#b68565',
	setColorDarkTile: (colorDarkTile) =>
		set({
			colorDarkTile
		}),
	selectedTheme: { board: JSON.parse(localStorage.getItem('selectedTheme')!)?.board ?? 'desert', figures: 'classic' },
	setSelectedTheme: (selectedTheme) =>
		set((state) => {
			localStorage.setItem('selectedTheme', JSON.stringify(selectedTheme))
			return {
				selectedTheme: {
					board: selectedTheme.board ?? state.selectedTheme.board,
					figures: selectedTheme.figures ?? state.selectedTheme.figures
				}
			}
		}),
	setColorLightTile: (colorLightTile) => set({ colorLightTile }),
	setTileSize: (tileSize) => set({ tileSize })
}))
