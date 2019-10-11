import logoImg from '../assets/logo.png'
import { BaseScene } from './BaseScene'

export class StartScene extends BaseScene {
  constructor () {
    super({
      key: 'StartScene',
      showTimer: false,
    });
    console.log('test')
  }

  preload () {
    this.load.image("logo", logoImg);
  }

  create () {
    const logo = this.add.image(400, 150, "logo");
    logo.setInteractive()
    logo.addListener('pointerdown', () => {
      console.log('pointerdown image')
      logo.setScale(1.1, 1.1)
    });

    this.input.on('pointerdown', (e) => {
      console.log('clicked', e)
    })

    const helloButton = this.add.text(100, 100, 'Hello Phaser!', { fill: '#0f0' });
    helloButton.setInteractive();

    helloButton.on('pointerdown', () => { console.log('pointerdown'); });
  }
}
