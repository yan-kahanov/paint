<script>
  import { onMount } from "svelte";
  import Figures from "./components/Figures.svelte";
  import PanelTop from "./components/PanelTop.svelte";
  import Toolbar from "./components/Toolbar.svelte";

  let canvasScreenshot;

  const settings = {
    lineWidth: null,
    strokeColor: "#000000",
    fillColor: "#ffffff",
    figure: "pen",
    isFill: false,
  };

  const startPos = { x: 0, y: 0 };
  let canvas = null;
  let ctx;

  onMount(() => {
    ctx = canvas.getContext("2d");
    resize();
    
    ctx.fillStyle = '#FFFFFF'
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

  const setCanvasScreenshot = () => {
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

    switch (settings.figure) {
      case "pen":
        ctx.moveTo(startPos.x, startPos.y);
        setPosition(e);
        ctx.lineTo(startPos.x, startPos.y);
        break;
      case "line":
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(currPosX, currPosY);
        break;
      case "rect":
        if (settings.isFill) {
          ctx.fillRect(
            startPos.x,
            startPos.y,
            currPosX - startPos.x,
            currPosY - startPos.y
          );
        }
        ctx.rect(
          startPos.x,
          startPos.y,
          currPosX - startPos.x,
          currPosY - startPos.y
        );
        break;
      case "ellipse":
        const width = Math.abs(currPosX - startPos.x);
        const height = Math.abs(currPosY - startPos.y);
        ctx.save();
        ctx.translate(startPos.x, startPos.y);
        ctx.scale(1, height / width);
        ctx.arc(0, 0, width, 0, Math.PI * 2);
        ctx.restore();
        if (settings.isFill) {
          ctx.fill();
        }
        break;
      case "triangle":
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(currPosX, currPosY);
        ctx.lineTo(startPos.x - (currPosX - startPos.x), currPosY);
        if (settings.isFill) {
          ctx.fill();
        }
        ctx.closePath();

        break;
      default:
        break;
    }
    ctx.stroke();
  }

  const changeFigure = (figure) => {
    settings.figure = figure;
  };
</script>

<main>
  <div>
    <PanelTop settings={settings}/>
    <Toolbar {ctx} {canvas} setCanvasScreenshot={setCanvasScreenshot}/>
    <Figures {changeFigure} activeFigure={settings.figure} />
  </div>
  <canvas bind:this={canvas} on:resize={resize} />
</main>

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
