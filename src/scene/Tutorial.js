import { BaseScene } from './BaseScene'
import { ScoreOverlay } from './ScoreOverlay'

export class Tutorial extends BaseScene {
  constructor (props) {
    super({
      key: 'Tutorial',
      ...props
    })
  }

  preload () {

  }

  create () {
    if (this.scene.get('ScoreOverlay')) {
      this.scene.remove('ScoreOverlay')
    }
    let scene = this.scene.add('ScoreOverlay', ScoreOverlay, true, { time: 99 })

    this.scene.get('ScoreOverlay').events.on('test', (data) => {
      console.log('got data from test event', data)
    })
  }

}
