import React, { Fragment } from 'react'
import Link from 'next/link'
import ScrollSwipe from 'scroll-swipe'
import Router from 'next/router'
import posed from 'react-pose'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { Scroll } from 'react-fns'

const KEY_IDX = {
  37: 'LEFT',
  38: 'UP',
  39: 'RIGHT',
  40: 'DOWN',
}

const Box = posed.div({
  top: { y: 0 },
  out: {
    y: '-10%',
    transition: {
      type: 'tween',
      duration: 300,
    },
  },
})
const Box2 = posed.div({
  bottom: {
    y: 0,
    transition: {
      y: {
        type: 'tween',
        ease: [0.01, 0.36, 0.64, 0.99],
        duration: 1000,
      },
    },
  },
  top: {
    y: ({ i }) => i,
    transition: {
      y: {
        type: 'tween',
        ease: [0.01, 0.36, 0.64, 0.99],
        duration: 1000,
      },
    },
  },
})

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = Object.assign({
      position: 'top',
      transitionOut: 'out',
      scrollPending: false,
      enter: true,
      window: null,
      document: null,
      where: false,
      intent: 0,
      ss: {},
    })
  }
  lockScroll() {
    const { node, checkKey } = this

    window && window.addEventListener('keydown', checkKey.bind(this))

    const ss = new ScrollSwipe({
      target: node,
      scrollSensitivity: 4,
      touchSensitivity: 4,
      scrollPreventDefault: false,
      touchPreventDefault: true,
      scrollCb: this.onScrollAction,
      touchCb: this.onScrollAction,
    })
    this.setState({ ss: ss })
    this.isLocked = true
  }
  checkKey(e) {
    const direction = KEY_IDX[e.keyCode]
    if (!direction) {
      return
    }

    const intent = direction === 'UP' || direction === 'LEFT' ? -1 : 1
    const context =
      direction === 'UP' || direction === 'DOWN' ? 'VERTICAL' : 'HORIZONTAL'
    //console.log(direction, intent, context)
  }
  onScrollAction(e) {
    const { direction, intent, startEvent } = e
    const to = window ? window.innerHeight : 0
    // if (this.state.scrollPending) {
    //   this.state.ss.flush()
    //   console.log('SS', this.state.ss)
    //   return this.state.ss.listen()
    // }
    // console.log(direction)
    // console.log(intent)
    // console.log(startEvent)
    console.log('ONScrollAction', e)
    console.log(this.state.scrollPending)

    // scrollTo(determineVerticalRoot(), 'scrollTop', to, 200, () =>
    //   Router.push('/about')
    // )
    // this.setState(() => {
    //   this.lockScroll()
    // })
    this.setState(
      {
        where: true,
        intent: intent,
        scrollPending: !this.state.scrollPending,
      },
      () => {
        if (this.state.scrollPending) {
          this.state.ss.flush()
          console.log('SS', this.state.ss)
          return this.state.ss.listen()
        }
      }
      //   () => {
      //     this.lockScroll()
      //   }
    )
  }

  lockScroll = this.lockScroll.bind(this)
  checkKey = this.checkKey.bind(this)
  onScrollAction = this.onScrollAction.bind(this)

  componentDidMount() {
    this.window = global.window
    this.document = global.document

    this.setState(
      {
        window: global.window,
        document: global.document,
        enter: false,
      },
      () => {
        this.lockScroll()
      }
    )
  }

  componentWillUnmount() {
    const ss = this.state.ss || null
    //ss && ss.killAll()
    this.ss = null

    const { window } = this.state

    window && window.removeEventListener('keydown', this.checkKey)

    // if (this.props.hideScrollBars) {
    //   this.showScrollBars();
    // }
  }
  render() {
    console.log(this.state)
    const { window, position, transitionOut, enter, where, intent } = this.state
    console.log('ENTER', enter)
    return (
      <Box2
        pose={where || enter ? 'top' : 'bottom'}
        i={intent === 1 ? '200%' : '-200%'}
        onPoseComplete={
          () => null
          //   Router.push({
          //     pathname: '/our-story',
          //     query: { intent: intent },
          //   })
        }
      >
        <div
          style={{ visibility: enter ? 'hidden' : 'visible' }}
          ref={node => (this.node = node)}
        >
          {this.props.children}
        </div>
      </Box2>
    )
  }
}

const withTransition = Component => {
  const Wrapper = (props, ref) => {
    console.log(Component)
    return (
      <Index>
        <Component {...props} ref={ref} />
      </Index>
    )
  }

  Wrapper.displayName = `withTransition(${Component.displayName ||
    Component.name})`
  return hoistNonReactStatics(React.forwardRef(Wrapper), Component)
}
export default withTransition

function scrollTo(element, elementBoundary, to, duration, callback) {
  //console.log(element)
  const start = element[elementBoundary],
    change = to - start,
    increment = 10

  let currentTime = 0
  let globalId = requestAnimationFrame(repeatOften)
  function repeatOften() {
    currentTime += increment
    let val = easeInOutQuad(currentTime, start, change, duration)

    element[elementBoundary] = val

    if (currentTime >= duration) {
      console.log('Canceled')
      //cancelAnimationFrame(globalId);
      return callback()
    }

    globalId = requestAnimationFrame(repeatOften)
  }
}

//t = current time
//b = start value
//c = change in value
//d = duration
const easeInOutQuad = (t, b, c, d) => {
  t /= d
  return -c * t * (t - 2) + b
}
function determineVerticalRoot() {
  let userAgent, platform

  const { document } = global

  if (typeof navigator !== 'undefined' && navigator) {
    ;({ userAgent, platform } = navigator)
  }

  if (!userAgent) {
    return document.body
  }

  // http://developer.samsung.com/technical-doc/view.do?v=T000000203
  if (/SAMSUNG.*Build\//.test(userAgent)) {
    return document.body
  }

  const browser = detectBrowser(userAgent)

  if (!browser) {
    return document.body
  }

  // NOTE: various browsers and devTools handle this differently as the userAgent source of truth
  // To get the root scrollable element we have to play around with OS and browser to find the right
  // root to return. If need be we can be specific about version

  const { name, version, os } = browser // eslint-disable-line no-unused-vars
  const [major, minor, patch] = version.split('.') // eslint-disable-line no-unused-vars

  const docElementSet = new Set([
    'firefox',
    'chrome',
    'ios', // iPad (chrome devtools)
    'crios', // chrome ios (chrome devtools)
    'ie',
  ])

  // Some platforms conflict with the devtools when it comes to supporting document.body
  // In order to support both user-agents in chrome devtools and the native device we need to
  // check for both browser name and device platform
  const conflictingPlatforms = new Set(['iPhone', 'iPad'])

  if (docElementSet.has(name) && !conflictingPlatforms.has(platform)) {
    return document.documentElement
  }

  // safari, chrome ios etc
  return document.body
}

function detectBrowser(userAgentString) {
  if (!userAgentString) {
    return null
  }

  const browsers = [
    ['edge', /Edge\/([0-9\._]+)/],
    ['yandexbrowser', /YaBrowser\/([0-9\._]+)/],
    ['vivaldi', /Vivaldi\/([0-9\.]+)/],
    ['kakaotalk', /KAKAOTALK\s([0-9\.]+)/],
    ['chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
    ['phantomjs', /PhantomJS\/([0-9\.]+)(:?\s|$)/],
    ['crios', /CriOS\/([0-9\.]+)(:?\s|$)/],
    ['firefox', /Firefox\/([0-9\.]+)(?:\s|$)/],
    ['fxios', /FxiOS\/([0-9\.]+)/],
    ['opera', /Opera\/([0-9\.]+)(?:\s|$)/],
    ['opera', /OPR\/([0-9\.]+)(:?\s|$)$/],
    ['ie', /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
    ['ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
    ['ie', /MSIE\s(7\.0)/],
    ['bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/],
    ['android', /Android\s([0-9\.]+)/],
    ['ios', /Version\/([0-9\._]+).*Mobile.*Safari.*/],
    ['safari', /Version\/([0-9\._]+).*Safari/],
  ]

  return browsers
    .map(function(rule) {
      if (rule[1].test(userAgentString)) {
        const match = rule[1].exec(userAgentString)
        const version = match && match[1].split(/[._]/).slice(0, 3)

        if (version && version.length < 3) {
          Array.prototype.push.apply(
            version,
            version.length == 1 ? [0, 0] : [0]
          )
        }

        return {
          name: rule[0],
          version: version.join('.'),
          os: detectOS(userAgentString),
        }
      }
    })
    .filter(Boolean)
    .shift()
}

function detectOS(userAgentString) {
  const operatingSystems = [
    {
      name: 'iOS',
      rule: /iP(hone|od|ad)/,
    },
    {
      name: 'Android OS',
      rule: /Android/,
    },
    {
      name: 'BlackBerry OS',
      rule: /BlackBerry|BB10/,
    },
    {
      name: 'Windows Mobile',
      rule: /IEMobile/,
    },
    {
      name: 'Amazon OS',
      rule: /Kindle/,
    },
    {
      name: 'Windows 3.11',
      rule: /Win16/,
    },
    {
      name: 'Windows 95',
      rule: /(Windows 95)|(Win95)|(Windows_95)/,
    },
    {
      name: 'Windows 98',
      rule: /(Windows 98)|(Win98)/,
    },
    {
      name: 'Windows 2000',
      rule: /(Windows NT 5.0)|(Windows 2000)/,
    },
    {
      name: 'Windows XP',
      rule: /(Windows NT 5.1)|(Windows XP)/,
    },
    {
      name: 'Windows Server 2003',
      rule: /(Windows NT 5.2)/,
    },
    {
      name: 'Windows Vista',
      rule: /(Windows NT 6.0)/,
    },
    {
      name: 'Windows 7',
      rule: /(Windows NT 6.1)/,
    },
    {
      name: 'Windows 8',
      rule: /(Windows NT 6.2)/,
    },
    {
      name: 'Windows 8.1',
      rule: /(Windows NT 6.3)/,
    },
    {
      name: 'Windows 10',
      rule: /(Windows NT 10.0)/,
    },
    {
      name: 'Windows ME',
      rule: /Windows ME/,
    },
    {
      name: 'Open BSD',
      rule: /OpenBSD/,
    },
    {
      name: 'Sun OS',
      rule: /SunOS/,
    },
    {
      name: 'Linux',
      rule: /(Linux)|(X11)/,
    },
    {
      name: 'Mac OS',
      rule: /(Mac_PowerPC)|(Macintosh)/,
    },
    {
      name: 'QNX',
      rule: /QNX/,
    },
    {
      name: 'BeOS',
      rule: /BeOS/,
    },
    {
      name: 'OS/2',
      rule: /OS\/2/,
    },
    {
      name: 'Search Bot',
      rule: /(nuhk)|(Googlebot)|(Yammybot)|(Openbot)|(Slurp)|(MSNBot)|(Ask Jeeves\/Teoma)|(ia_archiver)/,
    },
  ]

  const detected = operatingSystems.filter(function(os) {
    if (userAgentString.match(os.rule)) {
      return true
    }
  })

  return detected && detected[0] ? detected[0].name : null
}
