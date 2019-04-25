import { Vue, Component, Prop } from 'vue-property-decorator'
import { use } from '../utils'

type FillType = 'cover' | 'contain'
interface PhotoProps {
  [x: string]: any
}
type Height = () => number | number

const [ bem ] = use('photo')
const defaultImg = 'https://global.uban360.com/sfs/file?digest=fid69dd774de8bd1d63012d8ad3846e213d&fileType=2'
const proStatusLayer = [
  '',
  'https://global.uban360.com/sfs/file?digest=fid0a77628ba2bfff4a3e1195bc5fb68872&fileType=2',
  'https://global.uban360.com/sfs/file?digest=fidab950d2a4c30d7a17cc07e7e82ecf6a9&fileType=2',
  'https://global.uban360.com/sfs/file?digest=fidb2afb85491bd3fd7eac315e43b582b28&fileType=2',
  'https://global.uban360.com/sfs/file?digest=fid19f659059ebabad8b1d0399ce9b9e974&fileType=2',
  'https://global.uban360.com/sfs/file?digest=fid51618e88b3f5326556c4bbee57bbd4b7&fileType=2'
]

@Component
export default class EscPhoto extends Vue {
  @Prop(String) readonly src!: string
  @Prop(Boolean) readonly cover!: boolean
  @Prop(Boolean) readonly isLazy!: boolean
  @Prop(Boolean) readonly vw!: boolean
  @Prop({ type: String, default: defaultImg }) readonly defaultImgSrc!: string
  @Prop({ type: Number, default: 0 }) readonly proStatus!: number
  @Prop({ type: Number }) readonly width!: number
  @Prop({ type: [Number, Function] }) readonly height!: Height

  load: boolean = false

  size(num: number): string {
    return `${this.vw ? num / 3.75 : num}${this.vw ? 'vw' : 'px'}`
  }

  renderImg() {
    const imgProps: PhotoProps = {
      class: bem('img', false)
    }
    if (this.isLazy) {
      imgProps.attrs = {
        'data-src': this.src,
        'data-error': this.defaultImgSrc,
        'data-loading': this.defaultImgSrc
      }
    } else {
      imgProps.attrs = {
        src: this.src
      }
      imgProps.on = {
        load: () => this.load = true
      }
    }
    return <img {...imgProps} />
  }

  renderProStatus() {
    const pro: PhotoProps = {
      class: bem(['proStatus', 'img'], false),
      attrs: {
        [this.isLazy ? 'data-src' : 'src']: proStatusLayer[this.proStatus]
      }
    }
    return <img {...pro} />
  }

  render() {
    const fillStyle: FillType = this.cover ? 'cover' : 'contain'
    const photoProps: PhotoProps = {
      class: bem([ `bg-${fillStyle}`, fillStyle ]),
      style: this.isLazy ? null : { backgroundImage: this.load ? void 0 : `url(${this.defaultImgSrc})` }
    }

    photoProps.style = photoProps.style || {}
    if (typeof this.height === 'function') {
      photoProps.style.height = this.size(this.height())
    } else if (this.height) {
      photoProps.style.height = this.size(this.height)
    }
    if (this.width) {
      photoProps.style.width = this.size(this.width)
    }

    if (this.isLazy) {
      photoProps.directives = [{
        name: 'lazy-container'
      }]
    }

    return (
      <div {...photoProps}>
        {this.renderImg()}
        {!!this.proStatus && this.renderProStatus()}
      </div>
    )
  }
}
