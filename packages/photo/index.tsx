import { Vue, Component, Prop } from 'vue-property-decorator'
import { use, isDef } from '../utils'

// types
import { Mods } from 'types/bem'
import { VueLazyloadImage } from 'vue-lazyload/types/lazyload'
type FillType = 'cover' | 'contain'
type Height = () => number | number
interface PhotoStyle {
  backgroundImage?: string | void
  width?: string
  height?: string
}
interface DirectiveJsx {
  name: string
  arg: string
  value: VueLazyloadImage
}
interface PhotoProps {
  class: Mods
  directives?: DirectiveJsx[]
  style?: PhotoStyle | void
  attrs?: VueLazyloadImage,
  on?: any
}

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

  size (num: number): string | undefined {
    return isDef(num)
      ? `${this.vw ? num / 3.75 : num}${this.vw ? 'vw' : 'px'}`
      : undefined
  }

  // 通过 img 标签实现居中
  // 相比 通过 background 设置麻烦了些
  // renderImg() {
  //   const imgProps: PhotoProps = {
  //     class: bem('img', false)
  //   }
  //   if (this.isLazy) {
  //     imgProps.attrs = {
  //       'data-src': this.src,
  //       'data-error': this.defaultImgSrc,
  //       'data-loading': this.defaultImgSrc
  //     }
  //   } else {
  //     imgProps.attrs = {
  //       src: this.src
  //     }
  //     imgProps.on = {
  //       load: () => this.load = true
  //     }
  //   }
  //   return <img {...imgProps} />
  // }

  renderDivBg () {
    const divProps: PhotoProps = {
      class: bem('div-bg', false)
    }
    if (this.isLazy) {
      divProps.directives = [
        {
          name: 'lazy',
          arg: 'background-image',
          value: {
            src: this.src,
            error: this.defaultImgSrc,
            loading: this.defaultImgSrc
          }
        }
      ]
    } else {
      let img: HTMLImageElement | null = new Image()
      img.src = this.src
      img.onload = () => {
        this.load = true
        img = null
      }
      divProps.style = {
        backgroundImage: `url(${this.src})`
      }
    }
    return <div {...divProps}/>
  }

  renderProStatus () {
    const pro: PhotoProps = {
      class: bem(['proStatus', 'img'], false),
      attrs: {
        src: proStatusLayer[this.proStatus]
      },
      on: {
        error: (e: Event) => {
          if (e && e.target) {
            (e.target as Element).remove()
          }
        }
      }
    }
    return <img {...pro} />
  }

  render () {
    const fillStyle: FillType = this.cover ? 'cover' : 'contain'
    const photoProps: PhotoProps = {
      class: bem(fillStyle),
      style: this.isLazy
        ? void 0
        : { backgroundImage: this.load ? void 0 : `url(${this.defaultImgSrc})` }
    }

    if (!photoProps.style) {
      photoProps.style = {}
    }
    if (typeof this.height === 'function') {
      photoProps.style.height = this.size(this.height())
    } else if (this.height) {
      photoProps.style.height = this.size(this.height)
    }
    if (this.width) {
      photoProps.style.width = this.size(this.width)
    }

    // if (this.isLazy) {
    //   photoProps.directives = [{
    //     name: 'lazy-container'
    //   }]
    // }

    return (
      <div {...photoProps}>
        {this.renderDivBg()}
        {!!this.proStatus && this.renderProStatus()}
      </div>
    )
  }
}
