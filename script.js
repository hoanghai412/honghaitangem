document.addEventListener("DOMContentLoaded", () => {
    const letter = document.getElementById("letter");
    const container = document.getElementById("container");
    const content = document.getElementById("content");
    const heart = document.getElementById("heart");
    const text = document.getElementById("text");
    const yesButton = document.getElementById("yes");
    const noButton = document.getElementById("no");
    const buttonsDiv = document.getElementById("buttons");
    const bgMusic = document.getElementById("bg-music");
    const images = document.querySelectorAll(".message-image");

    let messages = [
        "✨ Hi cậu tớ là Hồng Hải nèe!! ✨",
        "🥰 Đầu tiên, cảm ơn cậu rất nhiều vì đã đọc lá thư này. 💌",
        "💖 Tớ chúc cậu 8/3 luôn luôn vui vẻ và hạnh phúc nhaaa! 🌸",
        "🙈 Và tớ có một điều muốn nói, nhưng không biết bắt đầu từ đâu... 😳",
        "🤔 Cậu...?",
        "💘 Cậu cho tớ làm quen với cậu nhaaaa 💕💕"
    ];
    let index = 0;

    letter.addEventListener("click", () => {
        container.style.display = "none";
        content.classList.remove("hidden");
        document.body.style.backgroundColor = "pink";
        bgMusic.play();

        setTimeout(() => {
            heart.style.display = "none";
            showText();
        }, 3000);
    });

    function showText() {
        if (index < messages.length) {
            text.innerText = messages[index];
            text.classList.remove("hidden");

            images.forEach(img => img.classList.add("hidden"));
            if (images[index]) {
                images[index].classList.remove("hidden");
            }

            if (index === messages.length - 1) {
                // Tin nhắn cuối -> Hiện nút "Có" và "Không"
                buttonsDiv.classList.remove("hidden");
                yesButton.style.display = "inline-block";
                noButton.style.display = "inline-block";
            } else {
                // Tự động hiển thị tin nhắn tiếp theo sau 2 giây
                setTimeout(showText, 3000);
            }

            index++;
        }
    }

    // 🔥 Nút "Không" chạy trốn nhưng KHÔNG bị chạy đè lên nút "Có"
    function moveNoButton() {
        let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        let screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

        let buttonWidth = noButton.offsetWidth;
        let buttonHeight = noButton.offsetHeight;
        let yesRect = yesButton.getBoundingClientRect(); // Lấy vị trí của nút "Có"

        let maxX = screenWidth - buttonWidth - 20;
        let maxY = screenHeight - buttonHeight - 20;
        let minX = 20;
        let minY = 20;

        let x, y;
        do {
            x = Math.random() * (maxX - minX) + minX;
            y = Math.random() * (maxY - minY) + minY;
        } while (
            x + buttonWidth > yesRect.left && x < yesRect.right && 
            y + buttonHeight > yesRect.top && y < yesRect.bottom
        ); 
        // Nếu vị trí ngẫu nhiên trùng với nút "Có", thì tạo vị trí mới

        noButton.style.position = "absolute";
        noButton.style.left = `${x}px`;
        noButton.style.top = `${y}px`;
        noButton.style.transition = "left 0.3s ease-out, top 0.3s ease-out"; 
    }

    // 🔥 Khi di chuột vào, nút "Không" chạy trốn
    noButton.addEventListener("mouseenter", moveNoButton);
    noButton.addEventListener("touchstart", moveNoButton);

    // 🔥 Khi bấm "Có", hiển thị kết quả
    yesButton.addEventListener("click", () => {
        document.body.innerHTML = `
            <div style="text-align: center; margin-top: 10%; background-color: pink; height: 100vh; padding: 20px;">
                <h1 style="color: red; font-size: 50px;">🎉 Yayyy! Cảm ơn cậu đã đồng ý 💖 🎉</h1>
                <img src="anhdong.gif" width="250px">
                <p style="font-size: 20px; color: #333;">Tớ vui lắm luôn á 😍</p>
            </div>`;
    });
});
