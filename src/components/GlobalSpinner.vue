<template>
  <div class="overlay">
    <div class="lds-dual-ring"></div>
  </div>
</template>
<style>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(255, 255, 255, 0.6); /* 變透明白，淡淡遮罩 */
  /* 取消 blur 或改成 very subtle */
  /* backdrop-filter: blur(2px); 如果想微微毛玻璃可以開 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.lds-dual-ring,
.lds-dual-ring:after {
  box-sizing: border-box;
}
.lds-dual-ring {
  color: #f8b26a;
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6.4px solid currentColor;
  border-color: currentColor transparent currentColor transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
