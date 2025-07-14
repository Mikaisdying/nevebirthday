document.addEventListener('DOMContentLoaded', () => {
  // Preload nhạc sinh nhật
  const audio = new Audio('./KHÚC HÁT MỪNG SINH NHẬT - PHAN ĐINH TÙNG ( OFFICIAL VIDEO).mp3')
  audio.preload = 'auto'

  const typewriterElem = document.getElementById('typewriter')
  const input = document.getElementById('name-input')

  const addFlowers = (target) => {
    const emojis = ['🌸', '🌺', '💮', '🌼']
    const count = 100

    const text = target.textContent
    if (!text.includes('thoáng hạnh phúc')) return

    // Tách text ra để dễ overlay
    const textWrapper = document.createElement('span')
    textWrapper.textContent = text
    textWrapper.style.position = 'relative'
    textWrapper.style.display = 'inline-block'
    textWrapper.style.zIndex = 0
    target.innerHTML = ''
    target.appendChild(textWrapper)

    // Overlay hoa
    const wreathContainer = document.createElement('div')
    wreathContainer.className = 'poetic-overlay'
    wreathContainer.style.position = 'absolute'
    wreathContainer.style.top = '-50%'
    wreathContainer.style.left = '0'
    wreathContainer.style.width = '100%'
    wreathContainer.style.height = '30%'
    wreathContainer.style.pointerEvents = 'none'
    wreathContainer.style.zIndex = 2
    textWrapper.appendChild(wreathContainer)

    for (let i = 0; i < count; i++) {
      const flower = document.createElement('span')
      flower.classList.add('flower')
      flower.textContent = emojis[Math.floor(Math.random() * emojis.length)]
      flower.style.position = 'absolute'

      const cols = 10
      const rows = 3
      const gridX = (i % cols) * (100 / cols) + Math.random() * 8
      const gridY = Math.floor(i / cols) * (60 / rows) + Math.random() * 15 + 20

      flower.style.left = `${gridX}%`
      flower.style.top = `${gridY}%`

      const scale = 0.3 + (i / count) * 1.3
      flower.style.fontSize = `${scale}em`

      const finalOpacity = 0.6 + (i / count) * 0.4

      flower.style.transform = 'scale(0)'
      flower.style.opacity = '0'
      flower.style.transition = 'transform 1s ease, opacity 1s ease'
      flower.style.pointerEvents = 'none'
      flower.style.zIndex = i

      wreathContainer.appendChild(flower)

      const bloomDelay = 30 + i * 25

      setTimeout(() => {
        flower.style.transform = 'scale(1)'
        flower.style.opacity = finalOpacity

        if (i === count - 1) {
          setTimeout(() => {
            startFlowerFall(wreathContainer, textWrapper, target)
          }, 2000)
        }
      }, bloomDelay)
    }

    function startFlowerFall(container, textWrapper, target) {
      const flowers = container.querySelectorAll('.flower')
      let fallenCount = 0

      // Tạo container mới cho hiệu ứng rơi trước
      const rainContainer = document.createElement('div')
      rainContainer.style.position = 'fixed'
      rainContainer.style.top = '0'
      rainContainer.style.left = '0'
      rainContainer.style.width = '100vw'
      rainContainer.style.height = '100vh'
      rainContainer.style.pointerEvents = 'none'
      rainContainer.style.zIndex = '9999'
      document.body.appendChild(rainContainer)

      // Clone tất cả hoa trước khi đổi text
      flowers.forEach((flower, index) => {
        const fallingFlower = flower.cloneNode(true)
        const rect = flower.getBoundingClientRect()

        fallingFlower.style.position = 'fixed'
        fallingFlower.style.left = rect.left + 'px'
        fallingFlower.style.top = rect.top + 'px'
        fallingFlower.style.fontSize = flower.style.fontSize
        fallingFlower.style.opacity = flower.style.opacity
        fallingFlower.style.zIndex = '9999'
        fallingFlower.style.transition = 'transform 3s ease-in, opacity 2s ease-in'

        rainContainer.appendChild(fallingFlower)
      })
      target.innerHTML = 'của những ngày buồn lê thê&nbsp;&nbsp;&nbsp;'

      // Làm hoa rơi
      flowers.forEach((flower, index) => {
        setTimeout(() => {
          const fallingFlower = rainContainer.children[index]

          // Làm hoa rơi xuống
          setTimeout(() => {
            fallingFlower.style.transform = `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 720}deg)`
            fallingFlower.style.opacity = '0'
          }, 50)

          fallenCount++

          if (fallenCount === flowers.length) {
            setTimeout(() => {
              rainContainer.remove()
              startRainAndWaterRise()
            }, 3500)
          }
        }, index * 50)
      })
    }

    function startRainAndWaterRise() {
      const rainContainer = document.createElement('div')
      rainContainer.className = 'rain-container'
      rainContainer.style.position = 'fixed'
      rainContainer.style.top = '0'
      rainContainer.style.left = '0'
      rainContainer.style.width = '100vw'
      rainContainer.style.height = '100vh'
      rainContainer.style.overflow = 'hidden'
      rainContainer.style.pointerEvents = 'none'
      rainContainer.style.zIndex = '9998'
      document.body.appendChild(rainContainer)

      const raindrops = ['💧']

      // Tạo mưa liên tục
      function createRainDrop() {
        const drop = document.createElement('span')
        drop.textContent = raindrops[Math.floor(Math.random() * raindrops.length)]
        drop.style.position = 'absolute'
        drop.style.left = Math.random() * 100 + 'vw'
        drop.style.top = '-5vh'
        drop.style.fontSize = 12 + Math.random() * 8 + 'px'
        drop.style.opacity = 0.4 + Math.random() * 0.4
        drop.style.animation = `fall ${1.5 + Math.random() * 1}s linear forwards`
        rainContainer.appendChild(drop)

        // Xóa giọt sau khi rơi xong
        setTimeout(() => {
          if (drop.parentNode) drop.remove()
        }, 3000)
      }

      // Bắt đầu mưa ngay - tạo giọt mới mỗi 80-150ms
      const rainInterval = setInterval(
        () => {
          createRainDrop()
          // Tạo 2-3 giọt cùng lúc để dày hơn
          if (Math.random() > 0.5) createRainDrop()
          if (Math.random() > 0.7) createRainDrop()
        },
        80 + Math.random() * 70
      )

      setTimeout(() => {
        const water = document.createElement('div')
        water.className = 'water-rise'
        water.style.position = 'fixed'
        water.style.bottom = '0'
        water.style.left = '0'
        water.style.width = '100vw'
        water.style.height = '0'
        water.style.background = 'linear-gradient(to top, #5ec2f0, #a1dcf5)'
        water.style.zIndex = '9997'
        water.style.animation = 'riseWaterFull 8s ease-out forwards'
        document.body.appendChild(water)

        // 💫 FADE CHỮ KHI NƯỚC DÂNG (sau 3s nữa)
        setTimeout(() => {
          const allText = document.querySelector('#typewriter').parentNode
          if (allText) {
            allText.style.transition = 'opacity 3s ease-out'
            allText.style.opacity = '0'
          }
        }, 3000)

        // 🛑 TẠNH MƯA KHI NƯỚC TRÀN 100% (sau 8s)
        setTimeout(() => {
          clearInterval(rainInterval)

          // Tạo container cho dòng thơ mới
          const poemContainer = document.createElement('div')
          poemContainer.style.position = 'fixed'
          poemContainer.style.top = '50%'
          poemContainer.style.left = '50%'
          poemContainer.style.transform = 'translate(-50%, -50%)'
          poemContainer.style.zIndex = '10000'
          poemContainer.style.color = 'white'
          poemContainer.style.fontSize = '1.8rem'
          poemContainer.style.fontFamily = "'EB Garamond', serif"
          poemContainer.style.textAlign = 'center'
          poemContainer.style.maxWidth = '80%'
          poemContainer.style.lineHeight = '1.6'
          poemContainer.id = 'water-poem'
          document.body.appendChild(poemContainer)

          // 💭 TYPEWRITER CHO DÒNG THƠ MỚI
          new Typed('#water-poem', {
            strings: [
              'Dưới vẻ dịu dàng, cậu là cả đại dương.<br>Nhưng không phải ai cũng có bản đồ để tìm đến Queen of Cups.',
            ],
            typeSpeed: 40,
            showCursor: false,
            onComplete: () => {
              // ❄️ SAU 2S → TUYẾT RƠI + NỀN TRẮNG
              setTimeout(() => {
                startSnowAndWhitening()
              }, 2000)
            },
          })
        }, 8000)
      }, 3000) // Nước dâng sau 2s thay vì 1s
    }
  }

  const applyNevColor = (text, nevStartIndex, nevEndIndex) => {
    if (text.length > nevStartIndex && text.indexOf('Nêv') !== -1) {
      const before = text.slice(0, nevStartIndex)
      const nev = text.slice(nevStartIndex, nevEndIndex)
      const after = text.slice(nevEndIndex)
      return `${before}<span style="color: #27ae60;">${nev}</span>${after}`
    }
    return text
  }

  input.style.visibility = 'hidden'
  input.value = ''
  input.placeholder = '...'

  new Typed('#typewriter', {
    strings: ['Tôi gọi bạn là'],
    typeSpeed: 40,
    showCursor: true,
    cursorChar: '|',
    onComplete: () => {
      document.querySelector('#typewriter + .typed-cursor')?.style.setProperty('display', 'none')

      const dots = document.createElement('span')
      new Typed(dots, {
        strings: ['&nbsp;...'],
        typeSpeed: 40,
        showCursor: false,
        onComplete: () => {
          dots.remove()
          input.style.visibility = 'visible'
        },
      })
      typewriterElem.appendChild(dots)
    },
  })

  input.addEventListener('input', () => {
    const name = input.value.trim()
    if (name !== 'Nêv') {
      input.classList.remove('green')
      input.classList.add('red')
      return
    }

    input.classList.replace('red', 'green')
    input.disabled = true

    const afterNev = document.createElement('span')
    afterNev.id = 'after-nev'
    input.parentNode.insertBefore(afterNev, input.nextSibling)

    new Typed(afterNev, {
      strings: ['– phát âm là /nɛv/.'],
      typeSpeed: 40,
      showCursor: false,
      onComplete: () => {
        const poeticWrapper = document.createElement('div')
        poeticWrapper.id = 'poetic-wrapper'
        typewriterElem.parentNode.appendChild(poeticWrapper)

        const poeticLine1 = document.createElement('div')
        poeticWrapper.appendChild(poeticLine1)

        new Typed(poeticLine1, {
          strings: ['Ngữ nghĩa là tuyết – tĩnh lặng và trắng trong.'],
          typeSpeed: 40,
          showCursor: false,
          onComplete: () => {
            const poeticLine2 = document.createElement('div')
            poeticWrapper.appendChild(poeticLine2)

            new Typed(poeticLine2, {
              strings: ['Ý nghĩa là vị ngọt mong manh còn sót lại giữa mùa đông băng giá.'],
              typeSpeed: 40,
              showCursor: false,
              onComplete: () => {
                const static = document.createElement('div')
                static.innerHTML =
                  'Tôi gọi bạn là <span style="color: #27ae60;">Nêv</span> – phát âm là /nɛv/.<br>' +
                  'Ngữ nghĩa là tuyết – tĩnh lặng và trắng trong.<br>' +
                  'Ý nghĩa là vị ngọt mong manh còn sót lại giữa mùa đông băng giá.'

                poeticWrapper.replaceWith(static)
                document.getElementById('after-nev')?.remove()
                input.remove()

                typewriterElem.innerHTML = ''

                setTimeout(() => reverseDelete(), 500)
              },
            })
          },
        })
      },
    })
  })

  const reverseDelete = () => {
    const staticDiv = typewriterElem.parentNode.querySelector('div:not(#typewriter-inline)')

    const text =
      'Tôi gọi bạn là Nêv – phát âm là /nɛv/.\nNgữ nghĩa là tuyết – tĩnh lặng và trắng trong.\nÝ nghĩa là vị ngọt mong manh còn sót lại giữa mùa đông băng giá.'
    const target = 'Tôi gọi bạn'
    const nevStart = text.indexOf('Nêv')
    const nevEnd = nevStart + 3

    typewriterElem.innerHTML = applyNevColor(text, nevStart, nevEnd).replace(/\n/g, '<br>')

    if (staticDiv) staticDiv.remove()

    let len = text.length
    const interval = setInterval(() => {
      if (len <= target.length) {
        clearInterval(interval)

        typewriterElem.innerHTML = target

        const span = document.createElement('span')
        span.id = 'continue-typing'
        typewriterElem.appendChild(span)

        setTimeout(() => continueTyping(), 1000)
        return
      }

      len--
      const part = text.slice(0, len)
      typewriterElem.innerHTML = applyNevColor(part, nevStart, nevEnd).replace(/\n/g, '<br>')
    }, 50)
  }

  const continueTyping = () => {
    new Typed('#continue-typing', {
      strings: ['&nbsp;dựa trên hình hài từ Ký ức —'],
      typeSpeed: 40,
      showCursor: true,
      cursorChar: '|',
      onComplete: () => {
        setTimeout(() => animateSelection(), 2000)
      },
    })
  }

  const animateSelection = () => {
    const select = 'Tôi gọi bạn dựa trên hình hài từ '
    const remain = 'Ký ức —'
    document.querySelector('.typed-cursor')?.remove()

    let i = 0
    const interval = setInterval(() => {
      if (i >= select.length) {
        clearInterval(interval)
        setTimeout(() => {
          typewriterElem.innerHTML = remain
          const finalSpan = document.createElement('span')
          finalSpan.id = 'final-typing'
          finalSpan.innerHTML = '<br><span class="poetic-line"></span>'
          typewriterElem.appendChild(finalSpan)

          new Typed(finalSpan.querySelector('.poetic-line'), {
            strings: ['của những thoáng hạnh phúc.'],
            typeSpeed: 40,
            showCursor: false,
            onComplete: () => {
              addFlowers(finalSpan.querySelector('.poetic-line'))
            },
          })
        }, 400)
        return
      }
      i++
      const s = select.slice(0, i)
      const u = select.slice(i)
      typewriterElem.innerHTML = `<span style="background-color: #3390ff; color: white;">${s}</span>${u} ${remain}`
    }, 50)
  }

  function startSnowAndWhitening() {
    // ❄️ TẠO CONTAINER TUYẾT
    const snowContainer = document.createElement('div')
    snowContainer.className = 'snow-container'
    snowContainer.style.position = 'fixed'
    snowContainer.style.top = '0'
    snowContainer.style.left = '0'
    snowContainer.style.width = '100vw'
    snowContainer.style.height = '100vh'
    snowContainer.style.overflow = 'hidden'
    snowContainer.style.pointerEvents = 'none'
    snowContainer.style.zIndex = '10001'
    document.body.appendChild(snowContainer)

    // 🌨️ TẠO TUYẾT LIÊN TỤC
    const snowflakes = ['❄️', '❅', '❆']

    function createSnowflake() {
      const flake = document.createElement('span')
      flake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)]
      flake.style.position = 'absolute'
      flake.style.left = Math.random() * 100 + 'vw'
      flake.style.top = '-5vh'
      flake.style.fontSize = 8 + Math.random() * 12 + 'px'
      flake.style.opacity = 0.6 + Math.random() * 0.4
      flake.style.animation = `fall ${3 + Math.random() * 2}s linear forwards`
      flake.style.color = 'white'
      snowContainer.appendChild(flake)

      // Xóa bông tuyết sau khi rơi xong
      setTimeout(() => {
        if (flake.parentNode) flake.remove()
      }, 6000)
    }

    // Bắt đầu tuyết rơi
    const snowInterval = setInterval(
      () => {
        createSnowflake()
        if (Math.random() > 0.6) createSnowflake()
        if (Math.random() > 0.8) createSnowflake()
      },
      100 + Math.random() * 50
    )

    // 🤍 CHUYỂN NỀN TRẮNG DẦN DẦN
    const whiteOverlay = document.createElement('div')
    whiteOverlay.style.position = 'fixed'
    whiteOverlay.style.top = '0'
    whiteOverlay.style.left = '0'
    whiteOverlay.style.width = '100vw'
    whiteOverlay.style.height = '100vh'
    whiteOverlay.style.backgroundColor = 'white'
    whiteOverlay.style.opacity = '0'
    whiteOverlay.style.zIndex = '10000'
    whiteOverlay.style.transition = 'opacity 4s ease-out'
    document.body.appendChild(whiteOverlay)

    // Bắt đầu chuyển trắng ngay
    setTimeout(() => {
      whiteOverlay.style.opacity = '0.8'
    }, 100)

    // 💭 HIỆN DÒNG MỚI TRONG LÚC TUYẾT RƠI
    setTimeout(() => {
      // Fade đi dòng cũ
      const oldPoem = document.querySelector('#water-poem')
      if (oldPoem) {
        oldPoem.style.transition = 'opacity 2s ease-out'
        oldPoem.style.opacity = '0'
      }

      // Tạo dòng mới
      const finalPoem = document.createElement('div')
      finalPoem.style.position = 'fixed'
      finalPoem.style.top = '50%'
      finalPoem.style.left = '50%'
      finalPoem.style.transform = 'translate(-50%, -50%)'
      finalPoem.style.zIndex = '10002'
      finalPoem.style.color = 'white'
      finalPoem.style.fontSize = '1.8rem'
      finalPoem.style.fontFamily = "'EB Garamond', serif"
      finalPoem.style.textAlign = 'center'
      finalPoem.style.maxWidth = '80%'
      finalPoem.style.lineHeight = '1.6'
      finalPoem.id = 'final-poem'
      document.body.appendChild(finalPoem)

      // Typewriter cho dòng cuối
      new Typed('#final-poem', {
        strings: ['Tôi không biết đọc bản đồ.'],
        typeSpeed: 40,
        showCursor: false,
        onComplete: () => {
          // 🤍 NỀN HOÀN TOÀN TRẮNG SAU KHI GÕ XONG
          setTimeout(() => {
            whiteOverlay.style.opacity = '1'
            // Tạnh tuyết
            clearInterval(snowInterval)

            // 🖤 SAU KHI NỀN TRẮNG → HIỆN DÒNG ĐEN MỚI
            setTimeout(() => {
              showFinalMessage()
            }, 2000)
          }, 3000)
        },
      })
    }, 2000)
  }

  function showFinalMessage() {
    // Fade đi dòng cũ
    const oldPoem = document.querySelector('#final-poem')
    if (oldPoem) {
      oldPoem.style.transition = 'opacity 1s ease-out'
      oldPoem.style.opacity = '0'
    }

    // Tạo dòng chữ đen mới
    const blackText = document.createElement('div')
    blackText.style.position = 'fixed'
    blackText.style.top = '50%'
    blackText.style.left = '50%'
    blackText.style.transform = 'translate(-50%, -50%)'
    blackText.style.zIndex = '10003'
    blackText.style.color = '#2c2c2c'
    blackText.style.fontSize = '1.8rem'
    blackText.style.fontFamily = "'EB Garamond', serif"
    blackText.style.textAlign = 'center'
    blackText.style.maxWidth = '80%'
    blackText.style.lineHeight = '1.6'
    blackText.id = 'black-message'
    document.body.appendChild(blackText)

    // Type dòng đầy đủ
    new Typed('#black-message', {
      strings: [
        'Lý do lời nhắn này không thể dừng lại, là vì thời gian cũng chẳng thèm chờ ai cả.',
      ],
      typeSpeed: 40,
      showCursor: false,
      onComplete: () => {
        // Sau khi type xong → bắt đầu undo về "Lý do"
        setTimeout(() => {
          undoToLyDo()
        }, 2000)
      },
    })
  }

  function undoToLyDo() {
    const message = document.querySelector('#black-message')
    const fullText =
      'Lý do lời nhắn này không thể dừng lại, là vì thời gian không dừng lại vì tôi, cậu hay ai cả.'
    const targetText = 'Lý do'

    let currentLength = fullText.length

    const undoInterval = setInterval(() => {
      if (currentLength <= targetText.length) {
        clearInterval(undoInterval)
        message.textContent = targetText

        // Bắt đầu type câu mới sau "Lý do"
        setTimeout(() => {
          typeNewEnding()
        }, 1000)
        return
      }

      currentLength--
      const currentText = fullText.slice(0, currentLength)
      message.textContent = currentText
    }, 30) // Undo nhanh hơn type
  }

  function showBirthdayMessage() {
    const message = document.querySelector('#black-message')
    const text = 'Chúc mừng sinh nhật'
    const cakeEmoji = '🎂'
    const randomEmojis = ['🌟', '✨', '💫', '⭐', '🎉', '🎊', '🎈', '🎁', '🌈', '💎', '🔥', '💝']

    // Clear & setup
    message.textContent = ''
    message.style.color = '#27ae60'
    message.style.opacity = '1'
    message.style.fontSize = '2rem'
    message.style.display = 'flex'
    message.style.justifyContent = 'center'
    message.style.gap = '0.3rem'

    // Hiện text ban đầu
    const textSpans = []
    Array.from(text).forEach((char, index) => {
      const span = document.createElement('span')
      span.textContent = char
      span.style.transition = 'all 0.5s ease'
      span.style.fontSize = '2rem'
      message.appendChild(span)
      textSpans.push(span)
    })

    // Sau 2s → shuffle thành emoji ngẫu nhiên
    setTimeout(() => {
      textSpans.forEach((span, index) => {
        if (span.textContent !== ' ') {
          const randomEmoji = randomEmojis[Math.floor(Math.random() * randomEmojis.length)]
          span.textContent = randomEmoji
          span.style.transform = 'scale(1.2) rotate(180deg)'
        }
      })

      // Sau 1s → từng cái biến thành bánh sinh nhật
      setTimeout(() => {
        let current = 0
        const transformInterval = setInterval(() => {
          if (current >= textSpans.length) {
            clearInterval(transformInterval)
            // Bắt đầu hiệu ứng pacman
            setTimeout(() => startPacmanEffect(), 1000)
            return
          }

          const span = textSpans[current]
          if (span && span.textContent !== ' ') {
            span.textContent = cakeEmoji
            span.style.transform = 'scale(1) rotate(0deg)'
          }
          current++
        }, 200)
      }, 1000)
    }, 2000)

    function startPacmanEffect() {
      let current = 1
      const eatInterval = setInterval(() => {
        if (current >= textSpans.length) {
          clearInterval(eatInterval)
          playBirthdaySong()
          return
        }

        // Ẩn bánh tiếp theo
        const eaten = textSpans[current]
        if (eaten && eaten.textContent === cakeEmoji) {
          eaten.style.opacity = '0'
          eaten.style.transform = 'scale(0.5)'
        }

        // Bánh đầu tiên to ra dần và di chuyển vào giữa
        const pacman = textSpans[0]
        if (pacman) {
          pacman.style.transform = `scale(${1 + current * 0.3}) translateX(${current * 5}px)`
        }

        current++
      }, 300)
    }
  }

  function playBirthdaySong() {
    const audio = new Audio('./KHÚC HÁT MỪNG SINH NHẬT - PHAN ĐINH TÙNG ( OFFICIAL VIDEO).mp3')
    audio.play().catch(() => {
      console.warn('Không thể tự động phát nhạc do trình duyệt chặn.')
    })
  }

  function typeNewEnding() {
    const message = document.querySelector('#black-message')
    const baseText = 'Lý do'

    // Tạo container cho phần tiếp theo
    const continuation = document.createElement('span')
    continuation.id = 'continuation'
    message.appendChild(continuation)

    // Type phần tiếp theo
    new Typed('#continuation', {
      strings: [
        '&nbsp;tôi viết lời nhắn này là vì tôi còn muốn cùng cậu đi qua nhiều mùa tuyết nữa.',
      ],
      typeSpeed: 40,
      showCursor: false,
      onComplete: () => {
        // Sau khi type xong → fade toàn bộ message đi
        setTimeout(() => {
          message.style.transition = 'opacity 2s ease-out'
          message.style.opacity = '0'

          // Sau khi fade xong → hiện birthday message
          setTimeout(() => {
            showBirthdayMessage()
          }, 2000)
        }, 2000)
      },
    })
  }
})
