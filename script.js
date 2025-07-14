document.addEventListener('DOMContentLoaded', () => {
  const typewriterElem = document.getElementById('typewriter');
  const input = document.getElementById('name-input');

  input.style.visibility = 'hidden';
  input.value = '';
  input.setAttribute('placeholder', '...');

  new Typed('#typewriter', {
    strings: ['Tôi gọi bạn là&nbsp;'],
    typeSpeed: 40,
    showCursor: true,
    cursorChar: '|',
    onComplete: () => {
      const cursor = document.querySelector('#typewriter + .typed-cursor');
      if (cursor) cursor.style.display = 'none';

      const dots = document.createElement('span');
      new Typed(dots, {
        strings: ['...'],
        typeSpeed: 40,
        showCursor: false,
        onComplete: () => {
          dots.remove();
          input.style.visibility = 'visible';
        }
      });
      typewriterElem.appendChild(dots);
    }
  });

  input.addEventListener('input', () => {
    const name = input.value.trim();
    if (name === 'Nêv') {
      input.classList.remove('red');
      input.classList.add('green');
      input.disabled = true;

      let afterNev = document.getElementById('after-nev');
      if (!afterNev) {
        afterNev = document.createElement('span');
        afterNev.id = 'after-nev';
        input.parentNode.insertBefore(afterNev, input.nextSibling);
      }

     new Typed(afterNev, {
  strings: ['- phát âm là /nɛv/.'],
  typeSpeed: 40,
  showCursor: false,
  onComplete: () => {
    const poeticText1 = document.createElement('div');
    poeticText1.id = 'poetic-line-1';
    typewriterElem.parentNode.appendChild(poeticText1);

    new Typed(poeticText1, {
      strings: ['Ngữ nghĩa là tuyết – tĩnh lặng và trắng trong.'],
      typeSpeed: 40,
      showCursor: false,
      onComplete: () => {
        const poeticText2 = document.createElement('div');
        poeticText2.id = 'poetic-line-2';
        typewriterElem.parentNode.appendChild(poeticText2);

        new Typed(poeticText2, {
          strings: ['Ý nghĩa là vị ngọt mong manh còn sót lại giữa mùa đông băng giá.'],
          typeSpeed: 40,
          showCursor: false
        });
      }
    });
  }
});

    } else {
      input.classList.remove('green');
      input.classList.add('red');
      input.disabled = false;
    }
  });
});
