const canvasSketch = require('canvas-sketch')
const { lerp } = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')

const settings = {
  dimensions: [2048, 2048],
}

const sketch = () => {
  const createGrid = () => {
    const points = []
    const count = 3
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1)
        const v = count <= 1 ? 0.5 : y / (count - 1)
        points.push({
          radius: random.value() * 0.5,
          position: [u, v],
        })
      }
    }
    return points
  }

  const points = createGrid().filter(() => random.value() > 0.5)
  const margin = 400

  // Define the color palettes (from https://access.mymind.com/colors)
  const colorPalettes = [
    { fillStyle: '#371722', strokeStyle: '#BBAB9B' },
    { fillStyle: '#776EA7', strokeStyle: '#EBB9D4' },
    { fillStyle: '#501718', strokeStyle: '#FD750A' },
    { fillStyle: '#FDB90B', strokeStyle: '#321913' },
  ]

  // Function to select a random palette
  const selectRandomPalette = () => {
    const index = Math.floor(Math.random() * colorPalettes.length)
    return colorPalettes[index]
  }

  return ({ context, width, height }) => {
    const palette = selectRandomPalette()

    context.fillStyle = palette.fillStyle
    context.fillRect(0, 0, width, height)

    points.forEach((data) => {
      const { position, radius } = data

      const [u, v] = position

      const x = lerp(margin, width - margin, u)
      const y = lerp(margin, width - margin, v)

      context.beginPath()
      context.arc(x, y, radius * width, 0, Math.PI * 2, false)
      context.strokeStyle = palette.strokeStyle
      context.lineWidth = 10
      context.stroke()
    })
  }
}

canvasSketch(sketch, settings)
