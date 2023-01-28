<script>
  import { onMount } from "svelte";

  let canvasScreenshot;

  const settings = {
    lineWidth: null,
    strokeColor: "#000000",
    fillColor: "#ffffff",
    figure: "triangle",
    isFill: false,
  };

  const pos = { x: 0, y: 0 };
  let canvas = null;
  let ctx;

  const figures = [
    { value: "pen", title: "Карандаш" },
    { value: "line", title: "Линия" },
    { value: "rect", title: "Прямоугльник" },
    { value: "ellipse", title: "Овал" },
    { value: "triangle", title: "Треугольник" },
  ];

  onMount(() => {
    ctx = canvas.getContext("2d");
    resize();
  });

  function resize() {
    ctx.canvas.width = window.innerWidth - 100;
    ctx.canvas.height = window.innerHeight - 200;
  }

  function setPosition(e) {
    pos.x = e.offsetX;
    pos.y = e.offsetY;
  }

  const setCanvasScreenshot = () => {
    canvasScreenshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
  };

  function draw(e) {
    if (e.buttons !== 1) return;

    ctx.beginPath();
    ctx.lineWidth = settings.lineWidth ?? 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = settings.strokeColor;
    ctx.fillStyle = settings.fillColor;

    switch (settings.figure) {
      case "pen":
        ctx.moveTo(pos.x, pos.y);
        setPosition(e);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        break;
      case "line":
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (canvasScreenshot) ctx.putImageData(canvasScreenshot, 0, 0);

        ctx.moveTo(pos.x, pos.y);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        break;
      case "rect":
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (canvasScreenshot) ctx.putImageData(canvasScreenshot, 0, 0);

        if (settings.isFill) {
          ctx.fillRect(pos.x, pos.y, e.offsetX - pos.x, e.offsetY - pos.y);
        }
        ctx.rect(pos.x, pos.y, e.offsetX - pos.x, e.offsetY - pos.y);
        ctx.stroke();
        break;
      case "ellipse":
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (canvasScreenshot) ctx.putImageData(canvasScreenshot, 0, 0);

        const width = Math.abs(e.offsetX - pos.x);
        const height = Math.abs(e.offsetY - pos.y);
        ctx.save();
        ctx.translate(pos.x, pos.y);
        ctx.scale(1, height / width);
        ctx.arc(0, 0, width, 0, Math.PI * 2);
        ctx.restore();
        if (settings.isFill) {
          ctx.fill();
        }
        ctx.stroke();
        break;
      case "triangle":
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (canvasScreenshot) ctx.putImageData(canvasScreenshot, 0, 0);

        ctx.moveTo(pos.x, pos.y);
        ctx.lineTo(e.offsetX, e.offsetY)
        ctx.lineTo(pos.x - (e.offsetX - pos.x), e.offsetY)
        if (settings.isFill) {
          ctx.fill();
        }
        ctx.closePath();

        ctx.stroke();
        break;
      default:
        break;
    }
  }

  const changeFigure = (figure) => {
    settings.figure = figure;
  };
</script>

<main>
  <div>
    <div class="panel-top">
      <input
        bind:value={settings.lineWidth}
        type="number"
        placeholder="Толщина (px)"
      />
      <input
        type="color"
        class="color-picker"
        bind:value={settings.strokeColor}
      />
      <input
        type="color"
        class="color-picker"
        bind:value={settings.fillColor}
      />
      <div class="fill-toggle">
        <input id="fillToggle" type="checkbox" bind:checked={settings.isFill} />
        <label for="fillToggle">С заливкой</label>
      </div>
    </div>
    <div>
      {#each figures as figure}
        <button
          class="figure"
          class:active={settings.figure === figure.value}
          on:click={() => changeFigure(figure.value)}
        >
          {figure.title}
        </button>
      {/each}
    </div>
  </div>
  <canvas
    bind:this={canvas}
    on:mousedown={setPosition}
    on:mouseup={setCanvasScreenshot}
    on:mouseenter={setPosition}
    on:mousemove={draw}
    on:resize={resize}
  />
</main>

<style>
  canvas {
    border: 1px solid gray;
    width: 100%;
    height: calc(100vh - 100px);
  }
  .color-picker {
    padding: 0;
    cursor: pointer;
  }
  .figure.active {
    background-color: gray;
    color: #fff;
  }
  .fill-toggle {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .fill-toggle input,
  .fill-toggle label {
    cursor: pointer;
    margin: 0;
    user-select: none;
  }
  .panel-top {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 10px;
  }
</style>
