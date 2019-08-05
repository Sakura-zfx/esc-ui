import { Component, Prop, Mixins } from 'vue-property-decorator'
import { use } from '../utils'
import popup from '../mixins/popup'

// 公共动画样式
import '../style/animation.styl'

const [bem] = use('popup')
const closeIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkBAMAAACCzIhnAAAAJ1BMVEUAAAAnJycmKjAoKTEmKi8mKi8nKy8mKjAmKjAmKjEpKTMmKjAoLDJ3Ovc0AAAAC3RSTlMABvkf59pB8+NJGWle3esAAAFMSURBVFjD7M2hDcJQFIXhvpCg3xqkFQgEHkdYgASBZwQkG5CwARNUUHFdQ/dCX/6k/wK98pyb8zXLLdc01R4KgyKTGK2vbZ01Vufyl6y7R5lF9uO15uQ2fBMD5HT/lIxE2x3KDLIb+0hMffbRJwZIG+0mbV7uEYkBEjFMKduPkRki0T2QJQYIFhHKIFJBEBvC3BEWgkiDLakUQWcISkXQOsLaEfZcEUYRMo6QUYSMI2QUIUPEGSDOEHEGiDNAnAGizPENxJjpAkQZIM4AcQaIMwlx5sd+HRsBDMJAEMyJ6IOWKE7NqC+pBM3Gcu6xAfF/d/7rj2RceQV+TJYPmyxHCQMjYwnDL1cMLrLEBYSSRB8ErMQ4lIVUEhSf1CuUuKACAIlgD8CVIByAouAoQK+gNQA8aALICCgPiBXoG0iiq+hceEGrQd73qY0CBgD+QcT0W2gJGAAAAABJRU5ErkJggg=='

type Position = 'center' | 'bottom' | 'right'

@Component
export default class EscPopup extends Mixins(popup) {
  @Prop({ type: String, default: 'center' }) readonly position!: Position

  get isCenter () {
    return this.position === 'center'
  }

  onClickTitle (type: string) {
    this.$emit('on-click-title', type)
  }

  render () {
    let transitionName = 'esc-dialog'
    if (!this.isCenter) {
      transitionName = `esc-fade-${this.position}`
    }

    const left = this.$slots['title-left']
    const center = this.$slots['title-center']
    const right = this.$slots['title-right']
    return (
      <transition name={transitionName}>
        <div
          vShow={this.show}
          class={bem([this.position], true)}
        >
          {
            (left || center) ? (
              <div class={bem('title', false)}>
                {left &&
                  <div
                    class={bem('title', 'left', false)}
                    onClick={() => { this.onClickTitle('left') }}
                  >
                    {left}
                  </div>
                }
                {center &&
                  <div
                    class={bem('title', 'center', false)}
                    onClick={() => { this.onClickTitle('center') }}
                  >
                    {center}
                  </div>
                }
                <div
                  class={bem('title', 'right', false)}
                  onClick={() => { this.onClickTitle('right') }}
                >
                  {right || <img src={closeIcon} width="16px"/>}
                </div>
              </div>
            ) : null
          }
          <div class={bem('content', false)}>
            {this.$slots.default}
          </div>
        </div>
      </transition>
    )
  }
}
