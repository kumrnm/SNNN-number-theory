document.addEventListener("DOMContentLoaded",()=>{renderMathInElement(document.body,{delimiters:[{left:"$$",right:"$$",display:!0},{left:"$",right:"$",display:!1},{left:"\\(",right:"\\)",display:!1},{left:"\\[",right:"\\]",display:!0}],throwOnError:!1,macros:{"\\nequiv":"\\not\\equiv","\\mod":"\\enspace(\\text{mod }#1)","\\ord":"\\text{ord}","\\lcm":"\\text{lcm}","\\leg":"\\left(\\frac{#1}{#2}\\right)"}});const e=window.navigator.userAgent.toLowerCase().indexOf("iphone")>=0;function t(e){return e&&e.getBoundingClientRect?e.getBoundingClientRect().width:0}const n=document.querySelectorAll(".katex-display>.katex>.katex-html"),o=document.querySelectorAll(".katex-display>.katex>.katex-html>.tag");function l(){for(const e of o){const n=t(e),o=t(e.parentElement),l=t(e.previousElementSibling);e.style.left=Math.max((o+l)/2,l,o-n-5)+"px"}if(e)for(const e of n){const n=e.parentElement.parentElement;let o=0;for(const n of e.childNodes)o+=t(n);o>t(e)?n.classList.add("scrollable"):n.classList.remove("scrollable")}}l();for(let e=1;e<=5;++e)window.setTimeout(l,500*e);window.addEventListener("resize",l)});