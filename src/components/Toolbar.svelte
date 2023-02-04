<script>
  export let canvas = null;
  export let ctx = null;
  export let setCanvasScreenshot = () => {};

  const downloadImage = () => {
    var link = document.createElement("a");
    link.download = "paint.jpg";
    link.href = canvas.toDataURL();
    link.click();
  };

  const clearCanvas = () => {
    if (!ctx) return;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    setCanvasScreenshot()
  };
</script>

<div class="wrapper">
  <button class="item" on:click={downloadImage}>Сохранить</button>
  <button class="item" on:click={clearCanvas}>Очистить</button>
</div>

<style>
  .wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    height: 25px;
    background-color: #ccc;
  }
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    border-radius: 0;
  }
  .item:nth-child(n + 2) {
    margin-left: -1px;
  }
</style>
