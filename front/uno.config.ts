import { defineConfig, presetUno, presetWebFonts, presetMini, presetWind } from 'unocss'

export default defineConfig({
    presets: [
        presetMini(),
        presetUno(),
        presetWebFonts(),
        presetWind()
    ],
    theme: {
        animation: {
            keyframes: {
                'enter-from-right': '{from { opacity: 0; transform: translateX(200px); } to { opacity: 1; transform: translateX(0); }}',
                'enter-from-left': '{from { opacity: 0; transform: translateX(-200px); } to { opacity: 1; transform: translateX(0); }}',
                'exit-to-right': '{from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(200px); }}',
                'exit-to-left': '{from { opacity: 1; transform: translateX(0); } to { opacity: 0; transform: translateX(-200px); }}',
                'scale-in': '{from { opacity: 0; transform: rotateX(-10deg) scale(0.9); } to { opacity: 1; transform: rotateX(0deg) scale(1); }}',
                'scale-out': '{from { opacity: 1; transform: rotateX(0deg) scale(1); } to { opacity: 0; transform: rotateX(-10deg) scale(0.95); }}',
                'fade-in': '{from { opacity: 0 } to { opacity: 1 }}',
                'fade-out': '{from { opacity: 1 } to { opacity: 0 }}',
            },
            durations: {
                'enter-from-right': '0.25s',
                'enter-from-left': '0.25s',
                'exit-to-right': '0.25s',
                'exit-to-left': '0.25s',
                'scale-in': '0.20s',
                'scale-out': '0.20s',
                'fade-in': '0.20s',
                'fade-out': '0.20s',
            },
            timingFns: {
                'enter-from-right': 'ease',
                'enter-from-left': 'ease',
                'exit-to-right': 'ease',
                'exit-to-left': 'ease',
                'scale-in': 'ease',
                'scale-out': 'ease',
                'fade-in': 'ease',
                'fade-out': 'ease',
            },
        }
    }
})
