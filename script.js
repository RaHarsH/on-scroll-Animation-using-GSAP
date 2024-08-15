const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let frames = {
    currentIndex: 0,
    maxIndex: 538,
};

let imagesLoaded = 0;
let images = [];

const preloadImages = () => {
    for(let i = 1; i <= frames.maxIndex; i++) {
        const imageUrl = `frames/frame_${i.toString().padStart(4, '0')}.jpg`;
        let img = new Image();
        img.src = imageUrl;

        img.onload = function() {
            imagesLoaded++;

            if(imagesLoaded === frames.maxIndex) {
                loadImage(frames.currentIndex);
                startAnimation();
            }
        }

        images.push(img)
    }
}

const loadImage = (index) => {
    if(index >= 0 && index <= frames.maxIndex) {
        const img = images[index];

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;

        const scale = Math.max(scaleX, scaleY);

        const newWidth = scale * img.width;
        const newHeight = scale * img.height;

        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = "high";
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);

        frames.currentIndex = index;
    }
}


const startAnimation = () => {
    let t1 = gsap.timeline({
        scrollTrigger: {
            trigger: '.parent',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 4,
            markers: false,
        }
    });

    t1.to(frames, {
        currentIndex: frames.maxIndex,
        onUpdate: () => {
            loadImage(Math.floor(frames.currentIndex));
        }
    })
}

preloadImages();