import h337 from 'heatmap.js'

const heatmap = document.querySelector('.heatmap')
const downloadLink = document.querySelector('#download')
const saveHeatmapBtn = document.querySelector('.heatmap-save')
const resetHeatmapBtn = document.querySelector('.heatmap-reset')

// ****************************************************************************
// Create Heatmap Instance
// ****************************************************************************
const heatmapInstance = h337.create({
  container: heatmap,
  radius: window.innerWidth * 0.06,
  blur: 1,
})

// ****************************************************************************
// Plot coordinate to heatmap instance
// ****************************************************************************
const addCoord = (ev) => {
  heatmapInstance.addData({
    x: ev.layerX,
    y: ev.layerY,
    value: 1,
  })
}

// ****************************************************************************
// Save image of heatmap
// ****************************************************************************
const saveHeatmap = (ev) => {
  const imageData = heatmapInstance.getDataURL()
  downloadLink.setAttribute(
    'download',
    `bumblebee-${Math.round(new Date() / 1000)}.png`
  )
  downloadLink.href = imageData
  downloadLink.click()
  downloadLink.preventDefault()
}

// ****************************************************************************
// Reset heatmap
// ****************************************************************************
const resetHeatmap = (ev) => {
  var data = {
    max: 100,
    min: 0,
    data: [],
  }
  heatmapInstance.setData(data)
}

// ****************************************************************************
// Save Image on keypress
// ****************************************************************************
const handleKeys = (ev) => {
  switch (ev.key) {
    case 'Enter':
      saveHeatmap()
      break

    case 'r':
      resetHeatmap()
      break

    default:
      break
  }
}

// ****************************************************************************
// Plot mouse position to heatmap
// ****************************************************************************
heatmap.addEventListener('mousemove', addCoord)
saveHeatmapBtn.addEventListener('click', saveHeatmap)
resetHeatmapBtn.addEventListener('click', resetHeatmap)
window.addEventListener('keyup', handleKeys)
