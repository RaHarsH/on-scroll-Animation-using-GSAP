let frames = {
    currentIndex: 0,
    maxIndex: 516,
};

let imagesLoaded = 0;
let images = [];

const preloadImages = () => {
    for(let i = 1; i <= frames.maxIndex; i++) {
        const imageUrl = `frames/compressed_image_${i.toString().padStart(4, '0')}.png`;
        let img = new Image();
        img.src = imageUrl;

        img.onload = function() {
            imagesLoaded++;

            if(imagesLoaded === frames.maxIndex) {
                LoadImage(frames.currentIndex);
                startAnimation();
            }
        }

        images.push(img)
    }
}

const loadImage = (index) => {
    if(index >= 0 && index <= frames.maxIndex) {
        const img = images[index];

        // the rest of the code goes here
    }
}