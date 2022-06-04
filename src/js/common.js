document.addEventListener("DOMContentLoaded", () => {

    // KaTex rendering
    renderMathInElement(document.body, {
        delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\(', right: '\\)', display: false },
            { left: '\\[', right: '\\]', display: true }
        ],
        throwOnError: false,
        macros: {
            "\\nequiv": "\\not\\equiv",
            "\\mod": "\\enspace(\\text{mod }#1)",
            "\\ord": "\\text{ord}",
            "\\lcm": "\\text{lcm}",
            "\\leg": "\\left(\\frac{#1}{#2}\\right)",
        }
    });

    const ua = window.navigator.userAgent.toLowerCase();
    const isSafari = ua.indexOf("iphone") >= 0;

    // KaTeX 要素の微調整
    function getWidth(element) {
        if (element && element.getBoundingClientRect) {
            return element.getBoundingClientRect().width;
        } else {
            return 0;
        }
    }
    const blocks = document.querySelectorAll(".katex-display>.katex>.katex-html");
    const tags = document.querySelectorAll(".katex-display>.katex>.katex-html>.tag");
    function adjustKaTexElements() {
        // tag
        for (const tag of tags) {
            const myWidth = getWidth(tag);
            const containerWidth = getWidth(tag.parentElement);
            const contentWidth = getWidth(tag.previousElementSibling);
            tag.style.left = Math.max((containerWidth + contentWidth) / 2, contentWidth, containerWidth - myWidth - 5) + "px";
        }

        // 横スクロールの存在を示す
        if (isSafari) {
            for (const block of blocks) {
                const container = block.parentElement.parentElement;
                let w = 0;
                for (const child of block.childNodes) w += getWidth(child);
                if (w > getWidth(block)) {
                    container.classList.add("scrollable");
                } else {
                    container.classList.remove("scrollable");
                }
            }
        }
    }
    adjustKaTexElements();
    for (let t = 1; t <= 5; ++t)window.setTimeout(adjustKaTexElements, t * 500);
    window.addEventListener("resize", adjustKaTexElements);
});
