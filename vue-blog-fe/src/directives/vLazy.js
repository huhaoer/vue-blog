/**
 * 图片懒加载指令
 */
import eventBus from '@/eventBus'
import { debounce } from '@/utils'
import lazyGif from '@/assets/img/lazy.gif'

eventBus.$on('mainScroll', debounce(scroll, 50))

// 主区域滚动事件
function scroll(dom) {
    // 处理图片列表
    dealImgs()
}

let imgs = []; // 要处理的指令图片列表
// 处理图片列表
function dealImgs() {
    for (const img of imgs) {
        dealImg(img)
    }
}

// 处理单张图片
function dealImg(img) {
    // 图片地址默认显示默认gif
    img.dom.src = lazyGif
    // 判断图片是否在可视区内
    const clientHeight = document.documentElement.clientHeight
    const rect = img.dom.getBoundingClientRect()
    const height = rect.height || 150 // 图片未加载时高度为0，默认150
    if (rect.top >= -height && rect.top <= clientHeight) {
        // 可视区域内
        const oImg = new Image()
        oImg.onload = () => {
            img.dom.src = img.src
        }
        oImg.src = img.src
        img.dom.src = img.src
        // 筛出掉已经加载完成的图片
        imgs = imgs.filter(it => it !== img)
    }
}

export default {
    inserted(el, bindings) {
        const img = {
            dom: el,
            src: bindings.value
        }
        imgs.push(img)
        // 立即处理当前加入的图片
        dealImg(img)
    },
    unbind(el) {
        imgs = imgs.filter(it => it.dom !== el)
    }
}



// import eventBus from "@/eventBus";
// import { debounce } from "@/utils";
// import defaultGif from "@/assets/img/lazy.gif";

// let imgs = [];

// function setImage(img) {
//   img.dom.src = defaultGif; // 先暂时使用着默认图片
//   // 处理图片
//   // 该图片是否在视口范围内
//   const clientHeight = document.documentElement.clientHeight;
//   const rect = img.dom.getBoundingClientRect();
//   const height = rect.height || 150;
//   if (rect.top >= -height && rect.top <= clientHeight) {
//     // 在视口范围内
//     // const tempImg = new Image();
//     // tempImg.onload = function() {
//     //   // 当真实图片加载完成之后
//     //   img.dom.src = img.src;
//     // };
//     // tempImg.src = img.src;
//     img.dom.src = img.src;
//     imgs = imgs.filter((i) => i !== img);
//   }
// }

// // 希望，调用该函数，就可以设置那些合适的图片
// function setImages() {
//   for (const img of imgs) {
//     // 处理该图片
//     setImage(img);
//   }
// }

// function handleScroll() {
//   setImages();
// }

// eventBus.$on("mainScroll", debounce(handleScroll, 50));

// export default {
//   inserted(el, bindings) {
//     const img = {
//       dom: el,
//       src: bindings.value,
//     };
//     imgs.push(img);
//     // 立即处理它
//     setImage(img);
//   },
//   unbind(el) {
//     imgs = imgs.filter((img) => img.dom !== el);
//   },
// };
