const ComponentBuilder = require('./../utils/Component-builder')
const { inspect } = require('util')

module.exports = function (definition, options) {
  const { sources } = definition

  const opts = {
    muted: false,
    language: 'en',
    playbackRates: [0.7, 1.0, 1.5, 2.0],
    height: '500px',
    width: '100%',
    sources: sources.map(({ mimeType, url }) => {
      return {
        type: mimeType,
        src: url
      }
    })
  }

  const builder = new ComponentBuilder(definition)

  const videoPlayer = builder.addTag('video-player')
  videoPlayer.addAttribute('class', 'video-player-box q-mt-md')
  videoPlayer.addAttribute('ref', 'videoPlayer')
  videoPlayer.addAttribute(':options', inspect(opts))

  return builder.compile()
}
