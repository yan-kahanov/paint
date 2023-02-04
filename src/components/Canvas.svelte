<script>
  import { onMount } from 'svelte';
  import figures from '../figures';
  import settings from '../settings'

  export let canvas = null
  export let ctx = null
  let canvasScreenshot;

  const startPos = { x: 0, y: 0 };

  onMount(() => {
    ctx = canvas.getContext("2d");
    resize();

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  });

  function resize() {
    ctx.canvas.width = window.innerWidth - canvas.offsetLeft - 10;
    ctx.canvas.height = window.innerHeight - canvas.offsetTop - 10;
  }

  function setPosition(e) {
    startPos.x = e.clientX - canvas.offsetLeft;
    startPos.y = e.clientY - canvas.offsetTop;
  }

  export const setCanvasScreenshot = () => {
    canvasScreenshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
  };

  function draw(e) {
    if (e.buttons !== 1 || startPos.x < 0 || startPos.y < 0) return;
    const currPosX = e.clientX - canvas.offsetLeft - 1;
    const currPosY = e.clientY - canvas.offsetTop - 1;

    ctx.beginPath();
    ctx.lineWidth = settings.lineWidth ?? 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = settings.strokeColor;
    ctx.fillStyle = settings.fillColor;

    if (settings.figure !== "pen") {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (canvasScreenshot) ctx.putImageData(canvasScreenshot, 0, 0);
    }

    const figure = figures.find(item => item.value === settings.figure)
    figure.action(ctx, startPos, currPosX, currPosY, () => setPosition(e))
    
    ctx.stroke();
  }
</script>

<canvas bind:this={canvas} on:resize={resize} />

<svelte:options accessors />
<svelte:window
  on:mouseup={setCanvasScreenshot}
  on:mousemove={draw}
  on:mousedown={setPosition}
/>

<style>
  canvas {
    border: 1px solid gray;
  }
</style>
